export default function Tableheadpanel(props){
  const {setglobalfilter}=props;
    return(
        <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 ">
                Feedback
              </h2>
            </div>

            <div>
              <div className="inline-flex gap-x-2">
                 <input type="input" placeholder="Search..." className="px-4 py-2 border outline-none rounded-xl" onChange={(e)=>setglobalfilter(e.target.value)} />
              
              </div>
            </div>
          </div>
    )
}