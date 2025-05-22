import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useCallback, useEffect, useState } from 'react'
import { getregularcustomer } from '../../shared/services/apiorders/apiorders';

function Regular() {
    const [getCustomers, setAllCustomers] = useState({});


    const allCustomer = useCallback(async () => {
        try {
            const res = await getregularcustomer();
            setAllCustomers(res.customers);
            console.log(res)
        } catch (error) {
            console.error("Failed to fetch customers:", error);
        }
    }, []);

    useEffect(() => {
        allCustomer();
    }, [allCustomer]);

    const serialBodyTemplate = (rowData, { rowIndex }) => {
        return <span>{rowIndex + 1}</span>;
    };


    return (
        <>
            <section>
                <DataTable value={getCustomers} showGridlines className='border' >
                    <Column header="S.No" body={serialBodyTemplate} headerClassName='bg-primary text-white ' style={{ minWidth: '50px' }} />
                    <Column header="Name" field="Billing_Name" headerClassName='bg-primary text-white ' style={{ minWidth: '50px' }} />
                    <Column header="Mobile Number" field='Mobilenumber' headerClassName='bg-primary text-white ' style={{ minWidth: '90px' }} />
                    <Column header="Address" field='Delivery_Address' headerClassName='bg-primary text-white ' style={{ minWidth: '270px' }} />
                    {/* <Column header="City" field='City' headerClassName='bg-primary text-white ' style={{ minWidth: '150px' }} />
                    <Column header="State" field='State' headerClassName='bg-primary text-white ' style={{ minWidth: '100px' }} />
                    <Column header="Pincode" field='Pincode' headerClassName='bg-primary text-white ' style={{ minWidth: '100px' }} /> */}
                </DataTable>
            </section>
        </>
    )
}

export default Regular
