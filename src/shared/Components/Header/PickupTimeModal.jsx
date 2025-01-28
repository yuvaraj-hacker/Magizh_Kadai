// // import { Dialog } from 'primereact/dialog';
// // import React, { useState } from 'react';
// // import moment from 'moment-timezone';

// // export default function PickupTimeModal({ 
// //     timevisible, 
// //     setTimevisible, 
// //     handleTimeClick, 
// //     isSelected 
// // }) {
// //     const generateTimeSlots = () => {
// //         const timeSlots = [];
// //         const startHour = 9; 
// //         const endHour = 20; 
        
// //         for (let hour = startHour; hour < endHour; hour++) {
// //             const ampm = hour >= 12 ? 'PM' : 'AM'; 
// //             const hour12 = hour % 12 || 12; 

// //             const times = [
// //                 { label: `${hour12}:00 ${ampm}`, time: `${hour}:00` },
// //                 { label: `${hour12}:30 ${ampm}`, time: `${hour}:30` }
// //             ];
// //             timeSlots.push(...times);
// //         }
        
// //         return timeSlots;
// //     };

// //     const timeSlots = generateTimeSlots();


// //     const today = moment();
// //     const tomorrow = moment().add(1, 'day');

// //     const headerContent = (
// //         <div className="flex items-center justify-center">Choose your pickup time</div>
// //     );

// //     return (
// //         <Dialog
// //             visible={timevisible}
// //             modal
// //             header={headerContent}
// //             footer={null}
// //             style={{ width: '50vw' }}
// //             breakpoints={{ '640px': '90vw' }} 
// //             onHide={() => setTimevisible(false)}
// //         >
// //             <div className="lg:p-3">
// //                 <div className="w-full bg-[#38031d] text-white text-center py-2 text-xl font-semibold">
// //                     Free pickup for orders over $35
// //                 </div>

// //                 {/* Today Section */}
// //                 <h2 className='pt-2'>Today ({today.format('MMM DD')})</h2>
// //                 <div className='flex flex-wrap gap-2 pb-2 lg:pb-4'>
// //                     {timeSlots.map((slot) => (
// //                         <div
// //                             key={`today-${slot.time}`}
// //                             onClick={() => handleTimeClick(today, slot.time)}
// //                             style={{
// //                                 backgroundColor: isSelected(today, slot.time) ? '#007bff' : 'transparent',
// //                                 color: isSelected(today, slot.time) ? '#fff' : '#000',
// //                                 border: '1px solid #ccc',
// //                             }}
// //                             className='px-3 py-2 text-sm rounded-md cursor-pointer md:text-base hover:bg-gray-100'
// //                         >
// //                             {slot.label}
// //                         </div>
// //                     ))}
// //                 </div>

// //                 {/* Tomorrow Section */}
// //                 <h2 className='pt-2'>Tomorrow ({tomorrow.format('MMM DD')})</h2>
// //                 <div className='flex flex-wrap gap-2 pb-2 lg:pb-4'>
// //                     {timeSlots.map((slot) => (
// //                         <div
// //                             key={`tomorrow-${slot.time}`}
// //                             onClick={() => handleTimeClick(tomorrow, slot.time)}
// //                             style={{
// //                                 backgroundColor: isSelected(tomorrow, slot.time) ? '#007bff' : 'transparent',
// //                                 color: isSelected(tomorrow, slot.time) ? '#fff' : '#000',
// //                                 border: '1px solid #ccc',
// //                             }}
// //                             className='px-3 py-2 text-sm rounded-md cursor-pointer md:text-base hover:bg-gray-100'
// //                         >
// //                             {slot.label}
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </Dialog>
// //     );
// // }


// import { Dialog } from 'primereact/dialog';
// import React, { useState } from 'react';
// import moment from 'moment-timezone';

// export default function PickupTimeModal({ 
//     timevisible, 
//     setTimevisible, 
//     handleTimeClick, 
//     isSelected 
// }) {
//     const generateTimeSlots = () => {
//         const timeSlots = [];
//         const startHour = 9; 
//         const endHour = 20; 
        
