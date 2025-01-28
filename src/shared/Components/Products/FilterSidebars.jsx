export default function FilterSidebar(props) {

    const { togfilter, settog, tog, settog2, tog2, settog3, tog3, Tags, handleTagsCheckboxChange } = props;



    return (
        <>
            <div className={`${togfilter ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 duration-300 fixed top-16 left-0 min-h-screen lg:min-h-full bg-[#fff7f5] lg:bg-transparent z-[46] px-3 lg:px-0 lg:static `}>
                <div className="w-full overflow-y-auto max-h-[calc(100vh-100px)] lg:sticky top-1/4  bg-[#fff7f5] rounded-lg p-2 lg:p-4 pt-20 lg:pt-2">
                    <div className="flex justify-between w-full">
                        <label className='font-bold' htmlFor="">Filters</label>
                        <button onClick={() => window.location.reload()} className='text-sm opacity-90'>Reset</button>
                    </div>
                    <div>
                        <button onClick={() => { settog(!tog) }} className='inline-flex items-center justify-between w-full pt-2 pb-1 text-sm font-bold'>
                            Product type <i className={`fi fi-br-angle-small-down ${tog ? 'rotate-180' : 'rotate-0'} duration-300`}></i>
                        </button>
                        <div className={`${tog ? 'max-h-[200px]' : 'max-h-0'} flex flex-col lg:gap-1 gap-2 duration-300 ease-in-out overflow-hidden`}>
                            <div className="flex">
                                <input type="checkbox" id="hs-default-checkbox" checked={Tags.includes('Deals')} onChange={(e) => handleTagsCheckboxChange(e, 'Deals')} className="shrink-0 mt-0.5 border-gray-200 rounded text-pink-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                <label htmlFor="hs-default-checkbox" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">
                                    Deals
                                </label>
                            </div>
                            <div className="flex">
                                <input type="checkbox" id="hs-default-checkbox2" checked={Tags.includes('New Arrivals')} onChange={(e) => handleTagsCheckboxChange(e, 'New Arrivals')} className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                <label htmlFor="hs-default-checkbox2" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">
                                    New Arrivals
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button onClick={() => { settog2(!tog2) }} className='inline-flex justify-between w-full pt-2 pb-1 text-sm font-bold'>
                            Offers <i className={`fi fi-br-angle-small-down ${tog2 ? 'rotate-180' : 'rotate-0'} duration-300`}></i>
                        </button>
                        <div className={`${tog2 ? 'max-h-[200px]' : 'max-h-0'} flex flex-col lg:gap-1 gap-2 duration-300 ease-in-out overflow-hidden *:whitespace-nowrap`}>
                            <div className="flex ">
                                <input type="checkbox" id="hs-default-checkbox3" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"  />
                                <label htmlFor="hs-default-checkbox3" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">Below 10% OFF</label>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="hs-default-checkbox4" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"  />
                                <label htmlFor="hs-default-checkbox4" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">10 to 20% OFF</label>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="hs-default-checkbox5" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"  />
                                <label htmlFor="hs-default-checkbox5" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">20 to 30% OFF</label>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="hs-default-checkbox6" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"  />
                                <label htmlFor="hs-default-checkbox6" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">30 to 40% OFF</label>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="hs-default-checkbox13" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"  />
                                <label htmlFor="hs-default-checkbox13" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">50% & Above</label>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <button onClick={() => { settog3(!tog3) }} className='inline-flex justify-between w-full pt-2 pb-1 text-sm font-bold'>
                            Price <i className={`fi fi-br-angle-small-down ${tog3 ? 'rotate-180' : 'rotate-0'} duration-300`}></i>
                        </button>
                        <div className={`${tog3 ? 'max-h-[300px] ' : 'max-h-0 '} flex flex-col lg:gap-1 gap-2  duration-300 ease-in-out overflow-hidden`}>
                            <div className="flex ">
                                <input type="checkbox" id="hs-default-checkbox7" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"  />
                                <label htmlFor="hs-default-checkbox7" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">All</label>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="hs-default-checkbox8" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                <label htmlFor="hs-default-checkbox8" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">Under $5</label>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="hs-default-checkbox9" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"  />
                                <label htmlFor="hs-default-checkbox9" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">$5 - $10</label>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="hs-default-checkbox10" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"  />
                                <label htmlFor="hs-default-checkbox10" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">$10 - $15</label>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="hs-default-checkbox11" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"  />
                                <label htmlFor="hs-default-checkbox11" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">$15 - $25</label>
                            </div>
                            <div className="flex ">
                                <input type="checkbox" id="hs-default-checkbox12" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"  />
                                <label htmlFor="hs-default-checkbox12" className="text-sm text-gray-500 cursor-pointer ms-2 dark:text-neutral-400">$25 & Above</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}