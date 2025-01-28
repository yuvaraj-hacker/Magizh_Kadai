// // // import React, { useState } from 'react';
// // // import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem } from "@nextui-org/react";

// // // export const BulkUpdateModal = ({isOpen,onClose,selectedProducts,onBulkUpdate,categories,unitsOfMeasurement,filteredSubcategories}) => {
// // //     const [selectedField, setSelectedField] = useState("");
// // //     const [selectedValue, setSelectedValue] = useState("");

// // //     const updateFields = [
// // //         {
// // //             label: "Category",
// // //             value: "Category",
// // //             options: categories?.map(cat => ({ label: cat.Category_Name, value: cat.Category_Name }))
// // //         },
// // //         {
// // //             label: "Subcategory",
// // //             value: "Sub_Category",
// // //             options: filteredSubcategories?.map((sub) => ({ label: sub, value: sub }))
// // //         },
// // //         {
// // //             label: "Status",
// // //             value: "Status",
// // //             options: [
// // //                 { label: "Active", value: "Active" },
// // //                 { label: "Inactive", value: "Inactive" }
// // //             ]
// // //         },
// // //         {
// // //             label: "Unit of Measurement",
// // //             value: "Unit_of_Measurements",
// // //             options: unitsOfMeasurement
// // //         },
// // //         { label: "Product Name", value: "Product_Name", isInput: true },
// // //         { label: "Brand Name", value: "Brand_Name", isInput: true },
// // //         { label: "Made In", value: "Made_In", isInput: true },
// // //         { label: "Sale Price", value: "Sale_Price", isInput: true },
// // //         { label: "Regular Price", value: "Regular_Price", isInput: true },
// // //         { label: "Discount", value: "Discount", isInput: true },

// // //         {
// // //             label: "Tax Type",
// // //             value: "Tax_Type",
// // //             options: [
// // //                 { label: "Yes", value: "Yes" },
// // //                 { label: "No", value: "No" },
// // //             ]
// // //         }
// // //     ];

// // //     const handleUpdate = () => {
// // //         onBulkUpdate(selectedProducts, selectedField, selectedValue);
// // //         setSelectedField("");
// // //         setSelectedValue("");
// // //         onClose();
// // //     };

// // //     return (
// // //         <Modal size="md" isOpen={isOpen} onClose={onClose}>
// // //             <ModalContent>
// // //                 <ModalHeader className="flex flex-col gap-1">
// // //                     Bulk Update Products ({selectedProducts.length} selected)
// // //                 </ModalHeader>
// // //                 <ModalBody>
// // //                     <Select
// // //                         label="Select Field to Update"
// // //                         placeholder="Choose field to update"
// // //                         value={selectedField}
// // //                         onChange={(e) => setSelectedField(e.target.value)}
// // //                         className="w-full"
// // //                     >
// // //                         {updateFields.map((field) => (
// // //                             <SelectItem key={field.value} value={field.value}>
// // //                                 {field.label}
// // //                             </SelectItem>
// // //                         ))}
// // //                     </Select>

// // //                     {selectedField && (
// // //                         <div className="mt-4">
// // //                             {updateFields.find(f => f.value === selectedField)?.isInput ? (
// // //                                 <input
// // //                                     type="text"
// // //                                     value={selectedValue}
// // //                                     onChange={(e) => setSelectedValue(e.target.value)}
// // //                                     placeholder={`Enter ${updateFields.find(f => f.value === selectedField)?.label}`}
// // //                                     className="w-full px-3 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                                 />
// // //                             ) : (
// // //                                 <Select
// // //                                     label="Select New Value"
// // //                                     placeholder="Choose new value"
// // //                                     value={selectedValue}
// // //                                     onChange={(e) => setSelectedValue(e.target.value)}
// // //                                     className="w-full"
// // //                                 >
// // //                                     {updateFields
// // //                                         .find(f => f.value === selectedField)
// // //                                         ?.options?.map((option) => (
// // //                                             <SelectItem key={option.value} value={option.value}>
// // //                                                 {option.label}
// // //                                             </SelectItem>
// // //                                         ))}
// // //                                 </Select>
// // //                             )}
// // //                         </div>
// // //                     )}
// // //                 </ModalBody>
// // //                 <ModalFooter>
// // //                     <Button color="danger" variant="light" onPress={onClose}>
// // //                         Cancel
// // //                     </Button>
// // //                     <Button
// // //                         color="primary"
// // //                         onPress={handleUpdate}
// // //                         disabled={!selectedField || !selectedValue}
// // //                     >
// // //                         Update Products
// // //                     </Button>
// // //                 </ModalFooter>
// // //             </ModalContent>
// // //         </Modal>
// // //     );
// // // };

