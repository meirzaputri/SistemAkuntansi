import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../../components/Input/SearchBar";
import Pagination from "../../components/Pagination";
import TransactionTable from "../../components/Tabel";
import FilterModal from "../../components/FilterModal";
import { FiFilter } from "react-icons/fi";
import { MdAdd } from "react-icons/md";

export default function Transaction() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const [tanggalPilih, setTanggalPilih] = useState("");
  const [tanggalTransaksi, setTanggalTransaksi] = useState(""); 


  const data = [
    {
      id: 1,
      name: "Pembelian ATK",
      date: "2025-11-17",
      category: "Kas Keluar",
      amount: 320000,
      createdBy: "Admin",
    },
    {
      id: 2,
      name: "Pembayaran Siswa",
      date: "2025-11-17",
      category: "Kas Masuk",
      amount: 1500000,
      createdBy: "Clara",
    },
    {
      id: 3,
      name: "Gaji Karyawan",
      date: "2025-11-17",
      category: "Kas Keluar",
      amount: 5000000,
      createdBy: "Manager",
    },
    {
      id: 4,
      name: "Donasi",
      date: "2025-11-17",
      category: "Kas Masuk",
      amount: 200000,
      createdBy: "Anonim",
    },
    {
      id: 5,
      name: "Perbaikan Komputer",
      date: "2025-01-25",
      category: "Kas Keluar",
      amount: 450000,
      createdBy: "Teknisi",
    },
    {
      id: 6,
      name: "Iuran Bulanan",
      date: "2025-01-28",
      category: "Kas Masuk",
      amount: 800000,
      createdBy: "Bendahara",
    },
    {
      id: 7,
      name: "Penjualan Aset",
      date: "2025-01-29",
      category: "Kas Masuk",
      amount: 1200000,
      createdBy: "Manager",
    },
    {
      id: 8,
      name: "Biaya Listrik",
      date: "2025-01-30",
      category: "Kas Keluar",
      amount: 350000,
      createdBy: "Admin",
    },
    {
      id: 9,
      name: "Dana Pengembangan",
      date: "2025-02-01",
      category: "Kas Masuk",
      amount: 500000,
      createdBy: "Clara",
    },
    {
      id: 10,
      name: "Pembelian Peralatan",
      date: "2025-02-05",
      category: "Kas Keluar",
      amount: 900000,
      createdBy: "Teknisi",
    },
    {
      id: 11,
      name: "Pelunasan Utang",
      date: "2025-02-10",
      category: "Kas Masuk",
      amount: 2000000,
      createdBy: "Manager",
    },
  ];

  const filteredData = data.filter((item) => {
  const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
  const matchDate =
    tanggalTransaksi === "" || item.date === tanggalTransaksi;

    return matchSearch && matchDate;
  });


  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginated = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => setPage(1), [search]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  return (
    <>
      <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-4 mb-6">
        <h1 className="text-black font-medium text-xl py-3 whitespace-nowrap">
          Transaksi
        </h1>

        <div className="flex flex-col md:flex-row lg:flex-row gap-2 md:items-center">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center p-2.5 justify-center text-white rounded-lg shadow-md bg-blue-500 hover:bg-blue-400 shrink-0"
          >
            <FiFilter size={20} />
          </button>

          <button className="flex items-center justify-center gap-1 px-4 py-2 text-base font-medium text-white rounded-lg shadow-md bg-blue-500 hover:bg-blue-400 shrink-0 whitespace-nowrap">
            <MdAdd size={20} />
            <span>Tambah Transaksi</span>
          </button>
        </div>
      </div>

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
          setTanggalTransaksi(tanggalPilih);
          setIsFilterModalOpen(false);
        }}
        handleResetDate={() => {
          setTanggalPilih(today);
          setTanggalTransaksi("");
          setIsFilterModalOpen(false);
        }}
        onClose={() => setIsFilterModalOpen(false)}
      />

      <hr className="my-4 border-gray-200" />

      {paginated.length > 0 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </>
  );
}
