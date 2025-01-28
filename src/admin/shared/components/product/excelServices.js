// services/apiproducts/excelServices.js
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import { getallproducts } from '../../services/apiproducts/apiproducts';

export const exportToExcel = async () => {
    try {
       
        const response = await getallproducts({ first: 0, rows: 100000,globalfilter: '',colfilter: {} });
        if (!response?.resdata) {throw new Error('No data received');
        }
        const productsToExport = response.resdata.map(product => ({
            'ID': product._id || '',
            'Images': Array.isArray(product.Images) ? product.Images.join(', ') : '',
            'Product Name': product.Product_Name || '',
            'Brand Name': product.Brand_Name || '',
            'Product Description': product.Product_Description || '',
            'Category': product.Category || '',
            'Sub Category': product.Sub_Category || '',
            'Stock': product.Stock || '',
            'Unit of Measurements': product.Unit_of_Measurements || '',
            'Measurement Units': product.Measurement_Units || '',
            'Product Highlights': product.Product_Highlights || '',
            'QTY': product.QTY || 0,
            'Regular Price': product.Regular_Price || 0,
            'Sale Price': product.Sale_Price || 0,
            'Discount': product.Discount || 0,
            'Status': product.Status || '',
            'Created At': product.createdAt ? new Date(product.createdAt).toLocaleString() : '',
            'Updated At': product.updatedAt ? new Date(product.updatedAt).toLocaleString() : ''
        }));

        // Create worksheet and set column widths
        const worksheet = XLSX.utils.json_to_sheet(productsToExport);
        
        // Set column widths
        const columnWidths = [
            { wch: 25 }, // ID
            { wch: 40 }, // Images
            { wch: 30 }, // Product Name
            { wch: 20 }, // Brand Name
            { wch: 50 }, // Product Description
            { wch: 20 }, // Category
            { wch: 20 }, // Sub Category
            { wch: 15 }, // Stock
            { wch: 20 }, // Unit of Measurements
            { wch: 15 }, // Measurement Units
            { wch: 50 }, // Product Highlights
            { wch: 10 }, // QTY
            { wch: 15 }, // Regular Price
            { wch: 15 }, // Sale Price
            { wch: 10 }, // Discount
            { wch: 15 }, // Status
            { wch: 20 }, // Created At
            { wch: 20 }  // Updated At
        ];
        worksheet['!cols'] = columnWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        
        // Generate and download the file
        const fileName = `products_export_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
        toast.success('Products exported successfully');
    } catch (error) {
        console.error('Export failed:', error);
        toast.error('Failed to export products');
        throw error;
    }
};

export const importFromExcel = async (file) => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const workbook = XLSX.read(e.target.result, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const data = XLSX.utils.sheet_to_json(worksheet);

                    // Transform the data to match your product model
                    const transformedData = data.map(row => ({
                        _id: row['ID'] || row._id,
                        Images: row['Images'] ? row['Images'].split(',').map(img => img.trim()) : [],
                        Product_Name: row['Product Name'] || row.Product_Name,
                        Brand_Name: row['Brand Name'] || row.Brand_Name,
                        Product_Description: row['Product Description'] || row.Product_Description,
                        Category: row.Category,
                        Sub_Category: row['Sub Category'] || row.Sub_Category,
                        Stock: row.Stock,
                        Unit_of_Measurements: row['Unit of Measurements'] || row.Unit_of_Measurements,
                        Measurement_Units: row['Measurement Units'] || row.Measurement_Units,
                        Product_Highlights: row['Product Highlights'] || row.Product_Highlights,
                        QTY: Number(row.QTY) || 0,
                        Regular_Price: Number(row['Regular Price']) || 0,
                        Sale_Price: Number(row['Sale Price']) || 0,
                        Discount: Number(row.Discount) || 0,
                        Status: row.Status || 'Active'
                    }));

                    // Validate the data
                    const validProducts = transformedData.filter(product => 
                        product.Product_Name && 
                        product.Category
                    );

                    if (validProducts.length === 0) {
                        throw new Error('No valid products found in the file');
                    }

                    // Save the products
                    for (const product of validProducts) {
                        // await saveproducts(product);
                    }

                    toast.success(`Successfully imported ${validProducts.length} products`);
                    resolve(validProducts);
                } catch (error) {
                    console.error('Import processing failed:', error);
                    toast.error('Failed to process import file');
                    reject(error);
                }
            };

            reader.onerror = (error) => {
                console.error('File reading failed:', error);
                toast.error('Failed to read import file');
                reject(error);
            };

            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error('Import setup failed:', error);
            toast.error('Failed to setup import');
            reject(error);
        }
    });
};