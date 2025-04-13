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
                preview.classList.remove('d-none');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // تصدير بيانات العملاء المهتمين
    document.getElementById('export-excel-interested').addEventListener('click', function() {
        exportToExcel(interestedClients, 'interested_clients');
    });
    
    document.getElementById('export-pdf-interested').addEventListener('click', function() {
        exportToPDF(interestedClients, 'interested_clients', [
            { header: currentLang === 'ar' ? 'الاسم' : 'Name', dataKey: 'name' },
            { header: currentLang === 'ar' ? 'رقم الهاتف' : 'Phone', dataKey: 'phone' },
            { header: currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email', dataKey: 'email' },
            { header: currentLang === 'ar' ? 'العقار' : 'Property', dataKey: 'property' },
            { header: currentLang === 'ar' ? 'التاريخ' : 'Date', dataKey: 'date' }
        ]);
    });
    
    // تصدير رسائل التواصل
    document.getElementById('export-excel-messages').addEventListener('click', function() {
        exportToExcel(contactMessages, 'contact_messages');
    });
    
    document.getElementById('export-pdf-messages').addEventListener('click', function() {
        exportToPDF(contactMessages, 'contact_messages', [
            { header: currentLang === 'ar' ? 'الاسم' : 'Name', dataKey: 'name' },
            { header: currentLang === 'ar' ? 'رقم الهاتف' : 'Phone', dataKey: 'phone' },
            { header: currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email', dataKey: 'email' },
            { header: currentLang === 'ar' ? 'الرسالة' : 'Message', dataKey: 'message' },
            { header: currentLang === 'ar' ? 'التاريخ' : 'Date', dataKey: 'date' }
        ]);
    });
    
    // حفظ الإعدادات
    document.getElementById('settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveSettings();
    });
}

// تحميل بيانات لوحة المعلومات
function loadDashboardData() {
    // تحديث الإحصائيات
    document.getElementById('property-count').textContent = properties.length;
    document.getElementById('interested-count').textContent = interestedClients.length;
    document.getElementById('message-count').textContent = contactMessages.length;
    document.getElementById('view-count').textContent = localStorage.getItem('viewCount') || '0';
    
    // تحميل آخر العملاء المهتمين
    const recentInterestedBody = document.getElementById('recent-interested-body');
    recentInterestedBody.innerHTML = '';
    
    const recentInterested = [...interestedClients].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    
    recentInterested.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.name}</td>
            <td>${getPropertyTitle(client.propertyId)}</td>
            <td>${formatDate(client.date)}</td>
        `;
        recentInterestedBody.appendChild(row);
    });
    
    // تحميل آخر الرسائل
    const recentMessagesBody = document.getElementById('recent-messages-body');
    recentMessagesBody.innerHTML = '';
    
    const recentMessages = [...contactMessages].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    
    recentMessages.forEach(message => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${message.name}</td>
            <td>${truncateText(message.message, 30)}</td>
            <td>${formatDate(message.date)}</td>
        `;
        recentMessagesBody.appendChild(row);
    });
}

