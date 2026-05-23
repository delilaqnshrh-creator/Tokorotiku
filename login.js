// ======== DOM ELEMENTS ========
const loginForm = document.getElementById('loginForm');
const namaInput = document.getElementById('nama');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const btnLogin = document.getElementById('btnLogin');
const namaError = document.getElementById('namaError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const toastContainer = document.getElementById('toastContainer');

// ======== TOAST NOTIFICATION ========
function showToast(type, message) {
    const toast = document.createElement('div');
    toast.className = `toast-item ${type}`;
    
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'info') icon = 'fa-info-circle';
    
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ======== TOGGLE PASSWORD ========
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// ======== CLEAR ERROR ON INPUT ========
[namaInput, emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('error');
        const errorEl = document.getElementById(this.id + 'Error');
        if(errorEl) {
            errorEl.classList.remove('show');
            errorEl.querySelector('span').textContent = '';
        }
    });
});

// ======== FORM VALIDATION ========
function validateForm() {
    let isValid = true;
    const nama = namaInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Nama validation
    if (!nama) {
        namaInput.classList.add('error');
        namaError.querySelector('span').textContent = 'Nama tidak boleh kosong';
        namaError.classList.add('show');
        isValid = false;
    }

    // Email validation
    if (!email) {
        emailInput.classList.add('error');
        emailError.querySelector('span').textContent = 'Email tidak boleh kosong';
        emailError.classList.add('show');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.classList.add('error');
        emailError.querySelector('span').textContent = 'Format email tidak valid';
        emailError.classList.add('show');
        isValid = false;
    }

    // Password validation
    if (!password) {
        passwordInput.classList.add('error');
        passwordError.querySelector('span').textContent = 'Password tidak boleh kosong';
        passwordError.classList.add('show');
        isValid = false;
    } else if (password.length < 6) {
        passwordInput.classList.add('error');
        passwordError.querySelector('span').textContent = 'Password minimal 6 karakter';
        passwordError.classList.add('show');
        isValid = false;
    }

    return isValid;
}

// ======== FORM SUBMIT ========
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm()) {
        showToast('error', 'Harap periksa kembali data yang dimasukkan');
        return;
    }

    // Show loading state
    btnLogin.classList.add('loading');
    btnLogin.disabled = true;

    // Simulate API Call / Server Delay (1.5 detik)
    setTimeout(() => {
        const nama = namaInput.value.trim();
        const email = emailInput.value.trim();
        
        // Buat object data user
        const userData = {
            name: nama,
            email: email,
            isLoggedIn: true,
            loginTime: new Date().toISOString()
        };

        // Simpan ke localStorage
        localStorage.setItem('tokorotiku_user', JSON.stringify(userData));

        // Tampilkan toast sukses
        showToast('success', `Selamat datang, ${nama}! Mengalihkan...`);

        // Redirect ke halaman utama setelah jeda 1.5 detik
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    }, 1500);
});

// ======== CHECK IF ALREADY LOGGED IN ========
window.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('tokorotiku_user'));
    if (user && user.isLoggedIn) {
        // Jika sudah login, langsung lempar ke index.html
        window.location.href = 'index.html';
    }
});
