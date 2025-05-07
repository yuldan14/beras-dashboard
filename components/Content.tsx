"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import data from "../app/data_harga.json";

const Content = () => {
  const [hargaHariIni, setHargaHariIni] = useState<number | null>(null);
  const [hargaKemarin, setHargaKemarin] = useState<number | null>(null);
  const [selectedTypeToday, setSelectedTypeToday] = useState("medium");
  const [selectedTypeYesterday, setSelectedTypeYesterday] = useState("medium");

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todayFormatted = today.toISOString().split("T")[0];
    const yesterdayFormatted = yesterday.toISOString().split("T")[0];

    const dataHariIni = data.find((item) => item.date === todayFormatted);
    const dataKemarin = data.find((item) => item.date === yesterdayFormatted);

    if (dataHariIni) {
      if (selectedTypeToday === "medium") {
        setHargaHariIni(
          (parseFloat(dataHariIni.medium_silinda) +
            parseFloat(dataHariIni.medium_bapanas)) /
            2
        );
      } else {
        setHargaHariIni(
          (parseFloat(dataHariIni.premium_silinda) +
            parseFloat(dataHariIni.premium_bapanas)) /
            2
        );
      }
    } else {
      setHargaHariIni(null);
    }

    if (dataKemarin) {
      if (selectedTypeYesterday === "medium") {
        setHargaKemarin(
          (parseFloat(dataKemarin.medium_silinda) +
            parseFloat(dataKemarin.medium_bapanas)) /
            2
        );
      } else {
        setHargaKemarin(
          (parseFloat(dataKemarin.premium_silinda) +
            parseFloat(dataKemarin.premium_bapanas)) /
            2
        );
      }
    } else {
      setHargaKemarin(null);
    }
  }, [selectedTypeToday, selectedTypeYesterday]);

  return (
    <div className="h-40 w-full justify-center md:justify-start flex flex-wrap items-center pt-5">
      <div className="bg-secondary w-54 h-30 rounded-xl ml-10">
        <div className="px-2 py-2 flex">
          <p className="text-black w-8/10 font-sans font-semibold text-sm">
            Harga Beras Hari Ini
          </p>
          <Image
            src="/vector/money.png"
            alt="money"
            width={20}
            height={20}
            className="ml-10"
          />
        </div>
        <div className="mt-6 pr-3 font-reguler flex gap-5  items-center">
          <select
            value={selectedTypeToday}
            onChange={(e) => setSelectedTypeToday(e.target.value)}
            className="ml-2 border border-gray-300 p-1 rounded-md text-black font-light"
          >
            <option value="medium">Medium</option>
            <option value="premium">Premium</option>
          </select>
          <p className="text-right font-sans text-black">
            {hargaHariIni !== null
              ? `Rp${hargaHariIni.toLocaleString("id-ID")}`
              : "Data tidak Ditemukan"}
          </p>
        </div>
      </div>

      <div className="bg-secondary w-54 h-25 rounded-xl ml-10 mt-4">
        <div className="px-2 py-2 flex">
          <p className="text-black w-8/10 font-sans font-reguler text-sm">
            Harga Beras Kemarin
          </p>
        </div>
        <div className="mt-3 pr-3 font-reguler flex gap-5  items-center">
          <select
            value={selectedTypeYesterday}
            onChange={(e) => setSelectedTypeYesterday(e.target.value)}
            className="ml-2 border border-gray-300 p-1 rounded-md text-black font-light"
          >
            <option value="medium">Medium</option>
            <option value="premium">Premium</option>
          </select>
          <p className="text-right font-sans text-black">
            {hargaKemarin !== null
              ? `Rp${hargaKemarin.toLocaleString("id-ID")}`
              : "Data tidak ditemukan"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
