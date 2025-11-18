import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import TransactionTable from "../../components/Tabel";
import SearchBar from "../../components/Input/SearchBar";
import Pagination from "../../components/Pagination";
import ReportSummary from "../../components/Report/ReportSummary";
import FilterModal from "../../components/FilterModal";
import DetailModal from "../../components/DetailModal";

import { getDailyReport } from "../../services/report";

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

    const [detailData, setDetailData] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const itemsPerPage = 7;
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginated = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
    );


    const calculateReportData = async (tanggal) => {
        setLoading(true);
        setReportSummary(null);
        setFilteredTransactions([]);

        try {
            const token = localStorage.getItem("token");

            const res = await getDailyReport(tanggal, token);
            
            setReportSummary({
                total_kas_masuk: res.total_kas_masuk,
                total_kas_keluar: res.total_kas_keluar,
            });

            if (res.transaksi) {
                setBaseTransactions(res.transaksi);
                setFilteredTransactions(res.transaksi);
            } else {
                setBaseTransactions([]);
                setFilteredTransactions([]);
            }
            
        } catch (err) {
            console.error(err);
            setReportSummary({
            total_kas_masuk: 0,
            total_kas_keluar: 0,
            });
        } finally {
            setLoading(false)
        }
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

    const onDetail = (id) => {
      const selected = baseTransactions.find((t) => t.id === id);
      
      setDetailData(selected);
      setIsDetailOpen(true);
      setOpenDropdown(null);
  };

        
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
                mode="report"
                onDetail={onDetail}
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

            <DetailModal
                    isOpen={isDetailOpen}
                    onClose={() => setIsDetailOpen(false)}
                    data={detailData}
                    formatDate={formatDate}
                    formatRupiah={formatRupiah}
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