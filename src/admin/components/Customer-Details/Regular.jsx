import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { FilterMatchMode } from 'primereact/api'
import { useCallback, useEffect, useState, useRef } from 'react'
import { getregularcustomer } from '../../shared/services/apiorders/apiorders';
import { MultiSelect } from 'primereact/multiselect';

function Regular() {
    const [getCustomers, setAllCustomers] = useState([]);
    const [billingNameOptions, setBillingNameOptions] = useState([]);
    const [mobileOptions, setMobileOptions] = useState([]);
    const [addressOptions, setAddressOptions] = useState([]);

    const [filters, setFilters] = useState({
        'Billing_Name': { value: null, matchMode: FilterMatchMode.IN },
        'Mobilenumber': { value: null, matchMode: FilterMatchMode.IN },
        'Delivery_Address': { value: null, matchMode: FilterMatchMode.IN }
    });
    const [tempFilters, setTempFilters] = useState({
        Billing_Name: [],
        Mobilenumber: [],
        Delivery_Address: []
    });

    const [globalFilter, setGlobalFilter] = useState('');

    const dt = useRef(null);
    const allCustomer = useCallback(async () => {
        try {
            const res = await getregularcustomer();
            const customers = res.customers || [];
            setAllCustomers(customers);
            setBillingNameOptions([...new Set(customers.map(c => c.Billing_Name))].map(name => ({ label: name, value: name })));
            setMobileOptions([...new Set(customers.map(c => c.Mobilenumber))].map(mob => ({ label: mob, value: mob })));
            setAddressOptions([...new Set(customers.map(c => c.Delivery_Address))].map(addr => ({ label: addr, value: addr })));
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

    const handleFilterChange = (field, value) => {
        setTempFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const applyFilters = (field) => {
        const newFilters = { ...filters };
        newFilters[field] = {
            value: tempFilters[field].length > 0 ? tempFilters[field] : null,
            matchMode: FilterMatchMode.IN
        };
        setFilters(newFilters);
        dt.current && dt.current.hide();
    };

    const clearFilters = (field) => {
        setTempFilters(prev => ({
            ...prev,
            [field]: []
        }));
        const newFilters = { ...filters };
        newFilters[field] = { value: null, matchMode: FilterMatchMode.IN };
        setFilters(newFilters);
        dt.current && dt.current.hide();
    };

    const resetAllFilters = () => {
        setGlobalFilter('');
        setTempFilters({
            Billing_Name: [],
            Mobilenumber: [],
            Delivery_Address: []
        });
        setFilters({
            'Billing_Name': { value: null, matchMode: FilterMatchMode.IN },
            'Mobilenumber': { value: null, matchMode: FilterMatchMode.IN },
            'Delivery_Address': { value: null, matchMode: FilterMatchMode.IN }
        });
        dt.current && dt.current.reset();
    };

    const filterss = (options, selectOptions, field) => {
        return (
            <>
                <MultiSelect
                    value={tempFilters[field]}
                    options={selectOptions}
                    onChange={(e) => handleFilterChange(field, e.value)}
                    placeholder="Select"
                    className="p-column-filter w-60"
                    display="chip"
                    panelFooterTemplate={
                        <div className="flex justify-evenly p-2 mt-2">
                            <button
                                className='p-2 bg-[#6B7280] text-white rounded-lg px-4 hover:bg-[#4B5563]'
                                onClick={() => clearFilters(field)}
                                type="button"
                            >
                                Clear
                            </button>
                            <button
                                className='p-2 bg-[#2563EB] text-white rounded-lg px-4 hover:bg-[#1D4ED8]'
                                onClick={() => applyFilters(field)}
                                type="button"
                            >
                                Apply
                            </button>
                        </div>
                    }
                />
            </>
        );
    };

    return (
        <>
            <section className='border rounded-md'>
                <div className="flex items-center justify-between gap-4 px-6 py-3">
                    <div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <div>
                            <input type="text" value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Search..."
                                className="px-4 py-2 border outline-none rounded-xl"
                            />
                        </div>
                        <div>
                            <button
                                onClick={resetAllFilters}
                                className="  px-3 py-2 text-sm font-semibold flex items-center gap-3  border border-gray-300 p-2 rounded-lg gap-x-2"
                                type="button"
                            >
                                <i class="fi fi-ts-rotate-reverse flex items-center "></i>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                <DataTable ref={dt} value={getCustomers} showGridlines className='border border-b' filters={filters} globalFilter={globalFilter} emptyMessage="No customers found."  >
                    <Column header="S.No" body={serialBodyTemplate} headerClassName='bg-primary text-white ' style={{ minWidth: '50px' }} />
                    <Column
                        filter
                        filterField="Billing_Name"
                        filterMatchMode={FilterMatchMode.IN}
                        filterElement={(options) => filterss(options, billingNameOptions, 'Billing_Name')}
                        showFilterOperator={false}
                        showAddButton={false}
                        showFilterMatchModes={false}
                        header="Name"
                        field="Billing_Name"
                        headerClassName='bg-primary text-white'
                        style={{ minWidth: '50px' }}
                    />
                    <Column
                        filter
                        filterField="Mobilenumber"
                        filterMatchMode={FilterMatchMode.IN}
                        filterElement={(options) => filterss(options, mobileOptions, 'Mobilenumber')}
                        showFilterOperator={false}
                        showAddButton={false}
                        showFilterMatchModes={false}
                        header="Mobile Number"
                        field='Mobilenumber'
                        headerClassName='bg-primary text-white'
                        style={{ minWidth: '90px' }}
                    />
                    <Column
                        filter
                        filterField="Delivery_Address"
                        filterMatchMode={FilterMatchMode.IN}
                        filterElement={(options) => filterss(options, addressOptions, 'Delivery_Address')}
                        showFilterOperator={false}
                        showAddButton={false}
                        showFilterMatchModes={false}
                        header="Address"
                        field='Delivery_Address'
                        headerClassName='bg-primary text-white'
                        style={{ minWidth: '270px' }}
                    />
                </DataTable>
            </section >
        </>
    )
}

export default Regular
