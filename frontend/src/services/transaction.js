import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTransactions = (token) =>
  api.get("/transactions", {
    headers: { Authorization: `Bearer ${token}` },
});

export const createTransaction = async (form, token) =>
  api.post("/transactions", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const updateTransaction = async (id, formData, token) =>
  api.put(`/transactions/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const deleteTransaction = (id, token) =>
  api.delete(`/transactions/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });


