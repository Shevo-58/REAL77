// تحميل اللغة المفضلة من localStorage أو استخدام العربية كلغة افتراضية
let currentLang = localStorage.getItem('language') || 'ar';
document.documentElement.lang = currentLang;
document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

// بيانات العملاء المهتمين
let interestedClients = JSON.parse(localStorage.getItem('interestedClients')) || [];

// رسائل التواصل
let contactMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث واجهة المستخدم باللغة الحالية
    updateUILanguage();
    
    // عرض العقارات
    displayProperties();
    
    // إضافة مستمعي الأحداث
    setupEventListeners();
    
    // إعداد نموذج التواصل
    setupContactForm();
});

// تحديث واجهة المستخدم باللغة الحالية
function updateUILanguage() {
    // تحديث العناصر بناءً على معرفاتها
    const elements = document.querySelectorAll('[id]');
    elements.forEach(element => {
        const id = element.getAttribute('id');
        if (translations[currentLang] && translations[currentLang][id]) {
            element.textContent = translations[currentLang][id];
        }
    });
    
    // تحديث العناصر التي تحتوي على سمة data-translate
    const translateElements = document.querySelectorAll('[data-translate]');
    translateElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // تحديث زر تبديل اللغة
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.textContent = currentLang === 'ar' ? 'English' : 'العربية';
    }
    
    // تحديث العناوين الرئيسية
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        heroTitle.textContent = translations[currentLang].heroTitle;
    }
    
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = translations[currentLang].heroSubtitle;
    }
    
    const browseProperties = document.getElementById('browseProperties');
    if (browseProperties) {
        browseProperties.textContent = translations[currentLang].browseProperties;
    }
    
    // تحديث عناوين الأقسام
    const propertiesTitle = document.getElementById('propertiesTitle');
    if (propertiesTitle) {
        propertiesTitle.textContent = translations[currentLang].propertiesTitle;
    }
    
    const propertiesSubtitle = document.getElementById('propertiesSubtitle');
    if (propertiesSubtitle) {
        propertiesSubtitle.textContent = translations[currentLang].propertiesSubtitle;
    }
    
    // تحديث عناوين نموذج التواصل
    const contactFormTitle = document.getElementById('contactFormTitle');
    if (contactFormTitle) {
        contactFormTitle.textContent = translations[currentLang].contactFormTitle;
    }
    
    const contactFormSubtitle = document.getElementById('contactFormSubtitle');
    if (contactFormSubtitle) {
        contactFormSubtitle.textContent = translations[currentLang].contactFormSubtitle;
    }
    
    // تحديث عناوين التذييل
    const aboutUs = document.getElementById('aboutUs');
    if (aboutUs) {
        aboutUs.textContent = translations[currentLang].aboutUs;
    }
    
    const aboutUsText = document.getElementById('aboutUsText');
    if (aboutUsText) {
        aboutUsText.textContent = translations[currentLang].aboutUsText;
    }
    
    const quickLinks = document.getElementById('quickLinks');
    if (quickLinks) {
        quickLinks.textContent = translations[currentLang].quickLinks;
    }
    
    const contactUs = document.getElementById('contactUs');
    if (contactUs) {
        contactUs.textContent = translations[currentLang].contactUs;
    }
    
    const allRightsReserved = document.getElementById('allRightsReserved');
    if (allRightsReserved) {
        allRightsReserved.textContent = translations[currentLang].allRightsReserved;
    }
    
    // تحديث عناوين النوافذ المنبثقة
    const priceLabel = document.getElementById('price-label');
    if (priceLabel) {
        priceLabel.textContent = translations[currentLang].price + ':';
    }
    
    const locationLabel = document.getElementById('location-label');
    if (locationLabel) {
        locationLabel.textContent = translations[currentLang].location + ':';
    }
    
    const areaLabel = document.getElementById('area-label');
    if (areaLabel) {
        areaLabel.textContent = translations[currentLang].area + ':';
    }
    
    const bedroomsLabel = document.getElementById('bedrooms-label');
    if (bedroomsLabel) {
        bedroomsLabel.textContent = translations[currentLang].bedrooms + ':';
    }
    
    const bathroomsLabel = document.getElementById('bathrooms-label');
    if (bathroomsLabel) {
        bathroomsLabel.textContent = translations[currentLang].bathrooms + ':';
    }
    
    const interestFormTitle = document.getElementById('interestFormTitle');
    if (interestFormTitle) {
        interestFormTitle.textContent = translations[currentLang].interestFormTitle;
    }
    
    const registerInterestBtn = document.getElementById('register-interest-btn');
    if (registerInterestBtn) {
        registerInterestBtn.textContent = translations[currentLang].submitInterest;
    }
    
    const thankYou = document.getElementById('thankYou');
    if (thankYou) {
        thankYou.textContent = translations[currentLang].thankYou;
    }
    
    const close = document.getElementById('close');
    if (close) {
        close.textContent = translations[currentLang].close;
    }
}