// تحميل العقارات
function loadProperties() {
    const propertiesContainer = document.getElementById('properties-container');
    propertiesContainer.innerHTML = '';
    
    properties.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.className = 'col-md-4 mb-4';
        propertyCard.innerHTML = `
            <div class="property-card">
                <img src="${property.image}" alt="${property.title[currentLang]}">
                <div class="property-card-body">
                    <h5 class="property-card-title">${property.title[currentLang]}</h5>
                    <div class="property-card-info">
                        <span><i class="fas fa-map-marker-alt"></i> ${property.location[currentLang]}</span>
                        <span><i class="fas fa-money-bill-wave"></i> ${formatPrice(property.price)}</span>
                    </div>
                    <div class="property-card-info">
                        <span><i class="fas fa-ruler-combined"></i> ${property.area} ${currentLang === 'ar' ? 'م²' : 'm²'}</span>
                        <span><i class="fas fa-bed"></i> ${property.rooms} ${currentLang === 'ar' ? 'غرف' : 'rooms'}</span>
                    </div>
                    <div class="property-card-actions">
                        <button class="btn btn-sm btn-primary edit-property-btn" data-id="${property.id}">
                            <i class="fas fa-edit"></i> ${currentLang === 'ar' ? 'تعديل' : 'Edit'}
                        </button>
                        <button class="btn btn-sm btn-danger delete-property-btn" data-id="${property.id}">
                            <i class="fas fa-trash"></i> ${currentLang === 'ar' ? 'حذف' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        propertiesContainer.appendChild(propertyCard);
        
        // إضافة حدث النقر على زر التعديل
        propertyCard.querySelector('.edit-property-btn').addEventListener('click', function() {
            editProperty(property.id);
        });
        
        // إضافة حدث النقر على زر الحذف
        propertyCard.querySelector('.delete-property-btn').addEventListener('click', function() {
            deleteProperty(property.id);
        });
    });
}

// تحميل العملاء المهتمين
function loadInterestedClients() {
    const interestedClientsBody = document.getElementById('interested-clients-body');
    interestedClientsBody.innerHTML = '';
    
    interestedClients.forEach((client, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${client.name}</td>
            <td>${client.phone}</td>
            <td>${client.email}</td>
            <td>${getPropertyTitle(client.propertyId)}</td>
            <td>${formatDate(client.date)}</td>
            <td>
                <button class="btn btn-sm btn-info view-client-btn" data-id="${index}">
                    <i class="fas fa-eye"></i> ${currentLang === 'ar' ? 'عرض' : 'View'}
                </button>
                <button class="btn btn-sm btn-danger delete-client-btn" data-id="${index}">
                    <i class="fas fa-trash"></i> ${currentLang === 'ar' ? 'حذف' : 'Delete'}
                </button>
            </td>
        `;
        interestedClientsBody.appendChild(row);
        
        // إضافة حدث النقر على زر العرض
        row.querySelector('.view-client-btn').addEventListener('click', function() {
            viewClientDetails(index);
        });
        
        // إضافة حدث النقر على زر الحذف
        row.querySelector('.delete-client-btn').addEventListener('click', function() {
            deleteClient(index);
        });
    });
}

