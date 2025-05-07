import sqlite3
import json

# Menghubungkan ke database SQLite
conn = sqlite3.connect('data_harga.db')
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
        if column_names[i] in konversi_kolom and value is not None:
            # Konversi ke float jika ada nilai
            try:
                row_data[column_names[i]] = float(value)
            except ValueError:
                row_data[column_names[i]] = value
        else:
            row_data[column_names[i]] = value
    data.append(row_data)

# Menyimpan hasil ke file JSON
with open('data_harga.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

# Menutup koneksi database
conn.close()

print("Konversi berhasil! Data disimpan di data_harga.json")
