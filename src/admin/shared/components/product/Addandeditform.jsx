import { Dialog } from 'primereact/dialog';
import apiurl from '../../../../shared/services/apiendpoint/apiendpoint';
import DynamicImageUpload from './DynamicImageUpload';
import { Editor } from 'primereact/editor';
import { MultiSelect } from 'primereact/multiselect';
import { useState } from 'react';
export default function Addandeditform(props) {
    const { visible, setVisible, handlesave, handlechange, loading, formdata, handleupdate, filteredSubcategories, selectedCategory, handleCategoryChange, categories, imageDataUrl, handleImageChange, unitsOfMeasurement, setFormdata } = props;
    const [showCustomInput, setShowCustomInput] = useState(false);

    const tagsOptions = [
        { label: "Trending", value: "Trending" },
        { label: "New Collection", value: "Collection" },
        // { label: "Editor's Pick", value: "Editor's Pick" },
        // { label: "Lightning Deals", value: "Lightning Deals" },
        // { label: "New Arrivals", value: "New Arrivals" },
        // { label: "Best Seller", value: "Best Seller" },
        // { label: "Recommendations", value: "Recommendations" }
    ];
    return (
        <Dialog header="Product Details" visible={visible} onHide={() => setVisible(false)} className="!w-full lg:!w-[40rem]  ">
            <form onSubmit={!formdata?._id ? handlesave : handleupdate}>
                <div className="mb-3">
                    <DynamicImageUpload
                        images={formdata?.Images || []}
                        onChange={(images) => handlechange({ target: { name: "Images", files: images } })}
                        apiUrl={apiurl()}
                    />
                </div>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Product Name</label>
                        </div>
                        <input type="text" name="Product_Name" value={formdata?.Product_Name} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" />
                    </div>
                    {/* <div className="mb-2">
                        <div className="mb-2">
                            <label>Unit of Measurements</label>
                        </div>
                        <select
                            name="Unit_of_Measurements"
                            value={formdata?.Unit_of_Measurements || ''}
                            onChange={handlechange}
                            className="w-full px-4 py-2 border rounded-md outline-none border-secondary"

                        >
                            {unitsOfMeasurement.map((unit, index) => (
                                <option key={index} value={unit.value}>
                                    {unit.label}
                                </option>
                            ))}
                        </select>
                    </div> */}
                    {/* <div className="mb-2">
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">Measurement Units</label>
                        </div>
                        <div className="relative">
                            <select
                                name="Measurement_Units"
                                value={formdata.Measurement_Units || ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "custom") {
                                        setShowCustomInput(true);
                                        setFormdata({
                                            ...formdata,
                                            Measurement_Units: ""
                                        });
                                    } else {
                                        setShowCustomInput(false);
                                        setFormdata({
                                            ...formdata,
                                            Measurement_Units: value
                                        });
                                    }
                                }}
                                className="w-full px-4 py-2 border rounded-md outline-none border-secondary"
                            >
                                <option value="">Select a unit</option>
                                <option value="0.5">0.5</option>
                                <option value="1">1</option>
                                <option value="1.5">1.5</option>
                                <option value="2">2</option>
                                <option value="2.5">2.5</option>
                                <option value="3">3.5</option>
                                <option value="7">7</option>
                                <option value="14">14</option>
                                <option value="24">24</option>
                                <option value="28">28</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>


                        {showCustomInput && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="customMeasurementUnit"
                                    placeholder="Enter custom unit"
                                    value={formdata.Measurement_Units || ""}
                                    onChange={(e) =>
                                        setFormdata({
                                            ...formdata,
                                            Measurement_Units: e.target.value
                                        })
                                    }
                                    onBlur={(e) => {
                                        // If no value is entered, hide the custom input and reset
                                        if (!e.target.value.trim()) {
                                            setShowCustomInput(false);
                                            setFormdata({
                                                ...formdata,
                                                Measurement_Units: ""
                                            });
                                        }
                                    }}
                                    className="w-full px-4 py-2 border rounded-md outline-none border-secondary"
                                    autoFocus
                                />
                            </div>
                        )}
                    </div> */}
                    {/* <div className="mb-2">
                        <div className="mb-2">
                            <label>Sold By</label>
                        </div>
                        <select
                            name="Sold_by"
                            value={formdata?.Sold_by || ''}
                            onChange={handlechange}
                            className="w-full px-4 py-2 border rounded-md outline-none border-secondary"

                        >
                            {unitsOfMeasurement.map((unit, index) => (
                                <option key={index} value={unit.value}>
                                    {unit.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Made In</label>
                        </div>
                        <input type="text" name="Made_In" value={formdata?.Made_In} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" />
                    </div> */}
                    <div className="mb-2 ">
                        <div className="mb-2">
                            <label>Brand Name</label>
                        </div>
                        <input type="text" name="Brand_Name" value={formdata?.Brand_Name} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" />
                    </div>
                    <div className="mb-2 col-span-full">
                        <div className="mb-2">
                            <label>Product Description</label>
                        </div>
                        <Editor
                            value={formdata?.Product_Description || ''}
                            onTextChange={(e) => handlechange({ target: { name: 'Product_Description', value: e.htmlValue } })}
                            style={{ height: '200px' }}
                        />
                    </div>

                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Product Highlights</label>
                        </div>
                        <input type="text" name="Product_Highlights" value={formdata?.Product_Highlights} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" style={{ height: '100px' }} />
                    </div>
                    <div className="mb-2" >
                        <div className="mb-2">
                            <label>Category</label>
                        </div>
                        <select
                            name="Category"
                            value={formdata?.Category || selectedCategory}
                            onChange={(e) => {
                                handleCategoryChange(e); // Existing category change logic
                                handlechange(e); // Add this to update formdata
                            }}
                            className="w-full px-4 py-2 border rounded-md outline-none border-secondary"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category.Category_Name}>
                                    {category.Category_Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Sub-Category</label>
                        </div>
                        <select name="Sub_Category" value={formdata?.Sub_Category} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" >
                            <option value="">Select Sub-Category</option>
                            {filteredSubcategories.length > 0 ? (
                                filteredSubcategories.map((subcategory, index) => (
                                    <option key={index} value={subcategory}>{subcategory}</option>
                                ))
                            ) : (
                                <option disabled>No Subcategory</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Qty</label>
                        </div>
                        <input type="text" name="QTY" value={formdata?.QTY} onChange={handlechange} min="0" className="w-full px-4 py-2 border rounded-md outline-none border-secondary" />
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Regular price</label>
                        </div>
                        <input type="text" name="Regular_Price" value={formdata?.Regular_Price} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" />
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Sale Price</label>
                        </div>
                        <input type="text" name="Sale_Price" value={formdata?.Sale_Price} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" />
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Discount</label>
                        </div>
                        <input type="text" name="Discount" value={formdata?.Discount} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" />
                    </div>
                    {/* <div className="mb-2">
                        <div className="mb-2">
                            <label>Tax </label>
                        </div>
                        <select name="Tax_Type" value={formdata?.Tax_Type} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary"  >
                            <option selected disabled>---Select ---</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Tax Type</label>
                        </div>
                        <select name="Tax_Type" value={formdata?.Tax_Type} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary"  >
                            <option selected disabled>---Select ---</option>
                            <option>Inclusive</option>
                            <option>Exclusive</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Tax Percentage</label>
                        </div>
                        <input type="text" name="Tax_Percentage" value={formdata?.Tax_Percentage} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" />
                    </div> */}
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Tax</label>
                        </div>
                        <select name="Tax" value={formdata?.Tax || ""} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary"  >
                            <option value="" disabled>---Select---</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    {formdata?.Tax === "Yes" && (
                        <>
                            <div className="mb-2">
                                <div className="mb-2">
                                    <label>Tax Type</label>
                                </div>
                                <select name="Tax_Type" value={formdata?.Tax_Type || ""} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary"  >
                                    <option value="" disabled>---Select---</option>
                                    <option value="Inclusive">Inclusive</option>
                                    <option value="Exclusive">Exclusive</option>
                                </select>
                            </div>
                            <div className="mb-2">
                                <div className="mb-2">
                                    <label>Tax Percentage</label>
                                </div>
                                <input type="text" name="Tax_Percentage" value={formdata?.Tax_Percentage || ""} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary" />
                            </div>
                        </>
                    )}
                    <div className="mb-2">
                        <div className="mb-2 ">
                            <label>Tags</label>
                            <MultiSelect value={formdata?.Tags || []} options={tagsOptions} onChange={(e) => handlechange({ target: { name: 'Tags', value: e.value } })} placeholder="Select Tags" display="chip" className="w-full"
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Stock</label>
                        </div>
                        <select name="Stock" value={formdata?.Stock} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary"  >
                            <option selected disabled>---Select a status---</option>
                            <option>Stock</option>
                            <option>Out of Stock</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <div className="mb-2">
                            <label>Status</label>
                        </div>
                        <select name="Status" value={formdata?.Status} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none border-secondary"  >
                            <option selected disabled>---Select a status---</option>
                            <option>Active</option>
                            <option>In Active</option>
                        </select>
                    </div>
                </div>
                <div className="mb-2">
                    <button type="submit" className="w-full px-4 py-2 text-white border rounded-md bg-secondary" >
                        {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>}  Save
                    </button>
                </div>
            </form>
        </Dialog>
    )
}
