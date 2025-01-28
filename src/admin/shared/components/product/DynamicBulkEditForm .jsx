import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const DynamicBulkEditForm = ({
    visible,
    setVisible,
    selectedProducts,
    handleBulkUpdate,
    loading,
    categories,
    unitsOfMeasurement
}) => {
    const [formFields, setFormFields] = useState({});
    const [selectedFields, setSelectedFields] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);

    const availableFields = [
        { label: 'Category', value: 'Category', type: 'dropdown', options: categories.map(cat => ({ label: cat.Category_Name, value: cat.Category_Name })) },
        { label: 'Sub Category', value: 'Sub_Category', type: 'dropdown', options: filteredSubcategories.map(sub => ({ label: sub, value: sub })) },
        { label: 'Status', value: 'Status', type: 'dropdown', options: [
            { label: 'Active', value: 'Active' },
            { label: 'Inactive', value: 'Inactive' }
        ]},
        { label: 'Brand Name', value: 'Brand_Name', type: 'text' },
        { label: 'Made In', value: 'Made_In', type: 'text' },
        { label: 'Unit of Measurement', value: 'Unit_of_Measurements', type: 'dropdown', options: unitsOfMeasurement },
        { label: 'Regular Price', value: 'Regular_Price', type: 'number' },
        { label: 'Sale Price', value: 'Sale_Price', type: 'number' },
        { label: 'Discount', value: 'Discount', type: 'number' },
        { label: 'Tax Type', value: 'Tax_Type', type: 'dropdown', options: [
            { label: 'GST', value: 'GST' },
            { label: 'VAT', value: 'VAT' }
        ]},
        { label: 'Tax Percentage', value: 'Tax_Percentage', type: 'number' },
    ];

    useEffect(() => {
        if (formFields.Category) {
            const selectedCategoryObject = categories.find(cat => cat.Category_Name === formFields.Category);
            if (selectedCategoryObject) {
                const subcategories = selectedCategoryObject.Subcategories.map(sub => ({
                    label: sub.name,
                    value: sub.name
                }));
                setFilteredSubcategories(subcategories);
            }
        }
    }, [formFields.Category, categories]);

    const handleFieldSelection = (field) => {
        if (selectedFields.includes(field)) {
            setSelectedFields(selectedFields.filter(f => f !== field));
            const { [field]: _, ...rest } = formFields;
            setFormFields(rest);
        } else {
            setSelectedFields([...selectedFields, field]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFields = {};
        Object.keys(formFields).forEach(key => {
            if (formFields[key] !== '') {
                updatedFields[key] = formFields[key];
            }
        });
        handleBulkUpdate(updatedFields);
    };

    const renderField = (fieldConfig) => {
        const { value, type, options } = fieldConfig;
        
        switch (type) {
            case 'dropdown':
                return (
                    <Dropdown
                        value={formFields[value]}
                        options={options}
                        onChange={(e) => setFormFields({ ...formFields, [value]: e.value })}
                        className="w-full"
                        placeholder={`Select ${fieldConfig.label}`}
                    />
                );
            case 'number':
                return (
                    <InputNumber
                        value={formFields[value]}
                        onValueChange={(e) => setFormFields({ ...formFields, [value]: e.value })}
                        className="w-full"
                        placeholder={`Enter ${fieldConfig.label}`}
                    />
                );
            default:
                return (
                    <InputText
                        value={formFields[value] || ''}
                        onChange={(e) => setFormFields({ ...formFields, [value]: e.target.value })}
                        className="w-full"
                        placeholder={`Enter ${fieldConfig.label}`}
                    />
                );
        }
    };

    const footer = (
        <div>
            <button
                onClick={() => setVisible(false)}
                className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
                Cancel
            </button>
            <button
                onClick={handleSubmit}
                disabled={loading || Object.keys(formFields).length === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Updating...' : 'Update Selected Products'}
            </button>
        </div>
    );

    return (
        <Dialog
            header={`Bulk Edit ${selectedProducts.length} Products`}
            visible={visible}
            onHide={() => setVisible(false)}
            footer={footer}
            className="w-full max-w-2xl"
        >
            <div className="p-4">
                <div className="mb-6">
                    <h3 className="mb-2 text-sm font-medium text-gray-700">Select fields to update:</h3>
                    <div className="flex flex-wrap gap-2">
                        {availableFields.map((field) => (
                            <button
                                key={field.value}
                                onClick={() => handleFieldSelection(field.value)}
                                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                                    selectedFields.includes(field.value)
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {field.label}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedFields.length > 0 && (
                    <div className="space-y-4">
                        {selectedFields.map((fieldName) => {
                            const fieldConfig = availableFields.find(f => f.value === fieldName);
                            return (
                                <div key={fieldName} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {fieldConfig.label}
                                    </label>
                                    {renderField(fieldConfig)}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Dialog>
    );
};

export default DynamicBulkEditForm;