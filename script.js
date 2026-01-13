// Variabel Penetapan Jumlah Max Kuota
const MAX_QUOTA = 50;
let partisipasi = [];

// DOM Elements - Untuk Manipulasi Elemen
const form = document.getElementById('registrationForm');
const message = document.getElementById('message');
const partisipasiList = document.getElementById('partisipasiList');
const partisipasiJumlah = document.getElementById('partisipasiJumlah');

// Fungsi Validasi
function validateNama(value) {
    return value.trim().length > 0;
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validasi agar format email benar, seperti " linus@linuxfoundation.org "
    return emailRegex.test(value.trim());
}

function validateHP(value) {
    return /^\d{1,15}$/.test(value); // Validasi agar maksimum jumlah angka nomor hp antara 1 sampai 15
}

function validateKategori(value) {
    return value !== '';
}

// Tampilkan atau Sembunyikan pesan error
function showError(fieldId, show) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.style.display = show ? 'block' : 'none';
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 4000);
}

// Tampilkan Pesan
function showMessage(text, type) {
    message.textContent = text;
    message.className = 'message ' + type;
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 5000);
}

// Render Partisipasi
function renderPartisipasi() {
    partisipasiJumlah.textContent = partisipasi.length;

    if (partisipasi.length === 0) {
        partisipasiList.innerHTML = '<p style="color: #999;">Belum ada peserta yang terdaftar</p>';
        return;
    }

    partisipasiList.innerHTML = partisipasi.map((p, index) => `
        <div class="pesertaCard">
            <h3>${index + 1}. ${p.nama}</h3>
            <p>👤 ${p.kategori}</p>
        </div>
    `).join('');
}

// Untuk Menangani Submit Formulir
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Dapatkan isi form
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const hp = document.getElementById('hp').value.trim();
    const kategori = document.getElementById('kategori').value;

    // Panggil semua fungsi Validasi di atas dan Validasi semua input
    let isValid = true;

    if (!validateNama(nama)) {
        showError('nama', true);
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError('email', true);
        isValid = false;
    }

    if (!validateHP(hp)) {
        showError('hp', true);
        isValid = false;
    }

    if (!validateKategori(kategori)) {
        showError('kategori', true);
        isValid = false;
    }

    if (!isValid) {
        showMessage('Mohon lengkapi semua field dengan benar', 'error');
        return;
    }

    // Cek Jumlah Kuota
    if (partisipasi.length >= MAX_QUOTA) {
        showMessage('Pendaftaran ditutup, kuota sudah penuh', 'error');
        return;
    }

    // Tambahkan Partisipasi
    partisipasi.push({ nama, email, hp, kategori });

    // Tampilkan Pesan berhasil
    showMessage('Pendaftaran berhasil! Terima kasih telah mendaftar.', 'success');

    // Reset form
    form.reset();

    // Update Tampilan
    renderPartisipasi();

    // Scroll to Partisipasi List setelah submit (untuk layar hp karena elemen nya vertikal)
    setTimeout(() => {
        document.querySelector('.listPeserta').scrollIntoView({ behavior: 'smooth' });
    }, 500);
});

// nge-Render Tampilan
renderPartisipasi();
