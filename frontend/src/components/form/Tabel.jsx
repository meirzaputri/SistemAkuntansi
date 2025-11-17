import React from 'react';
import ActionDropdown from './ActionDropdown';

function Table({ item, formatDate, formatRupiah, openDropdown, setOpenDropdown }) {
    const categoryClass = item.category === 'Kas Masuk' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';

    return (
        <tr key={item.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
            <td className="py-2 px-4 w-[18%]">{item.name}</td> 
            <td className="py-2 px-4 w-[20%] text-gray-500 text-sm">{formatDate(item.date)}</td>
            <td className="py-2 px-4 w-[20%]">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryClass}`}>
                    {item.category}
                </span>
            </td>
            <td className="py-2 px-4 w-[18%] font-normal">
                {formatRupiah(item.amount)}
            </td>
            <td className="py-2 px-4 w-[15%] text-gray-600">{item.createdBy}</td>
            
            <ActionDropdown
                itemId={item.id}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
            />
        </tr>
    );
}

export default function TransactionTable({ paginated, formatDate, formatRupiah, openDropdown, setOpenDropdown }) {
    return (
        <div className="w-full border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse">
                <thead>
                    <tr className="text-left text-sm text-gray-700 border-b border-gray-300 bg-gray-50">
                        <th className="py-2 px-4 w-[25%]">Nama Transaksi</th>
                        <th className="py-2 px-4 w-[12%]">Tanggal</th>
                        <th className="py-2 px-4 w-[12%]">Kategori</th>
                        <th className="py-2 px-4 w-[18%]">Nominal</th>
                        <th className="py-2 px-4 w-[15%]">Dibuat Oleh</th>
                        <th className="py-2 px-4 w-[8%]"></th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((item) => (
                        <Table
                            key={item.id}
                            item={item}
                            formatDate={formatDate}
                            formatRupiah={formatRupiah}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}