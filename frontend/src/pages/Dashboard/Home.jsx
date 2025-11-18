import React from "react";
import { useEffect, useState } from "react";
import { me } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return <p>Selamat datang, {user.name}</p>;
}
