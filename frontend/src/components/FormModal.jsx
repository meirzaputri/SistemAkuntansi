import React, { useEffect, useState } from "react";
import Label from "./Label";
import Input from "./Input/InputField";
export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState({
    name: "",
    date: "",
    category: "",
    description: "",
    amount: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        date: initialData.date,
        category: initialData.category,
        description: initialData.description || "",
        amount: initialData.amount,
      });
    } else {
      setForm({
        name: "",
        date: "",
        category: "",
        description: "",
        amount: "",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Transaksi" : "Tambah Transaksi"}
        </h2>

        <div className="space-y-4">
          
          <div>
            <Label htmlFor="name">Nama Transaksi <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              placeholder="Masukkan nama transaksi"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="date">Tanggal Transaksi <span className="text-red-500">*</span></Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="category">Kategori <span className="text-red-500">*</span></Label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border bg-white px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20"
            >
              <option value="">Pilih Kategori</option>
              <option value="Kas Masuk">Kas Masuk</option>
              <option value="Kas Keluar">Kas Keluar</option>
            </select>
          </div>

          <div>
            <Label htmlFor="description">Deskripsi <span className="text-red-500">*</span></Label>
            <textarea
              id="description"
              name="description"
              placeholder="Opsional"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/20"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="amount">Nominal <span className="text-red-500">*</span></Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              placeholder="Masukkan nominal"
              value={form.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-400"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