// إضافة مستمعي الأحداث
function setupEventListeners() {
    // تبديل اللغة
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            document.documentElement.lang = currentLang;
            document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
            localStorage.setItem('language', currentLang);
            
            // تحديث واجهة المستخدم باللغة الجديدة
            updateUILanguage();
            
            // إعادة عرض العقارات باللغة الجديدة
            displayProperties();
        });
    }
}

// عرض العقارات
function displayProperties() {
    const propertiesContainer = document.getElementById('properties-container');
    if (!propertiesContainer) return;
    
    propertiesContainer.innerHTML = '';
    
    properties.forEach(property => {
        const title = currentLang === 'ar' ? property.titleAr : property.titleEn;
        const price = currentLang === 'ar' ? property.priceAr : property.priceEn;
        const location = currentLang === 'ar' ? property.locationAr : property.locationEn;
        
        const propertyCard = document.createElement('div');
        propertyCard.className = 'property-card';
        propertyCard.innerHTML = `
            <div class="property-image">
                <img src="${property.image}" alt="${title}">
            </div>
            <div class="property-details">
                <h3 class="property-title">${title}</h3>
                <div class="property-price">${price}</div>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i> ${location}
                </div>
                <div class="property-info">
                    <div class="property-info-item">
                        <i class="fas fa-ruler-combined"></i> ${property.area} ${translations[currentLang].sqm}
                    </div>
                    <div class="property-info-item">
                        <i class="fas fa-bed"></i> ${translations[currentLang].bedrooms}: ${property.bedrooms}
                    </div>
                    <div class="property-info-item">
                        <i class="fas fa-bath"></i> ${translations[currentLang].bathrooms}: ${property.bathrooms}
                    </div>
                </div>
                <div class="property-buttons">
                    <button class="btn btn-primary details-btn" data-property-id="${property.id}">${translations[currentLang].details}</button>
                    <button class="btn btn-secondary interest-btn" data-property-id="${property.id}">${translations[currentLang].registerInterest}</button>
                </div>
            </div>
        `;
        
        propertiesContainer.appendChild(propertyCard);
    });
    
    // إضافة مستمعي الأحداث للأزرار
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const propertyId = parseInt(this.getAttribute('data-property-id'));
            showPropertyDetails(propertyId);
        });
    });
    
    document.querySelectorAll('.interest-btn').forEach(button => {
        button.addEventListener('click', function() {
            const propertyId = parseInt(this.getAttribute('data-property-id'));
            showInterestForm(propertyId);
        });
    });
}

// إظهار تفاصيل العقار
function showPropertyDetails(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const title = currentLang === 'ar' ? property.titleAr : property.titleEn;
    const price = currentLang === 'ar' ? property.priceAr : property.priceEn;
    const location = currentLang === 'ar' ? property.locationAr : property.locationEn;
    const description = currentLang === 'ar' ? property.descriptionAr : property.descriptionEn;
    
    const modal = document.getElementById('property-modal');
    if (modal) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-price').textContent = price;
        document.getElementById('modal-location').textContent = location;
        document.getElementById('modal-area').textContent = `${property.area} ${translations[currentLang].sqm}`;
        document.getElementById('modal-bedrooms').textContent = property.bedrooms;
        document.getElementById('modal-bathrooms').textContent = property.bathrooms;
        document.getElementById('modal-image').src = property.image;
        document.getElementById('modal-image').alt = title;
        
        modal.style.display = 'block';
        
        // إضافة معرف العقار للنموذج
        const interestForm = document.getElementById('interest-form');
        if (interestForm) {
            interestForm.setAttribute('data-property-id', propertyId);
            interestForm.setAttribute('data-property-title', title);
        }
    }
}

