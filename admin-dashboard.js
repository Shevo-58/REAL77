/**
 * ملف JavaScript الخاص بلوحة تحكم المدير
 * يحتوي على جميع الوظائف اللازمة لتشغيل لوحة التحكم
 */

// متغيرات عامة
let currentLang = localStorage.getItem('language') || 'ar';
let currentPropertyId = null;
let properties = JSON.parse(localStorage.getItem('properties')) || propertiesData;
let interestedClients = JSON.parse(localStorage.getItem('interestedClients')) || [];
let contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
let siteSettings = JSON.parse(localStorage.getItem('siteSettings')) || {
    adminUsername: 'admin',
    adminPassword: 'admin123',
    siteTitleAr: 'موقع العقارات',
    siteTitleEn: 'Real Estate Website',
    siteDescriptionAr: 'نقدم مجموعة متنوعة من العقارات المميزة بمواصفات عالية وأسعار مناسبة',
    siteDescriptionEn: 'We offer a variety of premium properties with high specifications and reasonable prices'
};

// التحقق من حالة تسجيل الدخول
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من تسجيل دخول المدير
    if (!isAdminLoggedIn()) {
        window.location.href = 'admin.html';
        return;
    }
    
    // تحديث اللغة
    updateLanguage();
    
    // تهيئة الأحداث
    initEvents();
    
    // تحميل البيانات
    loadDashboardData();
    loadProperties();
    loadInterestedClients();
    loadContactMessages();
    loadSettings();
    
    // تهيئة DataTables
    initDataTables();
});

