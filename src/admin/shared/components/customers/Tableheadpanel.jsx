export default function Tableheadpanel(props){
  const {setglobalfilter}=props;
    return(
        <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 ">
                Customers
              </h2>
            </div>

            <div>
              <div className="inline-flex gap-x-2">
                 <input type="input" placeholder="Search..." className="py-2 px-4 rounded-xl border outline-none" onChange={(e)=>setglobalfilter(e.target.value)} />
              
              </div>
            </div>
          </div>
    )
}