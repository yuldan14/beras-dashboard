"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import data from "../app/data_harga.json";
import {
  predictMediumSilinda,
  predictMediumBapanas,
  predictPremiumSilinda,
  predictPremiumBapanas,
} from "@/utils/api";

const Content = () => {
  const [hargaHariIni, setHargaHariIni] = useState<number | null>(null);
  const [hargaKemarin, setHargaKemarin] = useState<number | null>(null);
  const [hargaBesok, setHargaBesok] = useState<number | null>(null);

  const [selectedTypeToday, setSelectedTypeToday] = useState("medium");
  const [selectedTypeYesterday, setSelectedTypeYesterday] = useState("medium");
  const [selectedTypeTomorrow, setSelectedTypeTomorrow] = useState("medium_silinda");

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todayFormatted = today.toISOString().split("T")[0];
    const yesterdayFormatted = yesterday.toISOString().split("T")[0];

    const dataHariIni = data.find((item) => item.date === todayFormatted);
    const dataKemarin = data.find((item) => item.date === yesterdayFormatted);

    if (dataHariIni) {
      let silinda: number;
      let bapanas: number;

      if (selectedTypeToday === "medium") {
        silinda = dataHariIni.medium_silinda;
        bapanas = dataHariIni.medium_bapanas;
      } else {
        silinda = dataHariIni.premium_silinda;
        bapanas = dataHariIni.premium_bapanas;
      }

      if (!isNaN(silinda) && !isNaN(bapanas)) {
        setHargaHariIni((silinda + bapanas) / 2);
      } else {
        setHargaHariIni(null);
      }
    } else {
      setHargaHariIni(null);
    }

    if (dataKemarin) {
      let silinda: number;
      let bapanas: number;

      if (selectedTypeYesterday === "medium") {
        silinda = dataKemarin.medium_silinda;
        bapanas = dataKemarin.medium_bapanas;
      } else {
        silinda = dataKemarin.premium_silinda;
        bapanas = dataKemarin.premium_bapanas;
      }

      if (!isNaN(silinda) && !isNaN(bapanas)) {
        setHargaKemarin((silinda + bapanas) / 2);
      } else {
        setHargaKemarin(null);
      }
    } else {
      setHargaKemarin(null);
    }
  }, [selectedTypeToday, selectedTypeYesterday]);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        let prediction = null;

        switch (selectedTypeTomorrow) {
          case "medium_silinda":
            prediction = await predictMediumSilinda(1);
            break;
          case "medium_bapanas":
            prediction = await predictMediumBapanas(1);
            break;
          case "premium_silinda":
            prediction = await predictPremiumSilinda(1);
            break;
          case "premium_bapanas":
            prediction = await predictPremiumBapanas(1);
            break;
          default:
            prediction = null;
        }

        setHargaBesok(prediction ? prediction[0] : null);
      } catch (error) {
        console.error("Gagal memuat prediksi harga besok:", error);
        setHargaBesok(null);
      }
    };

    fetchPrediction();
  }, [selectedTypeTomorrow]);

  return (
    <div className="pl-5 h-full pb-10 w-full justify-start md:justify-start flex flex-wrap items-center pt-5">
      {/* Prediksi Besok */}
      <div className="bg-secondary w-54 h-30 rounded-xl ml-5">
        <div className="px-2 py-2 flex">
          <p className="text-black font-sans font-semibold text-sm">
            Prediksi Harga Besok
          </p>
          <Image
            src="/vector/search.png"
            alt="predict"
            width={20}
            height={20}
            className="ml-3"
          />
        </div>
        <div className="mt-6 pr-3 font-reguler flex gap-2 items-center">
          <select
            value={selectedTypeTomorrow}
            onChange={(e) => setSelectedTypeTomorrow(e.target.value)}
            className="ml-2 border border-gray-300 p-1 rounded-md text-black font-light"
          >
            <option value="medium_silinda">Medium Silinda</option>
            <option value="medium_bapanas">Medium Bapanas</option>
            <option value="premium_silinda">Premium Silinda</option>
            <option value="premium_bapanas">Premium Bapanas</option>
          </select>
          <p className="text-right font-sans text-black">
            {hargaBesok !== null
              ? `Rp${hargaBesok.toLocaleString("id-ID")}`
              : "Memuat..."}
          </p>
        </div>
      </div>

      {/* Hari Ini */}
      <div className="bg-secondary w-54 h-30 rounded-xl ml-5">
        <div className="px-2 py-2 flex">
          <p className="text-black font-sans font-semibold text-sm">
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
        <div className="mt-6 pr-3 font-reguler flex gap-5 items-center">
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
              : "Data tidak ditemukan"}
          </p>
        </div>
      </div>

      {/* Kemarin */}
      <div className="bg-secondary w-54 h-25 rounded-xl ml-10 mt-4">
        <div className="px-2 py-2 flex">
          <p className="text-black font-sans font-reguler text-sm">
            Harga Beras Kemarin
          </p>
        </div>
        <div className="mt-3 pr-3 font-reguler flex gap-5 items-center">
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
