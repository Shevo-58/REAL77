// بيانات متعددة اللغات محدثة
const translations = {
    ar: {
        // القائمة العلوية
        home: "الرئيسية",
        properties: "العقارات",
        contactUs: "تواصل معنا",
        english: "English",
        arabic: "العربية",
        
        // القسم الرئيسي
        heroTitle: "اعثر على عقارك المثالي",
        heroSubtitle: "نقدم مجموعة متنوعة من العقارات المميزة بمواصفات عالية وأسعار مناسبة",
        browseProperties: "تصفح العقارات",
        
        // قسم العقارات
        propertiesTitle: "العقارات المتاحة",
        propertiesSubtitle: "اكتشف أفضل العقارات المتاحة لدينا",
        location: "الموقع",
        area: "المساحة",
        bedrooms: "غرف النوم",
        bathrooms: "الحمامات",
        sqm: "متر مربع",
        details: "التفاصيل",
        registerInterest: "تسجيل الاهتمام",
        
        // نموذج تسجيل الاهتمام
        interestFormTitle: "تسجيل الاهتمام",
        name: "الاسم",
        phoneNumber: "رقم الجوال",
        email: "البريد الإلكتروني",
        notes: "ملاحظات",
        close: "إغلاق",
        submit: "إرسال",
        submitInterest: "تسجيل الاهتمام",
        thankYou: "شكراً لك!",
        interestRegistered: "تم تسجيل اهتمامك بنجاح. سنتواصل معك قريباً.",
        
        // نموذج التواصل
        contactFormTitle: "تواصل معنا",
        contactFormSubtitle: "نحن هنا للإجابة على استفساراتك",
        message: "الرسالة",
        send: "إرسال",
        messageSent: "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.",
        
        // لوحة التحكم
        adminPanel: "لوحة التحكم",
        interestedClients: "العملاء المهتمين",
        contactMessages: "رسائل التواصل",
        property: "العقار",
        date: "التاريخ",
        exportExcel: "تصدير Excel",
        exportPDF: "تصدير PDF",
        
        // تسجيل الدخول
        adminLogin: "تسجيل دخول المدير",
        username: "اسم المستخدم",
        password: "كلمة المرور",
        login: "تسجيل الدخول",
        invalidCredentials: "اسم المستخدم أو كلمة المرور غير صحيحة",
        logout: "تسجيل الخروج",
        
        // التذييل
        aboutUs: "من نحن",
        aboutUsText: "موقعك المثالي للعثور على عقارات مميزة",
        quickLinks: "روابط سريعة",
        allRightsReserved: "جميع الحقوق محفوظة"
    },
    en: {
        // Top Navigation
        home: "Home",
        properties: "Properties",
        contactUs: "Contact Us",
        english: "English",
        arabic: "العربية",
        
        // Hero Section
        heroTitle: "Find Your Perfect Property",
        heroSubtitle: "We offer a variety of distinctive properties with high specifications and reasonable prices",
        browseProperties: "Browse Properties",
        
        // Properties Section
        propertiesTitle: "Available Properties",
        propertiesSubtitle: "Discover our best available properties",
        location: "Location",
        area: "Area",
        bedrooms: "Bedrooms",
        bathrooms: "Bathrooms",
        sqm: "sqm",
        details: "Details",
        registerInterest: "Register Interest",
        
        // Interest Form
        interestFormTitle: "Register Interest",
        name: "Name",
        phoneNumber: "Phone Number",
        email: "Email",
        notes: "Notes",
        close: "Close",
        submit: "Submit",
        submitInterest: "Submit Interest",
        thankYou: "Thank You!",
        interestRegistered: "Your interest has been registered successfully. We will contact you soon.",
        
        // Contact Form
        contactFormTitle: "Contact Us",
        contactFormSubtitle: "We're here to answer your inquiries",
        message: "Message",
        send: "Send",
        messageSent: "Your message has been sent successfully. We will contact you soon.",
        
        // Admin Panel
        adminPanel: "Admin Panel",
        interestedClients: "Interested Clients",
        contactMessages: "Contact Messages",
        property: "Property",
        date: "Date",
        exportExcel: "Export Excel",
        exportPDF: "Export PDF",
        
        // Login
        adminLogin: "Admin Login",
        username: "Username",
        password: "Password",
        login: "Login",
        invalidCredentials: "Invalid username or password",
        logout: "Logout",
        
        // Footer
        aboutUs: "About Us",
        aboutUsText: "Your ideal site for finding distinctive properties",
        quickLinks: "Quick Links",
        allRightsReserved: "All Rights Reserved"
    }
};

