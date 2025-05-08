import sqlite3
import json
import os

# Path ke database dan lokasi penyimpanan JSON
DB_PATH = './app/data_harga.db'
JSON_PATH = './app/data_harga.json'

# Memastikan direktori './app' ada
os.makedirs('./app', exist_ok=True)

try:
    # Menghubungkan ke database SQLite dengan menggunakan 'with' untuk penanganan yang lebih baik
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()

        # Mengecek apakah tabel `gabungan_harga_beras` ada
        cursor.execute("""
        SELECT name 
        FROM sqlite_master 
        WHERE type='table' AND name='gabungan_harga_beras';
        """)
        table_exists = cursor.fetchone()

        if not table_exists:
            raise ValueError("Tabel 'gabungan_harga_beras' tidak ditemukan di database.")

        # Menentukan query untuk memilih semua data dari tabel
        cursor.execute("SELECT * FROM gabungan_harga_beras")
        rows = cursor.fetchall()

        # Mendapatkan nama kolom untuk JSON
        column_names = [description[0] for description in cursor.description]

        # Daftar kolom yang perlu dikonversi ke float
        konversi_kolom = ["medium_silinda", "premium_silinda", "medium_bapanas", "premium_bapanas"]

        # Mengubah hasil query menjadi format dictionary
        data = []
        for row in rows:
            row_data = {
                column_names[i]: (float(value) if column_names[i] in konversi_kolom and value is not None else value or "")
                for i, value in enumerate(row)
            }
            data.append(row_data)

    # Menyimpan hasil ke file JSON menggunakan 'with' untuk memastikan file ditutup setelah proses selesai
    with open(JSON_PATH, 'w') as json_file:
        json.dump(data, json_file, indent=4)

    print(f"Konversi berhasil! Data disimpan di {JSON_PATH}")

except sqlite3.Error as e:
    print(f"Terjadi kesalahan pada database: {e}")
except Exception as e:
    print(f"Terjadi kesalahan: {e}")