// تحديث اللغة
function updateLanguage() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث عناصر القائمة الجانبية
    document.getElementById('sidebar-title').textContent = currentLang === 'ar' ? 'لوحة تحكم المدير' : 'Admin Dashboard';
    document.getElementById('menu-dashboard').textContent = currentLang === 'ar' ? 'لوحة المعلومات' : 'Dashboard';
    document.getElementById('menu-properties').textContent = currentLang === 'ar' ? 'العقارات' : 'Properties';
    document.getElementById('menu-interested').textContent = currentLang === 'ar' ? 'العملاء المهتمين' : 'Interested Clients';
    document.getElementById('menu-messages').textContent = currentLang === 'ar' ? 'رسائل التواصل' : 'Contact Messages';
    document.getElementById('menu-settings').textContent = currentLang === 'ar' ? 'الإعدادات' : 'Settings';
    document.getElementById('menu-website').textContent = currentLang === 'ar' ? 'زيارة الموقع' : 'Visit Website';
    document.getElementById('menu-logout').textContent = currentLang === 'ar' ? 'تسجيل الخروج' : 'Logout';
    
    // تحديث عناصر لوحة المعلومات
    document.getElementById('page-title').textContent = currentLang === 'ar' ? 'لوحة المعلومات' : 'Dashboard';
    document.getElementById('current-language').textContent = currentLang === 'ar' ? 'العربية' : 'English';
    document.getElementById('stats-properties').textContent = currentLang === 'ar' ? 'العقارات' : 'Properties';
    document.getElementById('stats-interested').textContent = currentLang === 'ar' ? 'العملاء المهتمين' : 'Interested Clients';
    document.getElementById('stats-messages').textContent = currentLang === 'ar' ? 'الرسائل' : 'Messages';
    document.getElementById('stats-views').textContent = currentLang === 'ar' ? 'المشاهدات' : 'Views';
    
    // تحديث عناوين الجداول في لوحة المعلومات
    document.getElementById('recent-interested-title').textContent = currentLang === 'ar' ? 'آخر العملاء المهتمين' : 'Recent Interested Clients';
    document.getElementById('recent-messages-title').textContent = currentLang === 'ar' ? 'آخر الرسائل' : 'Recent Messages';
    document.getElementById('table-name').textContent = currentLang === 'ar' ? 'الاسم' : 'Name';
    document.getElementById('table-property').textContent = currentLang === 'ar' ? 'العقار' : 'Property';
    document.getElementById('table-date').textContent = currentLang === 'ar' ? 'التاريخ' : 'Date';
    document.getElementById('table-name-msg').textContent = currentLang === 'ar' ? 'الاسم' : 'Name';
    document.getElementById('table-subject').textContent = currentLang === 'ar' ? 'الموضوع' : 'Subject';
    document.getElementById('table-date-msg').textContent = currentLang === 'ar' ? 'التاريخ' : 'Date';
    
    // تحديث عناصر قسم العقارات
    document.getElementById('properties-title').textContent = currentLang === 'ar' ? 'إدارة العقارات' : 'Manage Properties';
    document.getElementById('add-property-text').textContent = currentLang === 'ar' ? 'إضافة عقار' : 'Add Property';
    
    // تحديث عناصر نموذج العقار
    document.getElementById('propertyModalLabel').textContent = currentLang === 'ar' ? 'إضافة عقار جديد' : 'Add New Property';
    document.getElementById('label-title-ar').textContent = currentLang === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)';
    document.getElementById('label-title-en').textContent = currentLang === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)';
    document.getElementById('label-type').textContent = currentLang === 'ar' ? 'نوع العقار' : 'Property Type';
    document.getElementById('type-apartment').textContent = currentLang === 'ar' ? 'شقة' : 'Apartment';
    document.getElementById('type-villa').textContent = currentLang === 'ar' ? 'فيلا' : 'Villa';
    document.getElementById('type-office').textContent = currentLang === 'ar' ? 'مكتب' : 'Office';
    document.getElementById('type-land').textContent = currentLang === 'ar' ? 'أرض' : 'Land';
    document.getElementById('label-price').textContent = currentLang === 'ar' ? 'السعر' : 'Price';
    document.getElementById('label-area').textContent = currentLang === 'ar' ? 'المساحة (متر مربع)' : 'Area (sqm)';
    document.getElementById('label-rooms').textContent = currentLang === 'ar' ? 'عدد الغرف' : 'Rooms';
    document.getElementById('label-location-ar').textContent = currentLang === 'ar' ? 'الموقع (عربي)' : 'Location (Arabic)';
    document.getElementById('label-location-en').textContent = currentLang === 'ar' ? 'الموقع (إنجليزي)' : 'Location (English)';
    document.getElementById('label-description-ar').textContent = currentLang === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)';
    document.getElementById('label-description-en').textContent = currentLang === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)';
    document.getElementById('label-image').textContent = currentLang === 'ar' ? 'صورة العقار' : 'Property Image';
    document.getElementById('cancel-property-btn').textContent = currentLang === 'ar' ? 'إلغاء' : 'Cancel';
    document.getElementById('save-property-btn').textContent = currentLang === 'ar' ? 'حفظ' : 'Save';
    
    // تحديث عناصر نافذة تأكيد الحذف
    document.getElementById('deletePropertyModalLabel').textContent = currentLang === 'ar' ? 'تأكيد الحذف' : 'Confirm Delete';
    document.getElementById('delete-property-message').textContent = currentLang === 'ar' ? 'هل أنت متأكد من رغبتك في حذف هذا العقار؟ لا يمكن التراجع عن هذا الإجراء.' : 'Are you sure you want to delete this property? This action cannot be undone.';
    document.getElementById('cancel-delete-btn').textContent = currentLang === 'ar' ? 'إلغاء' : 'Cancel';
    document.getElementById('confirm-delete-btn').textContent = currentLang === 'ar' ? 'حذف' : 'Delete';
    
    // تحديث عناصر قسم العملاء المهتمين
    document.getElementById('interested-clients-title').textContent = currentLang === 'ar' ? 'العملاء المهتمين' : 'Interested Clients';
    document.getElementById('export-excel-text').textContent = currentLang === 'ar' ? 'تصدير Excel' : 'Export Excel';
    document.getElementById('export-pdf-text').textContent = currentLang === 'ar' ? 'تصدير PDF' : 'Export PDF';
    document.getElementById('table-id').textContent = currentLang === 'ar' ? 'الرقم' : 'ID';
    document.getElementById('table-name-int').textContent = currentLang === 'ar' ? 'الاسم' : 'Name';
    document.getElementById('table-phone').textContent = currentLang === 'ar' ? 'رقم الهاتف' : 'Phone';
    document.getElementById('table-email').textContent = currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email';
    document.getElementById('table-property-int').textContent = currentLang === 'ar' ? 'العقار' : 'Property';
    document.getElementById('table-date-int').textContent = currentLang === 'ar' ? 'التاريخ' : 'Date';
    document.getElementById('table-actions').textContent = currentLang === 'ar' ? 'الإجراءات' : 'Actions';
    
    // تحديث عناصر نافذة تفاصيل العميل
    document.getElementById('clientDetailsModalLabel').textContent = currentLang === 'ar' ? 'تفاصيل العميل' : 'Client Details';
    document.getElementById('label-name-details').textContent = currentLang === 'ar' ? 'الاسم:' : 'Name:';
    document.getElementById('label-phone-details').textContent = currentLang === 'ar' ? 'رقم الهاتف:' : 'Phone:';
    document.getElementById('label-email-details').textContent = currentLang === 'ar' ? 'البريد الإلكتروني:' : 'Email:';
    document.getElementById('label-property-details').textContent = currentLang === 'ar' ? 'العقار:' : 'Property:';
    document.getElementById('label-date-details').textContent = currentLang === 'ar' ? 'تاريخ الاهتمام:' : 'Interest Date:';
    document.getElementById('close-details-btn').textContent = currentLang === 'ar' ? 'إغلاق' : 'Close';
    
    // تحديث عناصر قسم رسائل التواصل
    document.getElementById('contact-messages-title').textContent = currentLang === 'ar' ? 'رسائل التواصل' : 'Contact Messages';
    document.getElementById('export-excel-msg-text').textContent = currentLang === 'ar' ? 'تصدير Excel' : 'Export Excel';
    document.getElementById('export-pdf-msg-text').textContent = currentLang === 'ar' ? 'تصدير PDF' : 'Export PDF';
    document.getElementById('table-id-msg').textContent = currentLang === 'ar' ? 'الرقم' : 'ID';
    document.getElementById('table-name-msg-full').textContent = currentLang === 'ar' ? 'الاسم' : 'Name';
    document.getElementById('table-phone-msg').textContent = currentLang === 'ar' ? 'رقم الهاتف' : 'Phone';
    document.getElementById('table-email-msg').textContent = currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email';
    document.getElementById('table-message').textContent = currentLang === 'ar' ? 'الرسالة' : 'Message';
    document.getElementById('table-date-msg-full').textContent = currentLang === 'ar' ? 'التاريخ' : 'Date';
    document.getElementById('table-actions-msg').textContent = currentLang === 'ar' ? 'الإجراءات' : 'Actions';
    
    // تحديث عناصر نافذة تفاصيل الرسالة
    document.getElementById('messageDetailsModalLabel').textContent = currentLang === 'ar' ? 'تفاصيل الرسالة' : 'Message Details';
    document.getElementById('label-name-msg-details').textContent = currentLang === 'ar' ? 'الاسم:' : 'Name:';
    document.getElementById('label-phone-msg-details').textContent = currentLang === 'ar' ? 'رقم الهاتف:' : 'Phone:';
    document.getElementById('label-email-msg-details').textContent = currentLang === 'ar' ? 'البريد الإلكتروني:' : 'Email:';
    document.getElementById('label-message-details').textContent = currentLang === 'ar' ? 'الرسالة:' : 'Message:';
    document.getElementById('label-date-msg-details').textContent = currentLang === 'ar' ? 'تاريخ الإرسال:' : 'Sent Date:';
    document.getElementById('close-message-btn').textContent = currentLang === 'ar' ? 'إغلاق' : 'Close';
    
    // تحديث عناصر قسم الإعدادات
    document.getElementById('settings-title').textContent = currentLang === 'ar' ? 'إعدادات الموقع' : 'Website Settings';
    document.getElementById('label-username').textContent = currentLang === 'ar' ? 'اسم المستخدم' : 'Username';
    document.getElementById('label-password').textContent = currentLang === 'ar' ? 'كلمة المرور' : 'Password';
    document.getElementById('label-site-title-ar').textContent = currentLang === 'ar' ? 'عنوان الموقع (عربي)' : 'Website Title (Arabic)';
    document.getElementById('label-site-title-en').textContent = currentLang === 'ar' ? 'عنوان الموقع (إنجليزي)' : 'Website Title (English)';
    document.getElementById('label-site-description-ar').textContent = currentLang === 'ar' ? 'وصف الموقع (عربي)' : 'Website Description (Arabic)';
    document.getElementById('label-site-description-en').textContent = currentLang === 'ar' ? 'وصف الموقع (إنجليزي)' : 'Website Description (English)';
    document.getElementById('save-settings-btn').textContent = currentLang === 'ar' ? 'حفظ الإعدادات' : 'Save Settings';
}