// تحميل رسائل التواصل
function loadContactMessages() {
    const contactMessagesBody = document.getElementById('contact-messages-body');
    contactMessagesBody.innerHTML = '';
    
    contactMessages.forEach((message, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${message.name}</td>
            <td>${message.phone}</td>
            <td>${message.email}</td>
            <td>${truncateText(message.message, 30)}</td>
            <td>${formatDate(message.date)}</td>
            <td>
                <button class="btn btn-sm btn-info view-message-btn" data-id="${index}">
                    <i class="fas fa-eye"></i> ${currentLang === 'ar' ? 'عرض' : 'View'}
                </button>
                <button class="btn btn-sm btn-danger delete-message-btn" data-id="${index}">
                    <i class="fas fa-trash"></i> ${currentLang === 'ar' ? 'حذف' : 'Delete'}
                </button>
            </td>
        `;
        contactMessagesBody.appendChild(row);
        
        // إضافة حدث النقر على زر العرض
        row.querySelector('.view-message-btn').addEventListener('click', function() {
            viewMessageDetails(index);
        });
        
        // إضافة حدث النقر على زر الحذف
        row.querySelector('.delete-message-btn').addEventListener('click', function() {
            deleteMessage(index);
        });
    });
}

// تحميل الإعدادات
function loadSettings() {
    document.getElementById('admin-username').value = siteSettings.adminUsername;
    document.getElementById('admin-password').value = siteSettings.adminPassword;
    document.getElementById('site-title-ar').value = siteSettings.siteTitleAr;
    document.getElementById('site-title-en').value = siteSettings.siteTitleEn;
    document.getElementById('site-description-ar').value = siteSettings.siteDescriptionAr;
    document.getElementById('site-description-en').value = siteSettings.siteDescriptionEn;
}

// تهيئة جداول البيانات
function initDataTables() {
    // جدول العملاء المهتمين
    $('#interested-clients-table').DataTable({
        responsive: true,
        language: {
            url: currentLang === 'ar' ? '//cdn.datatables.net/plug-ins/1.13.4/i18n/ar.json' : '//cdn.datatables.net/plug-ins/1.13.4/i18n/en-GB.json'
        }
    });
    
    // جدول رسائل التواصل
    $('#contact-messages-table').DataTable({
        responsive: true,
        language: {
            url: currentLang === 'ar' ? '//cdn.datatables.net/plug-ins/1.13.4/i18n/ar.json' : '//cdn.datatables.net/plug-ins/1.13.4/i18n/en-GB.json'
        }
    });
}

// تعديل عقار
function editProperty(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    currentPropertyId = propertyId;
    
    // ملء النموذج بالبيانات
    document.getElementById('property-id').value = property.id;
    document.getElementById('property-title-ar').value = property.title.ar;
    document.getElementById('property-title-en').value = property.title.en;
    document.getElementById('property-type').value = property.type;
    document.getElementById('property-price').value = property.price;
    document.getElementById('property-area').value = property.area;
    document.getElementById('property-rooms').value = property.rooms;
    document.getElementById('property-location-ar').value = property.location.ar;
    document.getElementById('property-location-en').value = property.location.en;
    document.getElementById('property-description-ar').value = property.description.ar;
    document.getElementById('property-description-en').value = property.description.en;
    
    // عرض معاينة الصورة
    const preview = document.getElementById('property-image-preview');
    preview.src = property.image;
    preview.classList.remove('d-none');
    
    // تحديث عنوان النافذة
    document.getElementById('propertyModalLabel').textContent = currentLang === 'ar' ? 'تعديل العقار' : 'Edit Property';
    
    // إظهار النافذة
    const propertyModal = new bootstrap.Modal(document.getElementById('propertyModal'));
    propertyModal.show();
}

// حفظ العقار
function saveProperty() {
    // التحقق من صحة النموذج
    const form = document.getElementById('property-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // جمع البيانات من النموذج
    const propertyId = document.getElementById('property-id').value || generateId();
    const titleAr = document.getElementById('property-title-ar').value;
    const titleEn = document.getElementById('property-title-en').value;
    const type = document.getElementById('property-type').value;
    const price = parseFloat(document.getElementById('property-price').value);
    const area = parseFloat(document.getElementById('property-area').value);
    const rooms = parseInt(document.getElementById('property-rooms').value);
    const locationAr = document.getElementById('property-location-ar').value;
    const locationEn = document.getElementById('property-location-en').value;
    const descriptionAr = document.getElementById('property-description-ar').value;
    const descriptionEn = document.getElementById('property-description-en').value;
    
    // الحصول على الصورة
    const imageInput = document.getElementById('property-image');
    let imageUrl = '';
    
    if (imageInput.files.length > 0) {
        // إذا تم تحديد صورة جديدة، استخدم معاينة الصورة
        imageUrl = document.getElementById('property-image-preview').src;
    } else if (currentPropertyId) {
        // إذا كان تعديل عقار موجود ولم يتم تحديد صورة جديدة، استخدم الصورة الحالية
        const existingProperty = properties.find(p => p.id === currentPropertyId);
        if (existingProperty) {
            imageUrl = existingProperty.image;
        } else {
            // إذا لم يتم العثور على العقار، استخدم صورة افتراضية
            imageUrl = `images/${type}1.jpg`;
        }
    } else {
        // إذا كان عقار جديد ولم يتم تحديد صورة، استخدم صورة افتراضية
        imageUrl = `images/${type}1.jpg`;
    }
    
    // إنشاء كائن العقار
    const property = {
        id: propertyId,
        title: {
            ar: titleAr,
            en: titleEn
        },
        type: type,
        price: price,
        area: area,
        rooms: rooms,
        location: {
            ar: locationAr,
            en: locationEn
        },
        description: {
            ar: descriptionAr,
            en: descriptionEn
        },
        image: imageUrl
    };
    
    // تحديث أو إضافة العقار
    if (currentPropertyId) {
        // تحديث عقار موجود
        const index = properties.findIndex(p => p.id === currentPropertyId);
        if (index !== -1) {
            properties[index] = property;
        }
    } else {
        // إضافة عقار جديد
        properties.push(property);
    }
    
    // حفظ البيانات في localStorage
    localStorage.setItem('properties', JSON.stringify(properties));
    
    // إعادة تحميل العقارات
    loadProperties();
    
    // إعادة تحميل بيانات لوحة المعلومات
    loadDashboardData();
    
    // إغلاق النافذة
    const propertyModal = bootstrap.Modal.getInstance(document.getElementById('propertyModal'));
    propertyModal.hide();
    
    // إعادة تعيين المتغيرات
    currentPropertyId = null;
}

// حذف عقار
function deleteProperty(propertyId) {
    currentPropertyId = propertyId;
    
    // إظهار نافذة تأكيد الحذف
    const deleteModal = new bootstrap.Modal(document.getElementById('deletePropertyModal'));
    deleteModal.show();
    
    // إضافة حدث النقر على زر التأكيد
    document.getElementById('confirm-delete-btn').onclick = function() {
        // حذف العقار
        properties = properties.filter(p => p.id !== currentPropertyId);
        
        // حفظ البيانات في localStorage
        localStorage.setItem('properties', JSON.stringify(properties));
        
        // إعادة تحميل العقارات
        loadProperties();
        
        // إعادة تحميل بيانات لوحة المعلومات
        loadDashboardData();
        
        // إغلاق النافذة
        deleteModal.hide();
        
        // إعادة تعيين المتغيرات
        currentPropertyId = null;
    };
}

// عرض تفاصيل العميل
function viewClientDetails(index) {
    const client = interestedClients[index];
    if (!client) return;
    
    // ملء البيانات في النافذة
    document.getElementById('client-name-details').textContent = client.name;
    document.getElementById('client-phone-details').textContent = client.phone;
    document.getElementById('client-email-details').textContent = client.email;
    document.getElementById('client-property-details').textContent = getPropertyTitle(client.propertyId);
    document.getElementById('client-date-details').textContent = formatDate(client.date);
    
    // إظهار النافذة
    const clientModal = new bootstrap.Modal(document.getElementById('clientDetailsModal'));
    clientModal.show();
}

// حذف عميل
function deleteClient(index) {
    if (confirm(currentLang === 'ar' ? 'هل أنت متأكد من رغبتك في حذف هذا العميل؟' : 'Are you sure you want to delete this client?')) {
        // حذف العميل
        interestedClients.splice(index, 1);
        
        // حفظ البيانات في localStorage
        localStorage.setItem('interestedClients', JSON.stringify(interestedClients));
        
        // إعادة تحميل العملاء
        loadInterestedClients();
        
        // إعادة تحميل بيانات لوحة المعلومات
        loadDashboardData();
        
        // إعادة تهيئة جدول البيانات
        $('#interested-clients-table').DataTable().destroy();
        initDataTables();
    }
}

// عرض تفاصيل الرسالة
function viewMessageDetails(index) {
    const message = contactMessages[index];
    if (!message) return;
    
    // ملء البيانات في النافذة
    document.getElementById('message-name-details').textContent = message.name;
    document.getElementById('message-phone-details').textContent = message.phone;
    document.getElementById('message-email-details').textContent = message.email;
    document.getElementById('message-text-details').textContent = message.message;
    document.getElementById('message-date-details').textContent = formatDate(message.date);
    
    // إظهار النافذة
    const messageModal = new bootstrap.Modal(document.getElementById('messageDetailsModal'));
    messageModal.show();
}

// حذف رسالة
function deleteMessage(index) {
    if (confirm(currentLang === 'ar' ? 'هل أنت متأكد من رغبتك في حذف هذه الرسالة؟' : 'Are you sure you want to delete this message?')) {
        // حذف الرسالة
        contactMessages.splice(index, 1);
        
        // حفظ البيانات في localStorage
        localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
        
        // إعادة تحميل الرسائل
        loadContactMessages();
        
        // إعادة تحميل بيانات لوحة المعلومات
        loadDashboardData();
        
        // إعادة تهيئة جدول البيانات
        $('#contact-messages-table').DataTable().destroy();
        initDataTables();
    }
}

// حفظ الإعدادات
function saveSettings() {
    // جمع البيانات من النموذج
    const adminUsername = document.getElementById('admin-username').value;
    const adminPassword = document.getElementById('admin-password').value;
    const siteTitleAr = document.getElementById('site-title-ar').value;
    const siteTitleEn = document.getElementById('site-title-en').value;
    const siteDescriptionAr = document.getElementById('site-description-ar').value;
    const siteDescriptionEn = document.getElementById('site-description-en').value;
    
    // تحديث الإعدادات
    siteSettings = {
        adminUsername,
        adminPassword,
        siteTitleAr,
        siteTitleEn,
        siteDescriptionAr,
        siteDescriptionEn
    };
    
    // تحديث بيانات تسجيل الدخول
    adminCredentials.username = adminUsername;
    adminCredentials.password = adminPassword;
    
    // حفظ البيانات في localStorage
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
    
    // عرض رسالة نجاح
    alert(currentLang === 'ar' ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
}

// تصدير البيانات إلى Excel
function exportToExcel(data, filename) {
    // إنشاء مصفوفة البيانات
    const rows = [];
    
    // إضافة الرؤوس
    const headers = [];
    if (filename === 'interested_clients') {
        headers.push(
            currentLang === 'ar' ? 'الاسم' : 'Name',
            currentLang === 'ar' ? 'رقم الهاتف' : 'Phone',
            currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email',
            currentLang === 'ar' ? 'العقار' : 'Property',
            currentLang === 'ar' ? 'التاريخ' : 'Date'
        );
    } else {
        headers.push(
            currentLang === 'ar' ? 'الاسم' : 'Name',
            currentLang === 'ar' ? 'رقم الهاتف' : 'Phone',
            currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email',
            currentLang === 'ar' ? 'الرسالة' : 'Message',
            currentLang === 'ar' ? 'التاريخ' : 'Date'
        );
    }
    rows.push(headers);
    
    // إضافة البيانات
    data.forEach(item => {
        const row = [];
        if (filename === 'interested_clients') {
            row.push(
                item.name,
                item.phone,
                item.email,
                getPropertyTitle(item.propertyId),
                formatDate(item.date)
            );
        } else {
            row.push(
                item.name,
                item.phone,
                item.email,
                item.message,
                formatDate(item.date)
            );
        }
        rows.push(row);
    });
    
    // إنشاء ورقة عمل
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    
    // إنشاء مصنف
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    
    // تصدير الملف
    XLSX.writeFile(workbook, `${filename}.xlsx`);
}

// تصدير البيانات إلى PDF
function exportToPDF(data, filename, columns) {
    // إنشاء مستند PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // إضافة العنوان
    const title = filename === 'interested_clients' ? 
        (currentLang === 'ar' ? 'قائمة العملاء المهتمين' : 'Interested Clients List') : 
        (currentLang === 'ar' ? 'قائمة رسائل التواصل' : 'Contact Messages List');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
    
    // إعداد البيانات للجدول
    const tableData = [];
    data.forEach(item => {
        const row = {};
        if (filename === 'interested_clients') {
            row.name = item.name;
            row.phone = item.phone;
            row.email = item.email;
            row.property = getPropertyTitle(item.propertyId);
            row.date = formatDate(item.date);
        } else {
            row.name = item.name;
            row.phone = item.phone;
            row.email = item.email;
            row.message = truncateText(item.message, 50);
            row.date = formatDate(item.date);
        }
        tableData.push(row);
    });
    
    // إنشاء الجدول
    doc.autoTable({
        startY: 30,
        head: [columns.map(col => col.header)],
        body: tableData.map(item => columns.map(col => item[col.dataKey])),
        theme: 'grid',
        headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: 'bold'
        },
        styles: {
            overflow: 'linebreak',
            cellWidth: 'auto'
        },
        columnStyles: {
            message: { cellWidth: 60 }
        }
    });
    
    // تصدير الملف
    doc.save(`${filename}.pdf`);
}

// وظائف مساعدة

// الحصول على عنوان العقار
function getPropertyTitle(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    return property ? property.title[currentLang] : (currentLang === 'ar' ? 'غير معروف' : 'Unknown');
}

// تنسيق التاريخ
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US', options);
}

// تنسيق السعر
function formatPrice(price) {
    return price.toLocaleString(currentLang === 'ar' ? 'ar-SA' : 'en-US') + (currentLang === 'ar' ? ' ريال' : ' SAR');
}

// اقتطاع النص
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// إنشاء معرف فريد
function generateId() {
    return 'property_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}
