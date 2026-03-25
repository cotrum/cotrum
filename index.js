/* ─── Cursor ─────────────────────────────── */
const dot  = document.getElementById('cursor-dot');
document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
});

/* ─── Tilt ───────────────────────────────── */
const middle = document.getElementById('middle');
document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const rx = -((e.clientY - cy) / cy) * 8;
    const ry =  ((e.clientX - cx) / cx) * 8;
    middle.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
});
document.addEventListener('mouseleave', () => {
    middle.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
});

/* ─── Scramble ───────────────────────────── */
const scrambleEl = document.querySelector('#middle h1');
const finalText  = 'marycotrupi.';
const chars      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
let   scrambleFn = null;
function scramble() {
    if (scrambleFn) clearInterval(scrambleFn);
    let iteration = 0;
    scrambleFn = setInterval(() => {
        scrambleEl.textContent = finalText.split('').map((ch, i) =>
            i < iteration ? ch : chars[Math.floor(Math.random() * chars.length)]
        ).join('');
        if (iteration >= finalText.length) clearInterval(scrambleFn);
        iteration += 0.4;
    }, 40);
}
scrambleEl.addEventListener('mouseenter', scramble);
setTimeout(scramble, 3600);

/* ─── Cursor theme ───────────────────────── */
function setCursorTheme(dark) {
    dot.classList.toggle('panel-open', dark);
}

function isPanelOpen(id) {
    const el = document.getElementById(id);
    return el && el.style.display !== 'none' && el.style.display !== '';
}

/* ─── Panel: About ───────────────────────── */
function showabout() {
    setCursorTheme(true);
    $("#about_container").css("display","inherit")
        .addClass("animated slideInLeft");
    setTimeout(() => $("#about_container").removeClass("animated slideInLeft"), 800);
    setTimeout(() => {
        document.querySelectorAll('#about_container .stagger-item')
            .forEach((el, i) => setTimeout(() => el.classList.add('visible'), 200 + i * 130));
    }, 400);
}
function closeabout() {
    if (!['work_container','art_container','contact_container'].some(isPanelOpen))
        setCursorTheme(false);
    document.querySelectorAll('#about_container .stagger-item')
        .forEach(el => el.classList.remove('visible'));
    $("#about_container").addClass("animated slideOutLeft");
    setTimeout(() => {
        $("#about_container").removeClass("animated slideOutLeft").css("display","none");
    }, 800);
}

/* ─── Panel: Work ────────────────────────── */
function showwork() {
    setCursorTheme(true);
    $("#work_container").css("display","inherit")
        .addClass("animated slideInRight");
    setTimeout(() => $("#work_container").removeClass("animated slideInRight"), 800);
}
function closework() {
    if (!['about_container','art_container','contact_container'].some(isPanelOpen))
        setCursorTheme(false);
    $("#work_container").addClass("animated slideOutRight");
    setTimeout(() => {
        $("#work_container").removeClass("animated slideOutRight").css("display","none");
    }, 800);
}

/* ─── Panel: Contact ─────────────────────── */
function showcontact() {
    setCursorTheme(true);
    $("#contact_container").css("display","inherit")
        .addClass("animated slideInUp");
    setTimeout(() => $("#contact_container").removeClass("animated slideInUp"), 800);
    setTimeout(() => {
        document.querySelectorAll('#footer .social')
            .forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('social-bounce');
                    setTimeout(() => el.classList.remove('social-bounce'), 500);
                }, i * 160);
            });
    }, 500);
}
function closecontact() {
    if (!['about_container','work_container','art_container'].some(isPanelOpen))
        setCursorTheme(false);
    $("#contact_container").addClass("animated slideOutDown");
    setTimeout(() => {
        $("#contact_container").removeClass("animated slideOutDown").css("display","none");
    }, 800);
}

/* ─── Panel: Art ─────────────────────────── */
function showart() {
    setCursorTheme(true);
    $("#art_container").css("display","inherit")
        .addClass("animated slideInDown");
    setTimeout(() => $("#art_container").removeClass("animated slideInDown"), 800);
}
function closeart() {
    if (!['about_container','work_container','contact_container'].some(isPanelOpen))
        setCursorTheme(false);
    $("#art_container").addClass("animated slideOutUp");
    setTimeout(() => {
        $("#art_container").removeClass("animated slideOutUp").css("display","none");
    }, 800);
}

/* ─── Expandable publications ────────────── */
document.querySelectorAll('.pub-title').forEach(title => {
    title.addEventListener('click', () => {
        title.classList.toggle('open');
        title.nextElementSibling.classList.toggle('open');
    });
});

/* ─── Lightbox ───────────────────────────── */
const galleryImages = Array.from(document.querySelectorAll('.image-gallery img'));
let lightboxIndex = 0;

function openLightbox(index) {
    lightboxIndex = index;
    const img = document.getElementById('lightbox-img');
    img.src = galleryImages[index].src;
    document.getElementById('lightbox-caption').textContent = galleryImages[index].alt;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}
function lightboxNav(dir) {
    lightboxIndex = (lightboxIndex + dir + galleryImages.length) % galleryImages.length;
    const img = document.getElementById('lightbox-img');
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = galleryImages[lightboxIndex].src;
        document.getElementById('lightbox-caption').textContent = galleryImages[lightboxIndex].alt;
        img.style.opacity = '1';
    }, 180);
}
galleryImages.forEach((img, i) => img.addEventListener('click', () => openLightbox(i)));
document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') lightboxNav(1);
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
});


/* ─── Resume button ──────────────────────── */
document.querySelector('.btn_one').addEventListener('click', () => {
    window.open('resources/Cotrupi_Resume.pdf', '_blank');
});

/* ─── Project buttons ────────────────────── */
document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        window.open(this.getAttribute('data-url'), '_blank');
    });
});

/* ─── Loading screen ─────────────────────── */
setTimeout(() => {
    $("#loading").addClass("animated fadeOut");
    setTimeout(() => {
        $("#loading").removeClass("animated fadeOut").css("display","none");
        $("#box").css("display","none");
        ["#about","#contact","#work","#art"].forEach(id =>
            $(id).removeClass("animated fadeIn"));
    }, 1000);
}, 1500);