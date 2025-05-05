import React, { useRef, useState } from 'react';
import { savereturn } from '../../../admin/shared/services/apireturn/apireturn';
import toast from 'react-hot-toast';

function ReturnGift() {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({});
  const fileInputRef = useRef();
  const [showPreview, setShowPreview] = useState(false);
  const [confirmData, setConfirmData] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };


  const removeImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      URL.revokeObjectURL(updatedImages[index].preview); // 👈 free memory
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };


  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 90);
  const formattedMinDate = minDate.toISOString().split('T')[0]; // format as 'YYYY-M

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!name || !whatsapp || !productName) {
  //     alert("Please fill all required fields.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const formData = new FormData();
  //     formData.append('name', name);
  //     formData.append('whatsapp', whatsapp);
  //     formData.append('productName', productName);
  //     formData.append('quantity', quantity);

  //     images.forEach((img) => {
  //       formData.append('images', img.file);
  //     });

  //     const response = await axios.post('http://192.168.29.175:3000/api/returngift', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log('Success:', response.data);
  //     alert('Return gift submitted successfully!');
  //     setOpenModal(false);
  //     setName('');
  //     setWhatsapp('');
  //     setProductName('');
  //     setImages([]);
  //   } catch (error) {
  //     console.error('Error submitting return gift:', error);
  //     alert('Failed to submit. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlesave = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      Name: formdata.Name,
      Whatsapp: formdata.Whatsapp,
      product_Name: formdata.product_Name,
      Images: images.map(img => img.file), // Important: pass the File objects
      expectedDate: formdata.expectedDate,
      quantity: formdata.quantity,
    };

    try {
      await savereturn(updatedFormData); // 💥 savereturn will internally create FormData
      toast.success('Thank you! Your request is on its way!');
      setOpenModal(false);
      setFormdata("");
      setImages("");
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      setShowPreview(false);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <section className="max-w-[115rem] mx-auto px-5 py-20  ">
        {/* <div className="flex justify-between">
          <p className="">gvddf</p>
          <button onClick={() => setOpenModal(true)} className="p-2 bg-[#024A34] text-white rounded-md">
            Add New
          </button>
        </div> */}
        <div className="inset-0 z-50 flex items-center justify-center  ">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-xl relative">
            {/* <button onClick={() => setOpenModal(false)} className="absolute top-2 right-4 text-gray-500 hover:text-black text-xl">
                ×
              </button> */}
            <p className="text-lg font-extrabold text-center">Product Request Corner!</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              setConfirmData(formdata);
              setShowPreview(true);
            }} className="bg-white rounded-xl space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium">Your Name</label>
                <input type="text" required value={formdata?.Name || ''}
                  onChange={(e) => setFormdata({ ...formdata, Name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium">Contact Number</label>
                <input type="tel" required value={formdata?.Whatsapp || ''}
                  onChange={(e) => setFormdata({ ...formdata, Whatsapp: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]" />
              </div>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="block text-sm font-medium">Upload Product Images</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {images.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-60 overflow-y-auto">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                        >
                          ×
                        </button>
                        <img
                          src={img.preview}
                          alt={`Preview ${index}`}
                          className="w-full h-auto object-contain rounded-lg border shadow"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium">Product Name</label>
                <input type="text" required value={formdata?.product_Name || ''}
                  onChange={(e) => setFormdata({ ...formdata, product_Name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]" />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormdata((prev) => ({
                        ...prev,
                        quantity: Math.max((prev.quantity || 1) - 1, 1),
                      }))
                    }
                    className="px-3 py-1 bg-gray-200 rounded-lg text-lg"
                  >
                    –
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={formdata?.quantity || 1}
                    onChange={(e) =>
                      setFormdata({ ...formdata, quantity: Math.max(parseInt(e.target.value) || 1, 1) })
                    }
                    className="w-16 text-center px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormdata((prev) => ({
                        ...prev,
                        quantity: (prev.quantity || 1) + 1,
                      }))
                    }
                    className="px-3 py-1 bg-gray-200 rounded-lg text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium">Expected Delivery Date</label>
                <input
                  type="date"
                  required
                  min={formattedMinDate}
                  value={formdata?.expectedDate || ''}
                  onChange={(e) => setFormdata({ ...formdata, expectedDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]"
                />
                <span className="text-xs text-gray-500">
                  *Please choose a date after {formattedMinDate}.
                </span>
              </div>
              {/* <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 text-sm p-3 rounded-md mt-2">
                  📸 <strong>Important:</strong> Kindly share the product image via WhatsApp during the Product Request.
                </div> */}
              <div>
                <button type="submit" disabled={loading} className="bg-[#024A34] cursor-pointer items-center w-fit text-center mx-auto px-6 py-2 justify-center flex gap-1 rounded-3xl md:text-base text-base text-white">
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
            {showPreview && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl max-w-md w-full space-y-4 shadow-lg">
                  <h2 className="text-lg font-bold mb-4 text-center" >Confirm Your Details</h2>
                  <div><strong>Name:</strong> {confirmData?.Name}</div>
                  <div><strong>Contact:</strong> {confirmData?.Whatsapp}</div>
                  <div><strong>Product Name:</strong> {confirmData?.product_Name}</div>
                  <div><strong>Quantity:</strong> {confirmData?.quantity}</div>
                  <div><strong>Expected Date:</strong> {confirmData?.expectedDate}</div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {images.map((img, index) => (
                        <img key={index} src={img.preview} alt={`preview-${index}`} className="max-h-52 overflow-y-auto  object-cover rounded" />
                      ))}
                    </div>
                  )}
                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      onClick={() => setShowPreview(false)}
                      className="px-4 py-2 rounded-md border border-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlesave}
                      className="px-4 py-2 bg-[#024A34] text-white rounded-md"
                    >
                      Confirm & Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </section>
    </>
  );
}

export default ReturnGift;
