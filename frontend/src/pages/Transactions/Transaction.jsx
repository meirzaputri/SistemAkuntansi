import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../../components/Input/SearchBar";
import Pagination from "../../components/Pagination";
import TransactionTable from "../../components/Tabel";
import FilterModal from "../../components/FilterModal";
import FormModal from "../../components/FormModal";
import DetailModal from "../../components/DetailModal";

import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from "../../services/transaction";
import { useAuth } from "../../context/AuthContext";
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

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const { token, user } = useAuth();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getTransactions(token);
      console.log("GET TRANSACTIONS:", res.data);
    
      setTransactions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
        console.log("ERR:", err);
        setTransactions([]);
    }
  };

  fetchData();
  }, []);

  const filteredData = transactions.filter((item) => {
  const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
  const matchDate = tanggalTransaksi === "" || item.date === tanggalTransaksi;

    return matchSearch && matchDate;
  });

  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginated = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

    const onDetail = (id) => {
      console.log("onDetail terpanggil, id =", id);
      const selected = transactions.find((t) => t.id === id);
      console.log("DATA TERPILIH =", selected); 
      
      setDetailData(selected);
      setIsDetailOpen(true);
      setOpenDropdown(null);
  };

  const onEdit = (id) => {
    const selected = transactions.find((t) => t.id === id);
    setEditData(selected);
    setIsFormModalOpen(true);
    setOpenDropdown(null);
  };

  const onDelete = async (id) => {
  const confirmDelete = confirm("Yakin ingin menghapus transaksi ini?");

  if (!confirmDelete) return;

  try {
    await deleteTransaction(id, token);

    const res = await getTransactions(token);
    setTransactions(res.data);

    setOpenDropdown(null);
  } catch (err) {
    alert("Gagal menghapus transaksi");
  }
};


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

          <button className="flex items-center justify-center gap-1 px-4 py-2 text-base font-medium text-white rounded-lg shadow-md bg-blue-500 hover:bg-blue-400 shrink-0 whitespace-nowrap"
            onClick={() => {
              setIsFormModalOpen(true); 
              setEditData(null);
            }}
          >
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
        onDetail={onDetail}
        onEdit={onEdit}
        onDelete={onDelete}
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

      <FormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={editData}
        onSubmit={async(form) => {
          try {
            if (editData) {
              await updateTransaction(editData.id, form, token);
            } else (
              await createTransaction(form, token)
            );

            const res = await getTransactions(token);
            setTransactions(res.data);

            setIsFormModalOpen(false);
          } catch (err) {
            alert("Gagal tambah transaksi");
          }
        }}
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
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </>
  );
}
