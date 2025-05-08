import sqlite3
import json

# Menghubungkan ke database SQLite dengan menggunakan 'with' untuk penanganan yang lebih baik
with sqlite3.connect('data_harga.db') as conn:
    cursor = conn.cursor()

    # Menentukan query untuk memilih semua data dari tabel
    cursor.execute("SELECT * FROM gabungan_harga_beras")
    rows = cursor.fetchall()

    # Mendapatkan nama kolom untuk JSON
    column_names = [description[0] for description in cursor.description]

    # Daftar kolom yang perlu dikonversi ke integer atau float
    konversi_kolom = ["medium_silinda", "premium_silinda", "medium_bapanas", "premium_bapanas"]

    # Mengubah hasil query menjadi format dictionary
    data = []
    for row in rows:
        row_data = {}
        for i, value in enumerate(row):
            # Memeriksa apakah nilai pada kolom perlu dikonversi
            if column_names[i] in konversi_kolom and value is not None:
                try:
                    # Mengonversi nilai yang relevan menjadi float
                    row_data[column_names[i]] = float(value)
                except ValueError:
                    row_data[column_names[i]] = value
            else:
                # Jika nilai None, ubah ke nilai default (misalnya, string kosong)
                row_data[column_names[i]] = value if value is not None else ""

        data.append(row_data)

# Menyimpan hasil ke file JSON menggunakan 'with' untuk memastikan file ditutup setelah proses selesai
with open('data_harga.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("Konversi berhasil! Data disimpan di data_harga.json")
