// import { Pagination } from '@nextui-org/react';
// import { useMemo } from 'react';
// export default function Tablepagination(props){
//     const {rows,page,onPage,totalRecords}=props;
//     const pages = useMemo(() => {
//         return totalRecords ? Math.ceil(totalRecords / rows) : 0;
//       }, [totalRecords, rows]);
//     return(
//         <div className="flex items-center justify-between w-full p-2 px-8">
//           <div></div>
//         {totalRecords > 0 && (<Pagination isCompact showControls showShadow color="primary" page={page} total={pages} onChange={(page) => onPage(page)} />) }
//         <div>Total Records : {totalRecords}</div>
//       </div>
//     )
// }


import { Pagination } from '@nextui-org/react';
import { useMemo } from 'react';

export default function Tablepagination(props) {
    const { rows, page, onPage, totalRecords, setRows } = props;
    const pages = useMemo(() => {
        return totalRecords ? Math.ceil(totalRecords / rows) : 0;
    }, [totalRecords, rows]);
    const rowOptions = [10, 20, 50, 100];
    return (
        <div className="flex items-center justify-between w-full md:p-2 p-1 bg-primary rounded-b-xl px-2 md:px-4">

            <div className='flex items-center  '>
                <label htmlFor="rows-per-page" className="mr-2 md:text-base text-sm text-white md:block hidden">Rows per page:</label>
                <select
                    id="rows-per-page"
                    value={rows}
                    onChange={(e) => setRows(Number(e.target.value))}
                    className="md:px-2 px-1 py-1 border md:text-base text-sm rounded"
                >
                    {rowOptions.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>


            {totalRecords > 0 && (
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    className='md:text-base text-sm'
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => onPage(page)}
                />
            )}


            <div className='text-white md:text-sm text-xs whitespace-nowrap flex  gap-1'>Total <span className='md:hidden block'> :</span> <span className='md:block hidden'>Records:</span>  {totalRecords}</div>
        </div>
    );
}