// إظهار نموذج تسجيل الاهتمام
function showInterestForm(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const title = currentLang === 'ar' ? property.titleAr : property.titleEn;
    
    const modal = document.getElementById('property-modal');
    if (modal) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-price').textContent = currentLang === 'ar' ? property.priceAr : property.priceEn;
        document.getElementById('modal-location').textContent = currentLang === 'ar' ? property.locationAr : property.locationEn;
        document.getElementById('modal-area').textContent = `${property.area} ${translations[currentLang].sqm}`;
        document.getElementById('modal-bedrooms').textContent = property.bedrooms;
        document.getElementById('modal-bathrooms').textContent = property.bathrooms;
        document.getElementById('modal-image').src = property.image;
        document.getElementById('modal-image').alt = title;
        
        modal.style.display = 'block';
        
        // إضافة معرف العقار للنموذج
        const interestForm = document.getElementById('interest-form');
        if (interestForm) {
            interestForm.setAttribute('data-property-id', propertyId);
            interestForm.setAttribute('data-property-title', title);
        }
    }
}

// إرسال نموذج تسجيل الاهتمام
function submitInterestForm() {
    const interestForm = document.getElementById('interest-form');
    if (!interestForm) return;
    
    const propertyId = parseInt(interestForm.getAttribute('data-property-id'));
    const propertyTitle = interestForm.getAttribute('data-property-title');
    const name = document.getElementById('interest-name').value;
    const phone = document.getElementById('interest-phone').value;
    const email = document.getElementById('interest-email').value;
    
    if (!name || !phone || !email) {
        alert(currentLang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
        return;
    }
    
    // إضافة العميل المهتم إلى القائمة
    const newClient = {
        id: interestedClients.length + 1,
        name: name,
        phone: phone,
        email: email,
        property: propertyTitle,
        propertyId: propertyId,
        date: new Date().toLocaleDateString()
    };
    
    interestedClients.push(newClient);
    
    // حفظ البيانات في localStorage
    localStorage.setItem('interestedClients', JSON.stringify(interestedClients));
    
    // إغلاق النافذة المنبثقة وإظهار رسالة نجاح
    const modal = document.getElementById('property-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    showSuccessMessage();
}

// إظهار نموذج التواصل
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contact-name').value;
        const phone = document.getElementById('contact-phone').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
        
        if (!name || !phone || !email || !message) {
            alert(currentLang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
            return;
        }
        
        // إضافة الرسالة إلى القائمة
        const newMessage = {
            id: contactMessages.length + 1,
            name: name,
            phone: phone,
            email: email,
            message: message,
            date: new Date().toLocaleDateString()
        };
        
        contactMessages.push(newMessage);
        
        // حفظ البيانات في localStorage
        localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
        
        // إعادة تعيين النموذج وإظهار رسالة نجاح
        contactForm.reset();
        showSuccessMessage();
    });
}

// إظهار رسالة نجاح
function showSuccessMessage() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        document.getElementById('success-message').textContent = currentLang === 'ar' ? 'تم تسجيل طلبك بنجاح. سنتواصل معك قريباً.' : 'Your request has been submitted successfully. We will contact you soon.';
        successModal.style.display = 'block';
    }
}

// إغلاق النوافذ المنبثقة عند النقر على زر الإغلاق
document.addEventListener('DOMContentLoaded', function() {
    // إغلاق نافذة العقار
    const propertyModal = document.getElementById('property-modal');
    if (propertyModal) {
        const closeButtons = propertyModal.querySelectorAll('.close-modal');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                propertyModal.style.display = 'none';
            });
        });
    }
    
    // إغلاق نافذة النجاح
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        const closeButtons = successModal.querySelectorAll('.close-modal, .close-success-modal');
     
(Content truncated due to size limit. Use line ranges to read in chunks)