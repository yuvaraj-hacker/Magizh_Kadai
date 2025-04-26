import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function ReturnGift() {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[indexToRemove].preview);
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !whatsapp || !productName) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('whatsapp', whatsapp);
      formData.append('productName', productName);
      formData.append('quantity', quantity);

      images.forEach((img) => {
        formData.append('images', img.file);
      });

      const response = await axios.post('http://192.168.29.175:3000/api/returngift', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
      alert('Return gift submitted successfully!');
      setOpenModal(false);
      setName('');
      setWhatsapp('');
      setProductName('');
      setImages([]);
    } catch (error) {
      console.error('Error submitting return gift:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="max-w-[115rem] mx-auto px-5 py-20 min-h-screen">
        <div className="flex justify-between">
          <p className="">gvddf</p>
          <button onClick={() => setOpenModal(true)} className="p-2 bg-[#024A34] text-white rounded-md">
            Add New
          </button>
        </div>

        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-xl relative">
              <button onClick={() => setOpenModal(false)} className="absolute top-2 right-4 text-gray-500 hover:text-black text-xl">
                ×
              </button>
              <p className="text-lg font-extrabold text-center">Product Request Corner!</p>
              <form onSubmit={handleSubmit} className="bg-white rounded-xl space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="block text-sm font-medium">Your Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-sm font-medium">Contact Number</label>
                  <input type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]" />
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="block text-sm font-medium">Upload Product Images</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  {images.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-60 overflow-y-auto">
                      {images.map((img, index) => (
                        <div key={index} className="relative">
                          <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                            ×
                          </button>
                          <img src={img.preview} alt={`Preview ${index}`} className="w-full h-auto bg-contain rounded-lg border shadow" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-sm font-medium">Product Name</label>
                  <input type="text" required value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024A34]" />
                </div>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 text-sm p-3 rounded-md mt-2">
                  📸 <strong>Important:</strong> Kindly share the product image via WhatsApp during the Product Request.
                </div>
                <div>
                  <button type="submit" disabled={loading} className="bg-[#27A737] cursor-pointer items-center w-fit text-center mx-auto px-2 justify-center flex gap-1 rounded-3xl md:text-base text-base text-white">
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ReturnGift;
