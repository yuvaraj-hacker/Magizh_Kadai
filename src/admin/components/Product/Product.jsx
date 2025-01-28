import { useCallback, useEffect, useState } from "react"
import { deleteproducts, getallproducts, handleBulkUpdateProducts, saveproducts, updateproducts } from "../../shared/services/apiproducts/apiproducts";
import Tableview from "../../shared/components/product/Tableview";
import Tablepagination from "../../shared/others/Tablepagination";
import Tableheadpanel from "../../shared/components/product/Tableheadpanel";
import Addandeditform from "../../shared/components/product/Addandeditform";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { getallcategory } from "../../shared/services/apicategory/apicategory";
import { BulkUpdateModal } from "../../shared/components/product/BulkUpdateModal";
import { Info } from "lucide-react";
import { exportToExcel, importFromExcel } from "../../shared/components/product/excelServices";
export default function Product() {

    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [visible, setVisible] = useState(false);
    const [formdata, setFormdata] = useState({});
    const [loading, setLoading] = useState(false);
    const [tabledata, setTabledata] = useState([]);
    const [colfilter, setcolFilter] = useState({});
    const [globalfilter, setglobalfilter] = useState('');
    const [filtervalues, setfiltervalues] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [imageDataUrl, setImageDataUrl] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isBulkUpdateModalOpen, setIsBulkUpdateModalOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    let isMounted = true;

    const getallproduct = useCallback(async () => {
        const res = await getallproducts({ first, rows, globalfilter, colfilter });
        setTabledata(res?.resdata);
        setTotalRecords(res?.totallength);
    }, [first, rows, globalfilter, colfilter]);

    useEffect(() => {
        if (isMounted) {
            getallproduct();
        }
        return (() => isMounted = false);
    }, [first, rows, globalfilter, colfilter])

    const onPage = (page) => {
        setPage(page)
        setFirst(rows * (page - 1));
        setRows(rows);
    };

    const unitsOfMeasurement = [
        { label: 'Select Unit', value: '' },
        { label: 'Kilogram (kg)', value: 'kg' },
        { label: 'Gram (g)', value: 'g' },
        { label: 'Milligram (mg)', value: 'mg' },
        { label: 'Pound (lb)', value: 'lb' },
        { label: 'Ounce (oz)', value: 'oz' },
        { label: 'Liter (L)', value: 'L' },
        { label: 'Milliliter (mL)', value: 'mL' },
        { label: 'Number of (Nos)', value: 'Nos' },
        { label: 'Pieces(p)', value: 'p' },
        { label: 'Box(b) ', value: 'b' },
        { label: 'Bunch(bu)', value: 'bu' },
        { label: 'Bottle(btl)', value: 'btl' },
        { label: 'Packet(pk)', value: 'pk' },
    ];

    const predefinedValues = ["0.5Lb", "1Lb", "2Lb"];


    const handlechange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setFormdata({ ...formdata, [e.target.name]: filesArray });
        } else {
            setFormdata({ ...formdata, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (formdata.Tags && !Array.isArray(formdata.Tags)) {
            setFormdata({ ...formdata, Tags: [formdata.Tags] });
        }
    }, [formdata, setFormdata]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getallcategory({ rows: 1000 });
                setCategories(response.resdata);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryChange = (event) => {
        const selectedCategoryName = event.target.value;
        setSelectedCategory(selectedCategoryName);
        const selectedCategoryObject = categories.find((category) => category.Category_Name === selectedCategoryName);
        if (selectedCategoryObject) {
            const subcategories = selectedCategoryObject.Subcategories.map((subcategory) => subcategory.name);
            setFilteredSubcategories(subcategories);
        } else {
            setFilteredSubcategories([]);
        }
    };


    const cusfilter = (field, value) => {
        setcolFilter(prev => ({ ...prev, [field]: { $in: value } }));
        setFirst(0)
    };

    const handlesave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const updatedFormData = {
            ...formdata,
            Category: selectedCategory
        };

        await saveproducts(updatedFormData);
        toast.success("Successfully saved");
        getallproduct();
        setVisible(false);
        setLoading(false);
    };

    const newform = () => {
        setFormdata({});
        setSelectedCategory(null)
        setVisible(true)
    }

    const handleExport = async () => {
        if (isExporting) return;
        setIsExporting(true);
        try {
          await exportToExcel();
        } finally {
          setIsExporting(false);
        }
      };
    
      const handleImport = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        try {
          await importFromExcel(file);
          getallproduct();
        } catch (error) {
          console.error('Import handler failed:', error);
        }
        event.target.value = '';
      };
    

    const editfrom = (data) => {
        setFormdata(data);
        setSelectedCategory(data.Category);
        const selectedCategoryName = data.Category;
        setSelectedCategory(selectedCategoryName);
        const selectedCategoryObject = categories.find(category => category.Category_Name === selectedCategoryName);
        if (selectedCategoryObject) {
            const subcategories = selectedCategoryObject.Subcategories.map((subcategory) => subcategory.name);
            setFilteredSubcategories(subcategories);
        } else {
            setFilteredSubcategories([]);
        }
        setVisible(true)

    }

    const handleupdate = async (e) => {
        e.preventDefault()
        console.log("Form Data on Update:", formdata);
        setLoading(true)
        console.log(formdata)
        await updateproducts(formdata)
        toast.success("Sucessfully updated")
        getallproduct()
        setVisible(false)
        setLoading(false)
    }

    const handledelete = (id) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'bg-red-500 ml-2 text-white p-2',
            rejectClassName: 'p-2 outline-none border-0',
            accept: async () => {
                await deleteproducts(id)
                toast.success("Sucessfully deleted")
                getallproduct()
            }
        });
    };

    const handleBulkUpdate = async (products, field, value) => {
        confirmDialog({
            message: 'Do you want to update these records?',
            header: 'Update Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'bg-green-500 text-white p-2',
            rejectClassName: 'p-2 text-gray-800',
            accept: async () => {
                try {
                    setLoading(true);
                    let updateFields;
                    if (field === "categoryUpdate") {
                        updateFields = {
                            Category: value.Category,
                            Sub_Category: value.Sub_Category
                        };
                    } else {
                        updateFields = { [field]: value };
                    }
                    
                    await handleBulkUpdateProducts(products.map(product => product._id), updateFields);
                    toast.success("Products updated successfully");
                    getallproduct();
                    setSelectedProducts([]);
                    setLoading(false);
                } catch (error) {
                    console.error('Bulk update failed:', error);
                    toast.error('Failed to update products');
                    setLoading(false);
                }
            },
            reject: () => {
                toast('Update cancelled', { icon: <Info className="text-red-400" /> });
            }
        });
    };

    return (
        <div className="bg-white border rounded-3xl">
            <Tableheadpanel
                newform={newform}
                setglobalfilter={setglobalfilter}
                selectedProducts={selectedProducts}
                onBulkUpdateClick={() => setIsBulkUpdateModalOpen(true)}
                getallproduct={getallproduct}
                setIsExporting={setIsExporting}
                isExporting={isExporting}
                handleImport={handleImport}
                handleExport={handleExport}
            />

            <Tableview
                tabledata={tabledata}
                editfrom={editfrom}
                handledelete={handledelete}
                cusfilter={cusfilter}
                filtervalues={filtervalues}
                onPage={onPage}
                page={page}
                getallproduct={getallproduct}
                categories={categories}
                unitsOfMeasurement={unitsOfMeasurement}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
            />

            <BulkUpdateModal
                isOpen={isBulkUpdateModalOpen}
                onClose={() => setIsBulkUpdateModalOpen(false)}
                selectedProducts={selectedProducts}
                onBulkUpdate={handleBulkUpdate}
                categories={categories}
                filteredSubcategories={filteredSubcategories}
                unitsOfMeasurement={unitsOfMeasurement}
            />

            <Tablepagination page={page} first={first} rows={rows} totalRecords={totalRecords} onPage={onPage} setRows={setRows} />

            <Addandeditform visible={visible} setVisible={setVisible} loading={loading} formdata={formdata} setFormdata={setFormdata} imageDataUrl={imageDataUrl} predefinedValues={predefinedValues}
                handlechange={handlechange} handlesave={handlesave} handleupdate={handleupdate} handleCategoryChange={handleCategoryChange}
                selectedCategory={selectedCategory} filteredSubcategories={filteredSubcategories} categories={categories} unitsOfMeasurement={unitsOfMeasurement} />

            <ConfirmDialog />
        </div>
    )
}