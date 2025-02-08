import React from "react";
import { CheckCircle, Truck, Package, Clock } from "lucide-react";

const orderStages = [
    { label: "Order Placed", icon: Clock },
    { label: "Order Processing", icon: Package },
    { label: "Dispatched", icon: Truck },
    { label: "In Transit", icon: Truck },
    { label: "Out for Delivery", icon: Truck },
    { label: "Delivered", icon: CheckCircle },
];

const OrderShow = ({ currentStage }) => {
    return (
        <div className="flex items-center justify-between w-full max-w-4xl mx-auto py-8 px-4">
            {orderStages.map((stage, index) => {
                const isActive = index <= currentStage;
                return (
                    <div key={index} className="relative flex flex-col items-center">
                        {/* Line Connector */}
                        {index > 0 && (
                            <div
                                className={`absolute top-1/2 -translate-y-1/2 left-[-50%] w-20 h-1 transition-all ${isActive ? "bg-green-500" : "bg-gray-300"
                                    }`}
                            ></div>
                        )}

                        {/* Icon */}
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${isActive ? "border-green-500 bg-green-100" : "border-gray-300 bg-gray-100"
                                }`}
                        >
                            <stage.icon className={`w-6 h-6 ${isActive ? "text-green-500" : "text-gray-400"}`} />
                        </div>

                        {/* Label */}
                        <span className={`mt-2 text-sm font-medium ${isActive ? "text-green-600" : "text-gray-400"}`}>
                            {stage.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderShow;