//         for (let hour = startHour; hour < endHour; hour++) {
//             const ampm = hour >= 12 ? 'PM' : 'AM'; 
//             const hour12 = hour % 12 || 12; 

//             const times = [
//                 { label: `${hour12}:00 ${ampm}`, time: `${hour}:00` },
//                 { label: `${hour12}:30 ${ampm}`, time: `${hour}:30` }
//             ];
//             timeSlots.push(...times);
//         }
        
//         return timeSlots;
//     };

//     const timeSlots = generateTimeSlots();

//     const today = moment();
//     const tomorrow = moment().add(1, 'day');
    
//     // Logic to filter today's available time slots based on current time
//     const currentTime = moment();
//     const isPast9PM = currentTime.hour() >= 21; // Check if current time is past 9 PM
    
//     // If it's past 9 PM, only show tomorrow's time slots, otherwise, show from the current time
//     const todayTimeSlots = isPast9PM 
//     ? [] 
//     : timeSlots.filter(slot => {
//         const slotTime = moment(`${today.format('YYYY-MM-DD')} ${slot.time}`, 'YYYY-MM-DD HH:mm');
//         return slotTime.isAfter(currentTime) && slotTime.hour() < 20;
//     });

//     const headerContent = (
//         <div className="flex items-center justify-center">Choose your pickup time</div>
//     );

//     return (
//         <Dialog
//             visible={timevisible}
//             modal
//             header={headerContent}
//             footer={null}
//             style={{ width: '50vw' }}
//             breakpoints={{ '640px': '90vw' }} 
//             onHide={() => setTimevisible(false)}
//         >
//             <div className="lg:p-3">
//                 <div className="w-full bg-[#38031d] text-white text-center py-2 text-xl font-semibold">
//               No Pickup Charges
//                 </div>

//                 {/* Today Section */}
//                 {!isPast9PM && (
//                     <>
//                         <h2 className='pt-2'>Today ({today.format('MMM DD')})</h2>
//                         <div className='flex flex-wrap gap-2 pb-2 lg:pb-4'>
//                             {todayTimeSlots.map((slot) => (
//                                 <div
//                                     key={`today-${slot.time}`}
//                                     onClick={() => handleTimeClick(today, slot.time)}
//                                     style={{
//                                         backgroundColor: isSelected(today, slot.time) ? '#007bff' : 'transparent',
//                                         color: isSelected(today, slot.time) ? '#fff' : '#000',
//                                         border: '1px solid #ccc',
//                                     }}
//                                     className='px-3 py-2 text-sm rounded-md cursor-pointer md:text-base hover:bg-gray-100'
//                                 >
//                                     {slot.label}
//                                 </div>
//                             ))}
//                         </div>
//                     </>
//                 )}

//                 {/* Tomorrow Section */}
//                 <h2 className='pt-2'>Tomorrow ({tomorrow.format('MMM DD')})</h2>
//                 <div className='flex flex-wrap gap-2 pb-2 lg:pb-4'>
//                     {timeSlots.map((slot) => (
//                         <div
//                             key={`tomorrow-${slot.time}`}
//                             onClick={() => handleTimeClick(tomorrow, slot.time)}
//                             style={{
//                                 backgroundColor: isSelected(tomorrow, slot.time) ? '#007bff' : 'transparent',
//                                 color: isSelected(tomorrow, slot.time) ? '#fff' : '#000',
//                                 border: '1px solid #ccc',
//                             }}
//                             className='px-3 py-2 text-sm rounded-md cursor-pointer md:text-base hover:bg-gray-100'
//                         >
//                             {slot.label}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </Dialog>
//     );
// }


import { Dialog } from 'primereact/dialog';
import moment from 'moment-timezone';

export default function PickupTimeModal({ 
    timevisible, 
    setTimevisible, 
    handleTimeClick, 
    isSelected,
    isFlowerCategory = false
}) {
    const generateTimeSlots = () => {
        const timeSlots = [];
        const startHour = 9; 
        const endHour = 16; 
        
        for (let hour = startHour; hour < endHour; hour++) {
            const ampm = hour >= 12 ? 'PM' : 'AM'; 
            const hour12 = hour % 12 || 12; 

            const times = [
                { label: `${hour12}:00 ${ampm}`, time: `${hour}:00` },
                // { label: `${hour12}:30 ${ampm}`, time: `${hour}:30` }
            ];
            timeSlots.push(...times);
        }
        
        return timeSlots;
    };

    const timeSlots = generateTimeSlots();

    const today = moment();
    const tomorrow = moment().add(1, 'day');
    
    // Logic for flower category: start from 7 days later
    const flowerStartDate = isFlowerCategory 
        ? moment().add(7, 'days')
        : today;
    const flowerTomorrow = isFlowerCategory 
        ? moment().add(8, 'days')
        : tomorrow;
    
    const currentTime = moment();
    const isPast9PM = currentTime.hour() >= 21;
    
    const todayTimeSlots = !isFlowerCategory && !isPast9PM 
    ? timeSlots.filter(slot => {
        const slotTime = moment(`${today.format('YYYY-MM-DD')} ${slot.time}`, 'YYYY-MM-DD HH:mm');
        return slotTime.isAfter(currentTime) && slotTime.hour() < 16;
    }) : [];

    const headerContent = (
        <div className="flex items-center justify-center">
            {isFlowerCategory ? "Choose your flower pickup time" : "Choose your pickup time"}
        </div>
    );

    return (
        <Dialog
            visible={timevisible}
            modal
            header={headerContent}
            footer={null}
            style={{ width: '50vw' }}
            breakpoints={{ '640px': '90vw' }} 
            onHide={() => setTimevisible(false)}
            className="dialog-dark"
            pt={{
                root: { className: 'dark:bg-gray-600' },
                content: { className: 'dark:bg-gray-600' },
                header: { className: 'dark:bg-gray-600 dark:text-white' }
              }}
        >
            <div className="lg:p-3">
                <div className="w-full bg-[#38031d] text-white text-center py-2 text-xl font-semibold">
                    {isFlowerCategory ? "Fresh Flowers Pickup" : "No Pickup Charges"}
                </div>

                {!isFlowerCategory && !isPast9PM && (
                    <>
                        <h2 className='pt-2 dark:text-white'>Today ({today.format('MMM DD')})</h2>
                        <div className='flex flex-wrap gap-2 pb-2 lg:pb-4'>
                            {todayTimeSlots.map((slot) => (
                                <div
                                    key={`today-${slot.time}`}
                                    onClick={() => handleTimeClick(today, slot.time)}
                                    style={{
                                        backgroundColor: isSelected(today, slot.time) ? '#007bff' : 'transparent',
                                        color: isSelected(today, slot.time) ? '#fff' : '#000',
                                        border: '1px solid #ccc',
                                    }}
                                    className='px-3 py-2 text-sm rounded-md cursor-pointer md:text-base hover:bg-gray-100'
                                >
                                   <p className='dark:text-white'>{slot.label}</p> 
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <h2 className='pt-2 dark:text-white'>
                    {isFlowerCategory 
                        ? `Available from ${flowerStartDate.format('MMM DD')}` 
                        : `Tomorrow (${tomorrow.format('MMM DD')})`
                    }
                </h2>
                <div className='flex flex-wrap gap-2 pb-2 lg:pb-4'>
                    {timeSlots.map((slot) => (
                        <div
                            key={`${isFlowerCategory ? 'flower' : 'tomorrow'}-${slot.time}`}
                            onClick={() => handleTimeClick(
                                isFlowerCategory ? flowerStartDate : tomorrow, 
                                slot.time
                            )}
                            style={{
                                backgroundColor: isSelected(
                                    isFlowerCategory ? flowerStartDate : tomorrow, 
                                    slot.time
                                ) ? '#007bff' : 'transparent',
                                color: isSelected(
                                    isFlowerCategory ? flowerStartDate : tomorrow, 
                                    slot.time
                                ) ? '#fff' : '#000',
                                border: '1px solid #ccc',
                            }}
                            className='px-3 py-2 text-sm rounded-md cursor-pointer md:text-base hover:bg-gray-100 '
                        >
                           <p className='dark:text-white'>{slot.label}</p> 
                        </div>
                    ))}
                </div>
            </div>
        </Dialog>
    );
}