// بيانات العقارات
const properties = [
    {
        id: 1,
        titleAr: "فيلا فاخرة مع حديقة",
        titleEn: "Luxury Villa with Garden",
        priceAr: "2,500,000 ريال",
        priceEn: "2,500,000 SAR",
        locationAr: "الرياض، حي النرجس",
        locationEn: "Riyadh, Al Narjis District",
        area: 450,
        bedrooms: 5,
        bathrooms: 6,
        image: "images/villa1.jpg",
        descriptionAr: "فيلا فاخرة مع حديقة واسعة، تصميم عصري، مسبح خاص، ومساحات واسعة للمعيشة والترفيه.",
        descriptionEn: "Luxurious villa with a spacious garden, modern design, private pool, and large living and entertainment areas."
    },
    {
        id: 2,
        titleAr: "شقة حديثة في وسط المدينة",
        titleEn: "Modern Apartment in City Center",
        priceAr: "850,000 ريال",
        priceEn: "850,000 SAR",
        locationAr: "جدة، حي الروضة",
        locationEn: "Jeddah, Al Rawdah District",
        area: 180,
        bedrooms: 3,
        bathrooms: 2,
        image: "images/apartment1.jpg",
        descriptionAr: "شقة حديثة في قلب المدينة، قريبة من المرافق الرئيسية، تشطيبات فاخرة، وإطلالة رائعة.",
        descriptionEn: "Modern apartment in the heart of the city, close to main facilities, luxury finishes, and a great view."
    },
    {
        id: 3,
        titleAr: "مكتب تجاري في برج فاخر",
        titleEn: "Commercial Office in Premium Tower",
        priceAr: "1,200,000 ريال",
        priceEn: "1,200,000 SAR",
        locationAr: "الرياض، طريق الملك فهد",
        locationEn: "Riyadh, King Fahd Road",
        area: 250,
        bedrooms: 0,
        bathrooms: 2,
        image: "images/office1.jpg",
        descriptionAr: "مكتب تجاري في برج فاخر، موقع استراتيجي، تجهيزات حديثة، ومواقف سيارات خاصة.",
        descriptionEn: "Commercial office in a premium tower, strategic location, modern equipment, and private parking."
    },
    {
        id: 4,
        titleAr: "أرض سكنية للبيع",
        titleEn: "Residential Land for Sale",
        priceAr: "1,800,000 ريال",
        priceEn: "1,800,000 SAR",
        locationAr: "الدمام، حي الشاطئ",
        locationEn: "Dammam, Al Shati District",
        area: 750,
        bedrooms: 0,
        bathrooms: 0,
        image: "images/land1.jpg",
        descriptionAr: "أرض سكنية في موقع متميز، مخططة ومطورة، قريبة من الخدمات الرئيسية.",
        descriptionEn: "Residential land in a prime location, planned and developed, close to main services."
    }
];

// بيانات العملاء المهتمين
let interestedClients = [
    {
        id: 1,
        name: "John Doe",
        phone: "+1234567890",
        email: "john.doe@example.com",
        property: "Luxury Villa with Garden",
        propertyId: 1,
        notes: "Interested in this property and would like to arrange a viewing.",
        date: "4/12/2025"
    }
];

// رسائل التواصل
let contactMessages = [];
