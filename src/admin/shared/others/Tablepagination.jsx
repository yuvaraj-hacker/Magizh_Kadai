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
        <div className="flex items-center justify-between w-full p-2 px-8">
   
            <div>
                <label htmlFor="rows-per-page" className="mr-2">Rows per page:</label>
                <select
                    id="rows-per-page"
                    value={rows}
                    onChange={(e) => setRows(Number(e.target.value))}
                    className="px-2 py-1 border rounded"
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
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => onPage(page)}
                />
            )}

    
            <div>Total Records: {totalRecords}</div>
        </div>
    );
}
