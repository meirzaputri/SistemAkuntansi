import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDailyReport = async (tanggal, token) => {
  const response = await api.get(`/laporan/harian`, {
    params: { tanggal },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
