// import { Dialog } from 'primereact/dialog';
// import React, { useState, useEffect } from 'react';



// export default function DeliveryDate({ datevisible, setDatevisible, thisWeekDates, handleDateClick, isSelected, nextWeekDates }) {

//     const headerContent = (
//         <div className="flex items-center justify-center">Choose your delivery date</div>
//     );

//     return (
//         <Dialog
//             visible={datevisible}
//             modal
//             header={headerContent}
//             footer={null}
//             style={{ width: '50vw' }}
//             breakpoints={{ '640px': '90vw' }} onHide={() => setDatevisible(false)}  >
//             <div className="lg:p-3">
//                 <div className="w-full bg-[#38031d] text-white text-center py-2 text-xl font-semibold">
//                     Free delivery over $35
//                 </div>
//                 <h2 className='pt-2'>This week</h2>
//                 <div className='flex flex-wrap gap-2 pb-2 lg:pb-4'>
//                     {thisWeekDates.map((date) => (
//                         <div
//                             key={date.toDateString()}
//                             onClick={() => handleDateClick(date)}
//                             style={{
//                                 padding: '10px',
//                                 borderRadius: '50%',
//                                 backgroundColor: isSelected(date) ? '#007bff' : 'transparent',
//                                 color: isSelected(date) ? '#fff' : '#000',
//                                 border: '1px solid #ccc',
//                                 cursor: 'pointer',
//                                 textAlign: 'center',
//                             }}
//                             className='h-[70px] md:h-[80px] w-[70px] md:w-[80px] text-center cursor-pointer'
//                         >
//                             <div className='text-sm md:text-base'>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
//                             <div className='text-sm md:text-base'>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
//                         </div>
//                     ))}
//                 </div>

//                 <h2 className='pt-2'>Next week</h2>
//                 <div className='flex flex-wrap gap-2 pb-2 lg:pb-4'>
//                     {nextWeekDates.map((date) => (
//                         <div
//                             key={date.toDateString()}
//                             onClick={() => handleDateClick(date)}
//                             style={{
//                                 padding: '10px',
//                                 borderRadius: '50%',
//                                 backgroundColor: isSelected(date) ? '#007bff' : 'transparent',
//                                 color: isSelected(date) ? '#fff' : '#000',
//                                 border: '1px solid #ccc',
//                             }}
//                             className='h-[70px] md:h-[80px] w-[70px] md:w-[80px] text-center cursor-pointer'
//                         >
//                             <div className='text-sm md:text-base'>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
//                             <div className='text-sm md:text-base'>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </Dialog>
//     );
// }


import { Dialog } from 'primereact/dialog';
import moment from 'moment-timezone';

export default function DeliveryDate({ 
    datevisible, 
    setDatevisible, 
    thisWeekDates, 
    handleDateClick, 
    isSelected, 
    nextWeekDates, 
    isFlowerCategory = false 
}) {
    // Generate dates for one week after the current date for flower category
    const generateFlowerDates = () => {
        const dates = [];
        const startDate = moment().add(7, 'days');
        
        for (let i = 0; i < 10; i++) {
            dates.push(startDate.clone().add(i, 'days').toDate());
        }
        
        return dates;
    };

    const flowerDates = isFlowerCategory ? generateFlowerDates() : [];

    const headerContent = (
        <div className="flex items-center justify-center">
            {isFlowerCategory ? "Choose your flower delivery date" : "Choose your delivery date"}
        </div>
    );

    return (
        <Dialog visible={datevisible} modal header={headerContent} footer={null} style={{ width: '50vw' }} breakpoints={{ '640px': '90vw' }} 
        onHide={() => setDatevisible(false)} className="dialog-dark"   
        pt={{
            root: { className: 'dark:bg-gray-600' },
            content: { className: 'dark:bg-gray-600' },
            header: { className: 'dark:bg-gray-600 dark:text-white' }
          }} >
            <div className="lg:p-3">
                <div className="w-full bg-[#38031d] text-white text-center py-2 text-xl font-semibold">
                    {isFlowerCategory ? "Fresh Flowers Delivery" : "Free delivery over $35"}
                </div>
                
                {!isFlowerCategory ? (
                    <>
                        <h2 className='pt-2 dark:text-white'>This week</h2>
                        <div className='flex flex-wrap gap-2 pb-2 lg:pb-4'>
                            {thisWeekDates.map((date) => (
                                <div
                                    key={date.toDateString()}
                                    onClick={() => handleDateClick(date)}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: isSelected(date) ? '#007bff' : 'transparent',
                                        color: isSelected(date) ? '#fff' : '#000',
                                        border: '1px solid #ccc',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                    }}
                                    className='h-[70px] md:h-[80px] w-[70px] md:w-[80px] text-center cursor-pointer'
                                >
                                    <div className='text-sm md:text-base dark:text-white'>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                    <div className='text-sm md:text-base dark:text-white'>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                                </div>
                            ))}
                        </div>

                        <h2 className='pt-2 dark:text-white'>Next week</h2>
                        <div className='flex flex-wrap gap-2 pb-2 lg:pb-4'>
                            {nextWeekDates.map((date) => (
                                <div
                                    key={date.toDateString()}
                                    onClick={() => handleDateClick(date)}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: isSelected(date) ? '#007bff' : 'transparent',
                                        color: isSelected(date) ? '#fff' : '#000',
                                        border: '1px solid #ccc',
                                    }}
                                    className='h-[70px] md:h-[80px] w-[70px] md:w-[80px] text-center cursor-pointer'
                                >
                                    <div className='text-sm md:text-base dark:text-white'>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                    <div className='text-sm md:text-base dark:text-white'>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='flex flex-wrap gap-2 pb-2 lg:pb-4'>
                        {flowerDates.map((date) => (
                            <div
                                key={date.toDateString()}
                                onClick={() => handleDateClick(date)}
                                style={{
                                    padding: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: isSelected(date) ? '#007bff' : 'transparent',
                                    color: isSelected(date) ? '#fff' : '#000',
                                    border: '1px solid #ccc',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                }}
                                className='h-[70px] md:h-[80px] w-[70px] md:w-[80px] text-center cursor-pointer'
                            >
                                <div className='text-sm md:text-base'>{moment(date).format('ddd')}</div>
                                <div className='text-sm md:text-base'>{moment(date).format('MMM D')}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Dialog>
    );
}
