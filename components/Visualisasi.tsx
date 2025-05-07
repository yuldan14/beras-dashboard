'use client';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '../app/data_harga.json';

const Visualisasi = () => {
  const [selectedType, setSelectedType] = useState('medium_silinda'); // Menyimpan kolom harga yang dipilih
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter data berdasarkan tipe dan 1 tahun terakhir
    const now = new Date();
    const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));
    const filtered = data
      .filter((item) => new Date(item.date) >= lastYear) // Menggunakan 'date' sebagai acuan filter
      .map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString('id-ID') // Mengubah format tanggal
      }));

    setFilteredData(filtered);
  }, []);

  return (
    <div className='w-full h-screen p-5 text-black'>
      <div className='text-black font-sans font-semibold mb-5'>
        1 Tahun Terakhir
      </div>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)} // Menyesuaikan pilihan harga
        className='mb-5 border border-gray-300 p-2 rounded-md'
      >
        <option value="medium_silinda">Medium Silinda</option>
        <option value="premium_silinda">Premium Silinda</option>
        <option value="medium_bapanas">Medium Bapanas</option>
        <option value="premium_bapanas">Premium Bapanas</option>
      </select>

      <ResponsiveContainer width='100%' height='80%'>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Menyesuaikan dataKey pada Line sesuai dengan pilihan */}
          <Line type="monotone" dataKey={selectedType} stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Visualisasi;
