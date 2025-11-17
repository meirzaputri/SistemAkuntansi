import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import TransactionTable from "../../components/Tabel";
import SearchBar from "../../components/Input/SearchBar";
import Pagination from "../../components/Pagination";
import ReportSummary from "../../components/Report/ReportSummary";
import FilterModal from "../../components/FilterModal";

const data = [
        { id: 1, name: "Pembelian ATK", date: "2025-11-17", category: "Kas Keluar", amount: 320000, createdBy: "Admin" },
        { id: 2, name: "Pembayaran Siswa", date: "2025-11-17", category: "Kas Masuk", amount: 1500000, createdBy: "Clara" },
        { id: 3, name: "Gaji Karyawan", date: "2025-11-17", category: "Kas Keluar", amount: 5000000, createdBy: "Manager" },
        { id: 4, name: "Donasi", date: "2025-11-17", category: "Kas Masuk", amount: 200000, createdBy: "Anonim" },
        { id: 5, name: "Perbaikan Komputer", date: "2025-01-25", category: "Kas Keluar", amount: 450000, createdBy: "Teknisi" },
        { id: 6, name: "Iuran Bulanan", date: "2025-01-28", category: "Kas Masuk", amount: 800000, createdBy: "Bendahara" },
        { id: 7, name: "Penjualan Aset", date: "2025-01-29", category: "Kas Masuk", amount: 1200000, createdBy: "Manager" },
        { id: 8, name: "Biaya Listrik", date: "2025-01-30", category: "Kas Keluar", amount: 350000, createdBy: "Admin" },
        { id: 9, name: "Dana Pengembangan", date: "2025-02-01", category: "Kas Masuk", amount: 500000, createdBy: "Clara" },
        { id: 10, name: "Pembelian Peralatan", date: "2025-02-05", category: "Kas Keluar", amount: 900000, createdBy: "Teknisi" },
        { id: 11, name: "Pelunasan Utang", date: "2025-02-10", category: "Kas Masuk", amount: 2000000, createdBy: "Manager" },
];

const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, }).format(number);
const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(new Date(dateString));
};

export default function Reports() {
    const today = new Date().toISOString().split('T')[0];
    
    const [search, setSearch] = useState("");
    const [reportSummary, setReportSummary] = useState(null);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tanggalLaporan, setTanggalLaporan] = useState(today); 
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [tanggalPilih, setTanggalPilih] = useState(today); 
    const [page, setPage] = useState(1);
    const [openDropdown, setOpenDropdown] = useState(null); 
    const [baseTransactions, setBaseTransactions] = useState([]);

    const itemsPerPage = 7;
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginated = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
    );


    const calculateReportData = (tanggal) => {
        setLoading(true);
        setReportSummary(null);
        setFilteredTransactions([]);

        const transactionsOnDate = data.filter(item => item.date === tanggal);
        
        if (transactionsOnDate.length === 0) {
            setLoading(false);
            setReportSummary({ total_kas_masuk: 0, total_kas_keluar: 0 });
            setFilteredTransactions([]);
            return;
        }

        const totals = transactionsOnDate.reduce((acc, item) => {
            if (item.category === 'Kas Masuk') {
                acc.total_kas_masuk += item.amount;
            } else if (item.category === 'Kas Keluar') {
                acc.total_kas_keluar += item.amount;
            }
            return acc;
        }, { total_kas_masuk: 0, total_kas_keluar: 0 });
        
        setTimeout(() => {
            setReportSummary(totals);
            setBaseTransactions(transactionsOnDate);
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        calculateReportData(tanggalLaporan);
    }, [tanggalLaporan]);

    useEffect(() => {
        setPage(1);
    }, [tanggalLaporan]);

    useEffect(() => {
        const result = baseTransactions.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredTransactions(result);
        setPage(1);
    }, [search, baseTransactions]);

        
    return (
        <div> 
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <h1 className="text-black font-medium text-xl py-3 whitespace-nowrap">
                        Laporan Kas Harian
                    </h1>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <SearchBar search={search} setSearch={setSearch} />

                        <button
                            onClick={() => setIsFilterModalOpen(true)}
                            className="flex items-center py-2 px-3 justify-center text-white rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 shrink-0"
                        >
                            <FiFilter size={20} />
                        </button>
                    </div>
            </div>

            <ReportSummary 
                loading={loading}
                reportSummary={reportSummary}
                filteredTransactions={filteredTransactions}
                tanggalLaporan={tanggalLaporan}
                formatDate={formatDate}
                formatRupiah={formatRupiah}
            />

            <TransactionTable
                paginated={paginated}
                formatDate={formatDate}
                formatRupiah={formatRupiah}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
            />

            <FilterModal
                isFilterModalOpen={isFilterModalOpen}
                tanggalPilih={tanggalPilih}
                setTanggalPilih={setTanggalPilih}
                today={today}
                handleApplyDate={() => {
                    setTanggalLaporan(tanggalPilih);
                    setIsFilterModalOpen(false);
                }}
                handleResetDate={() => {
                    setTanggalPilih(today);
                    setTanggalLaporan(today);
                    setIsFilterModalOpen(false);
                }}
                onClose={() => setIsFilterModalOpen(false)}
            />

            <hr className="my-4 border-gray-200" />
            
            {paginated.length > 0 && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    );
}