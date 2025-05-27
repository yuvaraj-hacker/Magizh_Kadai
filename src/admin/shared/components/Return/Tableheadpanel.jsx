import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Tableheadpanel(props) {
  const { newform, setglobalfilter } = props;

  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setglobalfilter(e.target.value);
  };
  const clearSearch = () => {
    setSearch("");
    setglobalfilter(""); // Clear global filter
  };


  return (
    <div className="flex items-center justify-between md:px-6  py-4 px-3">
      {/* <div>
              <h2 className="text-xl font-semibold text-primary ">
                Purchase
              </h2>
            </div> */}
      <div>
      </div>
      <div>
        <div className="inline-flex gap-x-2">
          {/* <input type="input" placeholder="Search..." className="px-4 py-2 border outline-none rounded-xl" onChange={(e) => setglobalfilter(e.target.value)} /> */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              className="px-4 py-2 border outline-none rounded-xl pr-10 md:w-[450px] border-primary focus:border-primary/80" // Adjust padding for icon space
              onChange={handleSearchChange}
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {/* <button onClick={newform} className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-primary border border-transparent rounded-lg gap-x-2">
            <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Purchase
          </button> */}
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}