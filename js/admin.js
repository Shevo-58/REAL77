// تحديث ملف admin.js لدعم لوحة التحكم الجديدة

// بيانات اعتماد المدير
const adminCredentials = {
    username: "admin",
    password: "admin123"
};

// التحقق من حالة تسجيل الدخول
function isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// تسجيل دخول المدير
function loginAdmin(username, password) {
    if (username === adminCredentials.username && password === adminCredentials.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        return true;
    }
    return false;
}

// تسجيل خروج المدير
function logoutAdmin() {
    localStorage.setItem('adminLoggedIn', 'false');
}

// التحقق من حالة تسجيل الدخول عند تحميل صفحة تسجيل الدخول
document.addEventListener('DOMContentLoaded', function() {
    // إذا كان المستخدم مسجل دخوله بالفعل، توجيهه إلى لوحة التحكم
    if (isAdminLoggedIn() && window.location.pathname.includes('admin.html')) {
        window.location.href = 'admin-dashboard.html';
        return;
    }
    
    // إضافة حدث تسجيل الدخول
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (loginAdmin(username, password)) {
                // تم تسجيل الدخول بنجاح، التوجيه إلى لوحة التحكم
                window.location.href = 'admin-dashboard.html';
            } else {
                // فشل تسجيل الدخول، إظهار رسالة الخطأ
                document.getElementById('error-message').style.display = 'block';
            }
        });
    }
});
