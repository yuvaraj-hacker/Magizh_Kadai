import React from 'react'

function Dashboard() {
    return (
        <>
            <div className="bg-white   min-h-[60vh]">
                <div className="p-4  ">
                    <h2 className="text-lg font-semibold">Recent Orders</h2>
                </div>
                <div className="divide-y">
                    <div className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">1234567</span>
                            <span className="px-2.5 py-0.5 rounded-full text-sm  ">
                                Placed
                            </span>
                        </div>
                        <div className="text-sm text-gray-500">06.02/2025</div></div>
                </div>
            </div>
        </>
    )
}
export default Dashboard
