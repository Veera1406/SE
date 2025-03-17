function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    if (modalId === "login-modal") {
        showLoginForm();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function showSignupForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("modal-title").innerText = "Create an Account";
}

function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("modal-title").innerText = "Welcome Back";
}

const uploadBtn = document.getElementById("uploadBtn");
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.createElement("img");
imagePreview.style.maxWidth = "100px";
imagePreview.style.display = "block";

uploadBtn.addEventListener("click", function () {
    imageUpload.click();
});

imageUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            uploadBtn.insertAdjacentElement("afterend", imagePreview);
        };
        reader.readAsDataURL(file);
    } else {
        alert("Only PNG and JPG images are allowed.");
    }
});

const translations = {
    en: {
        home: "Home", report: "Report Waste", status: "Check Status", contact: "Contact Us", login: "Login / Sign Up",
        welcome: "Welcome to Waste Management System", description: "Report unclean areas and help keep your city clean.",
        location: "📍 Location:", details: "📝 Description:", upload: "📷 Upload Image:", submit: "Submit Report",
        loginTitle: "Welcome Back", signupTitle: "Create an Account",
        loginSuccess: "Login successful!", signupSuccess: "Signup successful!",
        reportSuccess: "Report submitted successfully!",
        notification: "🔔 Notifications", reportHistory: "📜 Report History"
    },
    hi: {
        home: "होम", report: "अपशिष्ट रिपोर्ट करें", status: "स्थिति जांचें", contact: "संपर्क करें", login: "लॉगिन / साइन अप",
        welcome: "अपशिष्ट प्रबंधन प्रणाली में आपका स्वागत है", description: "गंदे क्षेत्रों की रिपोर्ट करें और अपने शहर को स्वच्छ रखें।",
        location: "📍 स्थान:", details: "📝 विवरण:", upload: "📷 छवि अपलोड करें:", submit: "रिपोर्ट सबमिट करें",
        loginTitle: "वापसी पर स्वागत है", signupTitle: "खाता बनाएं",
        loginSuccess: "लॉगिन सफल!", signupSuccess: "साइनअप सफल!",
        reportSuccess: "रिपोर्ट सफलतापूर्वक जमा की गई!",
        notification: "🔔 सूचनाएं", reportHistory: "📜 रिपोर्ट इतिहास"
    },
    te: {
        home: "హోమ్", report: "వ్యర్థాలను నివేదించండి", status: "స్థితిని తనిఖీ చేయండి", contact: "మాకు సంప్రదించండి", login: "లాగిన్ / సైన్ అప్",
        welcome: "మున్సిపల్ వ్యర్థాల నిర్వహణ వ్యవస్థకు స్వాగతం", description: "అశుభ ప్రాంతాలను నివేదించండి మరియు మీ నగరాన్ని శుభ్రంగా ఉంచండి.",
        location: "📍 స్థానము:", details: "📝 వివరణ:", upload: "📷 చిత్రం అప్‌లోడ్ చేయండి:", submit: "నివేదించు",
        loginTitle: "తిరిగి స్వాగతం", signupTitle: "ఖాతాను సృష్టించండి",
        loginSuccess: "లాగిన్ విజయవంతం!", signupSuccess: "సైన్ అప్ విజయవంతం!",
        reportSuccess: "నివేదిక విజయవంతంగా సమర్పించబడింది!",
        notification: "🔔 తెలియచేయుటలు", reportHistory: "📜 నివేదిక చరిత్ర"
    }
};

function changeLanguage() {
    const lang = document.getElementById("language-select").value;
    localStorage.setItem("selectedLanguage", lang);
    applyTranslations(lang);
}

function applyTranslations(lang) {
    document.getElementById("home-link").innerText = translations[lang].home;
    document.getElementById("report-link").innerText = translations[lang].report;
    document.getElementById("status-link").innerText = translations[lang].status;
    document.getElementById("contact-link").innerText = translations[lang].contact;
    document.getElementById("login-link").innerText = translations[lang].login;
    document.getElementById("home-title").innerText = translations[lang].welcome;
    document.getElementById("home-description").innerText = translations[lang].description;
    document.getElementById("modal-title").innerText = translations[lang].loginTitle;
    document.querySelector("label[for='location']").innerText = translations[lang].location;
    document.querySelector("label[for='description']").innerText = translations[lang].details;
    document.querySelector("label[for='imageUpload']").innerText = translations[lang].upload;
    document.getElementById("submit-btn").innerText = translations[lang].submit;
    document.getElementById("notifications-link").innerText = translations[lang].notification;
    document.getElementById("report-history-link").innerText = translations[lang].reportHistory;
}

document.addEventListener("DOMContentLoaded", function () {
    getLocation();
    const savedLang = localStorage.getItem("selectedLanguage") || "en";
    document.getElementById("language-select").value = savedLang;
    applyTranslations(savedLang);
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            document.getElementById("location").value = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
        }, function () {
            alert("Geolocation is not supported or permission denied.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const lang = document.getElementById("language-select").value;
    alert(translations[lang].loginSuccess);
    closeModal("login-modal");
});

document.getElementById("report-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const lang = document.getElementById("language-select").value;
    alert(translations[lang].reportSuccess);
    document.getElementById("report-form").reset();
});
