// http response
//200 (OK)
//400 (Bad Request)
//401 (Unauthorized)
//404 (Not Found)
//422 (Unprocessable Entity)
//500 (Internal Server Error)

module.exports = {
    MSG20001: "Data ditemukan", // Data found
    MSG20002: "Data tidak ditemukan", // Data not found
    MSG20003: "Data berhasil ditambahkan", // Data added successfully
    MSG20004: "Otentikasi berhasil", // Authentication successful
    MSG20005: "Parameter tidak valid", // Invalid parameter
    MSG20006: "Data berhasil diupdate", // Data updated successfully
    MSG20007: "Upload file berhasil", // File upload successful
    MSG20008: "Upload file gagal", // File upload failed
    MSG20009: "Data sudah ada di database", // The data is already in the database
    MSG20010: "Data berhasil dihapus", // Data deleted successfully
    MSG20011: "Request oauth2 berhasil", // The oauth2 request was successful
    MSG20012: "Request oauth2 invalid", // Invalid oauth2 request
    MSG20013: "Proses data yang sama sedang berlangsung/selesai", // The same data process is in progress/completed
    MSG20014: "Syarat proses file ini tidak terpenuhi", // The processing requirements of this file are not met
    MSG20015: "Jenis file tidak valid", // Invalid file type
    MSG20016: "File berhasil didownload", // File downloaded successfully
    MSG20017: "Data tidak dapat dihapus",
    MSG20018: "Data berhasil dikirim",
    MSG20029: "File Tidak berhasil didownload",
    MSG20020: "Data gagal dikirim",
    MSG40001: "Body konten kosong",
    MSG40002: "Parameter file upload tidak ditemukan",
    MSG40101: "Otentikasi gagal, user tidak terdaftar",
    MSG40102: "Otentikasi gagal, password salah",
    MSG40103: "Token invalid atau sudah tidak berlaku",
    MSG40301: "Permintaan hak akses tidak valid",
    MSG40302: "Permintaan hak akses kadaluwarsa",
    MSG40401: "Resource tidak ditemukan",
    MSG50001: "Controller error, silahkan hubungi administrator",
    MSG50002: "Library error, silahkan hubungi administrator"
}