// تهيئة الأحداث
function initEvents() {
    // تبديل اللغة
    document.getElementById('ar-lang').addEventListener('click', function() {
        currentLang = 'ar';
        localStorage.setItem('language', 'ar');
        updateLanguage();
    });
    
    document.getElementById('en-lang').addEventListener('click', function() {
        currentLang = 'en';
        localStorage.setItem('language', 'en');
        updateLanguage();
    });
    
    // تبديل القائمة الجانبية
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
        document.querySelector('.main-content').classList.toggle('active');
    });
    
    // تنقل بين أقسام لوحة التحكم
    document.querySelectorAll('.sidebar-menu li[data-section]').forEach(function(item) {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // إزالة الفئة النشطة من جميع عناصر القائمة
            document.querySelectorAll('.sidebar-menu li').forEach(function(menuItem) {
                menuItem.classList.remove('active');
            });
            
            // إضافة الفئة النشطة للعنصر المحدد
            this.classList.add('active');
            
            // إخفاء جميع الأقسام
            document.querySelectorAll('.content-section').forEach(function(section) {
                section.classList.remove('active');
            });
            
            // إظهار القسم المحدد
            document.getElementById(`${sectionId}-section`).classList.add('active');
            
            // تحديث عنوان الصفحة
            const titles = {
                'dashboard': currentLang === 'ar' ? 'لوحة المعلومات' : 'Dashboard',
                'properties': currentLang === 'ar' ? 'العقارات' : 'Properties',
                'interested-clients': currentLang === 'ar' ? 'العملاء المهتمين' : 'Interested Clients',
                'contact-messages': currentLang === 'ar' ? 'رسائل التواصل' : 'Contact Messages',
                'settings': currentLang === 'ar' ? 'الإعدادات' : 'Settings'
            };
            
            document.getElementById('page-title').textContent = titles[sectionId];
        });
    });
    
    // تسجيل الخروج
    document.getElementById('logout-btn').addEventListener('click', function() {
        logoutAdmin();
        window.location.href = 'admin.html';
    });
    
    // إضافة عقار جديد
    document.getElementById('add-property-btn').addEventListener('click', function() {
        // إعادة تعيين النموذج
        document.getElementById('property-form').reset();
        document.getElementById('property-id').value = '';
        document.getElementById('property-image-preview').classList.add('d-none');
        currentPropertyId = null;
        
        // تحديث عنوان النافذة
        document.getElementById('propertyModalLabel').textContent = currentLang === 'ar' ? 'إضافة عقار جديد' : 'Add New Property';
        
        // إظهار النافذة
        const propertyModal = new bootstrap.Modal(document.getElementById('propertyModal'));
        propertyModal.show();
    });
    
    // حفظ العقار
    document.getElementById('save-property-btn').addEventListener('click', function() {
        saveProperty();
    });
    
    // معاينة صورة العقار
    document.getElementById('property-image').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const preview = document.getElementById('property-image-preview');
                preview.src = event.target.result;
                pr
(Content truncated due to size limit. Use line ranges to read in chunks)