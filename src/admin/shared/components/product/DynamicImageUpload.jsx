// import React from 'react';

// export default function DynamicImageUpload({ images, onChange, apiUrl }) {
//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         onChange(files);
//     };

//     const handleDragStart = (e, index) => {
//         e.dataTransfer.setData('text/plain', index);
//     };

//     const handleDragOver = (e) => {
//         e.preventDefault();
//     };

//     const handleDrop = (e, dropIndex) => {
//         e.preventDefault();
//         const dragIndex = e.dataTransfer.getData('text/plain');
//         reorderImages(parseInt(dragIndex), parseInt(dropIndex));
//     };

//     const reorderImages = (startIndex, endIndex) => {
//         const newImages = Array.from(images || []);
//         const [removed] = newImages.splice(startIndex, 1);
//         newImages.splice(endIndex, 0, removed);
//         onChange(newImages);
//     };


//     const removeImage = (index) => {
//         const newImages = Array.from(images || []);
//         newImages.splice(index, 1);
//         onChange(newImages);
//     };

//     return (
//         <div className="space-y-4">
//             {/* Upload Area */}
//             <div className="flex items-center justify-center">
//                 <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                         </svg>
//                         <p className="mb-2 text-sm text-gray-500">
//                             <span className="font-semibold">Click to upload</span> or drag and drop
//                         </p>
//                         <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 800x400px)</p>
//                     </div>
//                     <input
//                         type="file"
//                         className="hidden"
//                         onChange={handleFileChange}
//                         multiple
//                         accept="image/*"
//                     />
//                 </label>
//             </div>

//             {/* Image Preview Grid */}
//             {images && images.length > 0 && (
//                 <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//                     {images.map((image, index) => (
//                         <div
//                             key={index}
//                             draggable
//                             onDragStart={(e) => handleDragStart(e, index)}
//                             onDragOver={handleDragOver}
//                             onDrop={(e) => handleDrop(e, index)}
//                             className="relative group"
//                         >
//                             <img
//                                 src={image instanceof File ? URL.createObjectURL(image) : `${apiUrl}/${image}`}
//                                 alt={`Preview ${index}`}
//                                 className="object-cover w-full h-32 rounded-lg"
//                             />
//                             <button
//                                 onClick={() => removeImage(index)}
//                                 className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
//                             >
//                                 X
//                             </button>
//                             <div className="absolute bottom-0 left-0 right-0 py-1 text-xs text-center text-white bg-black bg-opacity-50">
//                                 {index === 0 ? 'Primary' : `Position ${index + 1}`}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }




import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function DynamicImageUpload({ images, onChange, apiUrl }) {
    const [primaryIndex, setPrimaryIndex] = useState(0);


    // const handleFileChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     onChange([...images, ...files]);
    // };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        onChange([...images, ...newFiles]);
    };


    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };


    const handleDragOver = (e) => {
        e.preventDefault();
    };


    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        const dragIndex = e.dataTransfer.getData('text/plain');
        reorderImages(parseInt(dragIndex), parseInt(dropIndex));
    };


    const reorderImages = (startIndex, endIndex) => {
        const newImages = Array.from(images || []);
        const [removed] = newImages.splice(startIndex, 1);
        newImages.splice(endIndex, 0, removed);
        onChange(newImages);
    };


    const removeImage = (index) => {
            const newImages = Array.from(images || []);
            newImages.splice(index, 1);
            onChange(newImages);

    };


    const setPrimaryImage = (index) => {
        setPrimaryIndex(index);
        const newImages = Array.from(images || []);
        const [primaryImage] = newImages.splice(index, 1);
        newImages.unshift(primaryImage);
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div className="flex items-center justify-center">
                <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"

                    />
                </label>
            </div>

            {/* Image Preview Grid */}
            {images && images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            className="relative group"
                        >
                            <img
                                src={image instanceof File ? URL.createObjectURL(image) : `${apiUrl}/${image}`}
                                alt={`Preview ${index}`}
                                className="object-cover w-full h-32 rounded-lg"
                            />
                            <button type='button'
                                onClick={() => removeImage(index)}
                                className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                            >
                                X
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 py-1 text-xs text-center text-white bg-black bg-opacity-50">
                                {index === 0 ? 'Primary' : `Position ${index + 1}`}
                            </div>
                            {index !== 0 && (
                                <button
                                    onClick={() => setPrimaryImage(index)}
                                    className="absolute p-1 text-xs text-white bg-green-500 rounded-md bottom-1 left-1"
                                >
                                    Set as Primary
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

DynamicImageUpload.propTypes = {
    images: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    apiUrl: PropTypes.string.isRequired,
};
