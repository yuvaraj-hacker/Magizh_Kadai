import { Dialog } from 'primereact/dialog';
import moment from 'moment-timezone';

export default function FlowerPickupTimeModal({ timevisible, setTimevisible, handleTimeClick, isSelected
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
            ];
            timeSlots.push(...times);
        }
        
        return timeSlots;
    };

    const timeSlots = generateTimeSlots();
    const pickupStartDate = moment().add(7, 'days');

    const headerContent = (
        <div className="flex items-center justify-center text-lg font-bold">
            Choose your flower pickup time
        </div>
    );

    return (
        <Dialog header={headerContent} visible={timevisible} onHide={() => setTimevisible(false)} className="w-full max-w-md" >
            <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                    <button key={slot.time}
                        className={`p-2 border rounded ${
                            isSelected(pickupStartDate.toDate(), slot.time) 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleTimeClick(pickupStartDate.toDate(), slot.time)}
                    >
                        {slot.label}
                    </button>
                ))}
            </div>
        </Dialog>
    );
}