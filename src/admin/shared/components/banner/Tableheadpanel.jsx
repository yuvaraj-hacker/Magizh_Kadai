// export default function Tableheadpanel(props){
//   const {newform,setglobalfilter,bannerform,setIsDialogVisible}=props;
//     return(
//         <div className="flex items-center justify-between px-6 py-4">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 ">
//               Banners
//               </h2>
//             </div>

//             <div>
//               <div className="inline-flex gap-x-2">
//                  <input type="input" placeholder="Search..." className="px-4 py-2 border outline-none rounded-xl" onChange={(e)=>setglobalfilter(e.target.value)} />
//                 <button onClick={newform} className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-secondary gap-x-2 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none">
//                   <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
//                     <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//                   </svg>
//                   Add Banner
//                 </button>
//                 <button onClick={bannerform} className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-secondary gap-x-2 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none">
//                   <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
//                     <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//                   </svg>
//                   Add BannerType
//                 </button>
//                 <button onClick={setIsDialogVisible} className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-secondary gap-x-2 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none">
             
//                 <i className="mt-1 fi fi-rs-eye"></i> View BannerType
//                 </button>
//               </div>
//             </div>
//           </div>
//     )
// }



export default function Tableheadpanel(props) {
    const { newform, setglobalfilter, activeTab, setActiveTab } = props;

    return (
        <div className="flex items-center justify-between px-6 py-4">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">Banners</h2>
            </div>

            <div className="flex gap-x-2">
             
                <button
                    onClick={() => setActiveTab('Main Carousel')}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                        activeTab === 'Main Carousel'
                            ? 'bg-primary text-white shadow'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Main Carousel
                </button>
                <button
                    onClick={() => setActiveTab('Category Deals')}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                        activeTab === 'Category Deals'
                            ? 'bg-primary text-white shadow'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Category Deals
                </button>
                <input
                    type="input"
                    placeholder="Search..."
                    className="px-4 py-2 border outline-none rounded-xl"
                    onChange={(e) => setglobalfilter(e.target.value)}
                />
                <button
                    onClick={newform}
                    className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white border border-transparent rounded-lg bg-secondary gap-x-2 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none"
                >
                    <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Add {activeTab} Banner
                </button>
            </div>
        </div>
    )
}