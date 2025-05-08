'use client'
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '../app/data_harga.json';

type DataType = {
  date: string;
  id: number;
  medium_silinda: number;
  premium_silinda: number;
  medium_bapanas: number;
  premium_bapanas: number;
};

const Visualisasi = () => {
  const [selectedType, setSelectedType] = useState('medium_silinda');
  const [filteredData, setFilteredData] = useState<DataType[]>([]);

  useEffect(() => {
    const now = new Date();
    const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));
    const filtered = data
      .filter((item: DataType) => new Date(item.date) >= lastYear)
      .map((item: DataType) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString('id-ID')
      }));

    setFilteredData(filtered);
  }, []);

  return (
    <div className='w-full h-screen p-5 text-black pl-15 md:pl-10'>
      <div className='text-black font-sans font-semibold mb-5'>
        1 Tahun Terakhir
      </div>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className='mb-5 border border-gray-300 p-2 rounded-md'
      >
        <option value="medium_silinda">Medium Silinda</option>
        <option value="premium_silinda">Premium Silinda</option>
        <option value="medium_bapanas">Medium Bapanas</option>
        <option value="premium_bapanas">Premium Bapanas</option>
      </select>

      {/* Membungkus ResponsiveContainer dengan div */}
      <div className="w-full h-[20%] md:h-[80%] p-4 ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={selectedType} stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Visualisasi;