import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem } from "@nextui-org/react";

export const BulkUpdateModal = ({isOpen, onClose, selectedProducts, onBulkUpdate, categories, unitsOfMeasurement}) => {
    const [selectedField, setSelectedField] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [availableSubcategories, setAvailableSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (!isOpen) {
            setSelectedField("");
            setSelectedValue("");
            setSelectedSubcategory("");
            setAvailableSubcategories([]);
            setSelectedCategory(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if (selectedField === "Category" && selectedValue) {
            const category = categories?.find(cat => cat.Category_Name === selectedValue);
            
            if (category?.Subcategories) {
                setSelectedCategory(category);
                const subcategories = category.Subcategories.map(sub => ({
                    label: sub.name,
                    value: sub.name
                }));
                setAvailableSubcategories(subcategories);
            }
        }
    }, [selectedField, selectedValue, categories]);

    const updateFields = [
        {
            label: "Category",
            value: "Category",
            options: categories?.map(cat => ({ 
                label: cat.Category_Name, 
                value: cat.Category_Name 
            })) || []
        },
        {
            label: "Status",
            value: "Status",
            options: [
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" }
            ]
        },
        {
            label: "Unit of Measurement",
            value: "Unit_of_Measurements",
            options: unitsOfMeasurement || []
        },
        { label: "Product Name", value: "Product_Name", isInput: true },
        { label: "Brand Name", value: "Brand_Name", isInput: true },
        { label: "Made In", value: "Made_In", isInput: true },
        // { label: "Sale Price", value: "Sale_Price", isInput: true },
        { label: "Regular Price", value: "Regular_Price", isInput: true },
        { label: "Discount", value: "Discount", isInput: true },
        {
            label: "Tax Type",
            value: "Tax_Type",
            options: [
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
            ]
        }
    ];

    const handleFieldChange = (value) => {
        setSelectedField(value);
        setSelectedValue("");
        setSelectedSubcategory("");
        
        if (value !== "Category") {
            setAvailableSubcategories([]);
            setSelectedCategory(null);
        }
    };

    const handleCategoryChange = (value) => {
        setSelectedValue(value);
        setSelectedSubcategory("");
    };

    const getCurrentOptions = () => {
        const field = updateFields.find(f => f.value === selectedField);
        return field?.options || [];
    };

    const handleUpdate = () => {
        let updateData;

        if (selectedField === "Category") {
            // Create an object with both Category and Sub_Category
            updateData = {
                Category: selectedValue,
                Sub_Category: selectedSubcategory
            };
            // Pass the field as "categoryUpdate" to identify this special case
            onBulkUpdate(selectedProducts, "categoryUpdate", updateData);
        } else {
            // For regular fields, pass the single value
            onBulkUpdate(selectedProducts, selectedField, selectedValue);
        }
        
        setSelectedField("");
        setSelectedValue("");
        setSelectedSubcategory("");
        setAvailableSubcategories([]);
        setSelectedCategory(null);
        onClose();
    };

    return (
        <Modal size="md" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Bulk Update Products ({selectedProducts.length} selected)
                </ModalHeader>
                <ModalBody>
                    <Select
                        label="Select Field to Update"
                        placeholder="Choose field to update"
                        value={selectedField}
                        onChange={(e) => handleFieldChange(e.target.value)}
                        className="w-full"
                    >
                        {updateFields.map((field) => (
                            <SelectItem key={field.value} value={field.value}>
                                {field.label}
                            </SelectItem>
                        ))}
                    </Select>

                    {selectedField && (
                        <div className="mt-4">
                            {updateFields.find(f => f.value === selectedField)?.isInput ? (
                                <input
                                    type="text"
                                    value={selectedValue}
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                    placeholder={`Enter ${updateFields.find(f => f.value === selectedField)?.label}`}
                                    className="w-full px-3 py-2 mt-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <Select
                                    label="Select New Value"
                                    placeholder="Choose new value"
                                    value={selectedValue}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="w-full"
                                >
                                    {getCurrentOptions().map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            )}
                        </div>
                    )}

                    {selectedField === "Category" && selectedValue && availableSubcategories.length > 0 && (
                        <div className="mt-4">
                            <Select
                                label="Select Subcategory"
                                placeholder="Choose subcategory"
                                value={selectedSubcategory}
                                onChange={(e) => setSelectedSubcategory(e.target.value)}
                                className="w-full"
                            >
                                {availableSubcategories.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onPress={handleUpdate}
                        disabled={!selectedField || !selectedValue || 
                                (selectedField === "Category" && availableSubcategories.length > 0 && !selectedSubcategory)}
                    >
                        Update Products
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};