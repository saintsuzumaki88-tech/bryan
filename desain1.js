document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const mainNav = document.getElementById('mainNav');
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
            if(targetElement) {
                setTimeout(() => {
                     targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 150);
            }
        });
    });

    // --- Mobile menu toggle ---
    const mobileMenu = document.getElementById('mobileMenu');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenu && mainNav) {
        mobileMenu.addEventListener('click', () => mainNav.classList.toggle('active'));
    }

    // --- Highlight active navigation link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    function highlightNavLink() {
        let fromTop = window.scrollY;
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
             currentSectionId = sections[sections.length - 1].id;
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    // --- HERO TEXT ROTATOR ---
    const problemRotator = document.getElementById('problem-rotator');
    if (problemRotator) {
        const problems = [
            "biaya tak terduga?",
            "servis yang asal-asalan?",
            "kerusakan berulang?",
            "diagnosa yang tidak jujur?",
            "waktu tunggu tidak pasti?"
        ];
        let currentIndex = 0;
        setInterval(() => {
            problemRotator.classList.add('fade-out');
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % problems.length;
                problemRotator.innerHTML = problems[currentIndex];
                problemRotator.classList.remove('fade-out');
            }, 400); 

        }, 3000);
    }
    
    // --- Testimonial Slider ---
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let testimonialIndex = 0;
    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) { item.classList.add('active'); }
        });
    }
    if (testimonialItems.length > 0 && nextBtn && prevBtn) {
        const nextTestimonial = () => {
            testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
            showTestimonial(testimonialIndex);
        };
        const prevTestimonial = () => {
            testimonialIndex = (testimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(testimonialIndex);
        };
        showTestimonial(0);
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
        setInterval(nextTestimonial, 8000);
    }

    // --- Running Text Bar Content ---
    const runningTextContainer = document.getElementById('carBrandLogos');
    if(runningTextContainer) {
        const marqueeMessages = [
            "<i class='fas fa-star'></i> GRATIS Cek & Analisa AC Mobil",
            "<i class='fas fa-check-double'></i> Anda Setuju, Baru Kami Kerja",
            "<i class='fas fa-handshake'></i> Jujur, Bersih, dan Bergaransi",
            "<i class='fas fa-receipt'></i> Tanpa Biaya Tersembunyi",
            "<i class='fas fa-shield-alt'></i> Transparansi di Setiap Penggantian Part",
            "<i class='fas fa-award'></i> Keahlian Teruji Lebih dari 30 Tahun"
        ];
        const allMessages = [...marqueeMessages, ...marqueeMessages, ...marqueeMessages];
        runningTextContainer.innerHTML = allMessages.map(msg => `<span class="marquee-text-item">${msg}</span>`).join('');
    }

    // --- LOGIKA DIAGNOSA MANDIRI INTERAKTIF ---
    const diagnosaBox = document.getElementById('diagnosa-box');
    if (diagnosaBox) {
        const startScreen = document.getElementById('diagnosa-start');
        const stepsScreen = document.getElementById('diagnosa-steps');
        const resultScreen = document.getElementById('diagnosa-result');
        const startOptionsContainer = startScreen.querySelector('.diagnosa-options');
        const questionEl = document.getElementById('diagnosa-question');
        const stepOptionsContainer = document.getElementById('diagnosa-step-options');
        const resultTitleEl = document.getElementById('result-title');
        const resultDescEl = document.getElementById('result-description');
        const resultRecEl = document.getElementById('result-recommendation');
        const resultWaLink = document.getElementById('result-whatsapp-link');
        const resetBtn = document.getElementById('reset-diagnosa');
        
        const diagnosisData = {
            'AC Mobil': {
                question: 'Seperti apa masalah AC-nya?',
                options: {
                    'Tidak Dingin Sama Sekali': { result: { title: 'Kemungkinan: Masalah Sirkulasi Freon', description: 'Ini bisa disebabkan oleh banyak faktor, mulai dari kebocoran yang membuat freon habis, kompresor yang kehilangan tekanan, hingga penyumbatan pada sistem. Ini adalah masalah paling umum yang kami tangani.', recommendation: 'Jangan khawatir. Langkah pertama adalah Pengecekan AC GRATIS di bengkel kami untuk menemukan sumber masalahnya secara pasti menggunakan alat ukur tekanan khusus.', wa_text: 'AC saya tidak dingin sama sekali. Bisa tolong dibantu cek?' }},
                    'Kadang Dingin, Kadang Tidak': { result: { title: 'Kemungkinan: Masalah Kelistrikan atau Kopling AC', description: 'Masalah "putus-nyambung" seringkali terjadi karena magnetic clutch pada kompresor sudah aus dan slip, ada masalah pada sekring/relay, atau sensor temperatur yang tidak akurat.', recommendation: 'Kami akan memeriksa sistem kelistrikan AC dan kondisi magnetic clutch. Biasanya ini bukan masalah besar jika cepat ditangani sebelum merembet ke kompresor.', wa_text: 'AC saya kadang dingin kadang tidak. Bisa tolong dibantu cek?' }},
                    'Bau Tidak Sedap': { result: { 
                        title: 'Kemungkinan: Evaporator Kotor & Berjamur', 
                        description: 'Penyebab utamanya adalah evaporator yang bocor, kotor dan lembab, menjadi tempat ideal bagi jamur & bakteri untuk berkembang. Kondisi ini tidak hanya menimbulkan bau, tapi juga sangat tidak baik untuk kesehatan pernapasan Anda dan keluarga.', 
                        recommendation: 'Solusi terbaik adalah pembersihan total evaporator dari lendir dan kotoran, desinfeksi, serta penggantian filter kabin untuk mengembalikan udara segar dan sehat.', 
                        wa_text: 'AC mobil saya mengeluarkan bau tidak sedap. Bisa tolong dibantu cek?' 
                    }}
                }
            },
            'Bunyi Aneh': {
                question: 'Seperti apa bunyi dan sumbernya?',
                options: {
                    'Bagian Depan (Gluduk-gluduk)': { result: { title: 'Kemungkinan: Masalah pada Kaki-Kaki', description: 'Bunyi "gluduk-gluduk" saat melewati jalan tidak rata umumnya disebabkan oleh komponen kaki-kaki yang aus seperti link stabilizer, tie rod, atau ball joint.', recommendation: 'Segera periksakan untuk menghindari kerusakan yang lebih parah dan menjaga kestabilan berkendara. Kami akan melakukan pengecekan dan menunjukkan komponen mana yang benar-benar perlu diganti.', wa_text: 'Mobil saya bunyi gluduk-gluduk di depan. Bisa tolong dibantu cek?' }},
                    'Saat Pengereman (Ngiik)': { result: { title: 'Kemungkinan: Sistem Pengereman Aus', description: 'Bunyi "ngiik" yang tajam saat mengerem adalah indikator kuat bahwa kampas rem sudah tipis atau ada masalah pada piringan cakram. Ini menyangkut keselamatan Anda.', recommendation: 'Pengecekan dan pembersihan sistem rem sangat diperlukan. Jika kampas rem tipis, penggantian adalah wajib demi keselamatan Anda.', wa_text: 'Rem mobil saya mengeluarkan bunyi ngiik. Bisa tolong dibantu cek?' }}
                }
            },
             'Masalah Lainnya': {
                result: {
                    title: 'Konsultasi Langsung Diperlukan',
                    description: 'Untuk masalah yang lebih unik atau tidak terdaftar, cara terbaik adalah dengan pemeriksaan langsung oleh  berpengalaman kami.',
                    recommendation: 'Silakan hubungi kami melalui WhatsApp atau datang langsung ke bengkel. Kepala bengkel kami siap membantu Anda dengan pengecekan dan analisa GRATIS tanpa komitmen apapun.',
                    wa_text: 'Saya punya masalah mobil yang tidak ada di diagnosa mandiri. Bisa tolong dibantu cek?'
                }
            }
        };

        function showResult(result) { 
            stepsScreen.classList.add('hidden'); 
            resultScreen.classList.remove('hidden'); 
            resultTitleEl.textContent = result.title; 
            resultDescEl.textContent = result.description; 
            resultRecEl.textContent = result.recommendation; 
            resultWaLink.href = `https://wa.me/6285283295909?text=Halo%20Central%20Cool,%20${encodeURIComponent(result.wa_text)}`; 
        }

        function showStep(stepData) { 
            startScreen.classList.add('hidden'); 
            stepsScreen.classList.remove('hidden'); 
            questionEl.textContent = stepData.question; 
            stepOptionsContainer.innerHTML = ''; 
            for (const option in stepData.options) { 
                const button = document.createElement('button'); 
                button.className = 'option-btn'; 
                button.textContent = option; 
                button.onclick = () => showResult(stepData.options[option].result); 
                stepOptionsContainer.appendChild(button); 
            } 
        }

        function resetDiagnosa() { 
            startScreen.classList.remove('hidden'); 
            stepsScreen.classList.add('hidden'); 
            // [BUG FIX] Menggunakan .classList.add, bukan .add
            resultScreen.classList.add('hidden'); 
        }

        function init() {
            startOptionsContainer.innerHTML = '';
            for (const category in diagnosisData) {
                const button = document.createElement('button'); button.className = 'option-btn'; button.textContent = category;
                button.onclick = () => {
                    const categoryData = diagnosisData[category];
                    if (categoryData.result) { showResult(categoryData.result); } else { showStep(categoryData); }
                };
                startOptionsContainer.appendChild(button);
            }
            if(resetBtn) { resetBtn.addEventListener('click', resetDiagnosa); }
        }
        init();
    }

    // --- Bukti Kerja Toggle Logic ---
    const buktiCards = document.querySelectorAll('.bukti-card');
    buktiCards.forEach(card => {
        const toggleInput = card.querySelector('.toggle-input');
        if (toggleInput) {
            toggleInput.addEventListener('change', () => {
                card.classList.toggle('toggled', toggleInput.checked);
            });
        }
    });

    // --- REVEAL ON SCROLL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => { revealObserver.observe(el); });
});