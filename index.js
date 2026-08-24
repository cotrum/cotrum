/* ─── Cursor: instant dot + trailing ring ── */
if (window.matchMedia('(pointer: fine)').matches) {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const HOVER_SEL = 'a, button, .pub-title, .close-btn, .image-gallery img, #lightbox-close, .name-wrap h1';
    let mx = -100, my = -100, ringX = -100, ringY = -100;
    let ringScale = 1, targetScale = 1, pressed = false;

    let rafActive = false;
    function cursorLoop() {
        ringX += (mx - ringX) * 0.22;
        ringY += (my - ringY) * 0.22;
        const target = pressed ? 0.72 : targetScale;
        ringScale += (target - ringScale) * 0.25;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${ringScale})`;
        if (Math.abs(mx - ringX) < 0.1 && Math.abs(my - ringY) < 0.1 && Math.abs(target - ringScale) < 0.002) {
            rafActive = false;
            return;
        }
        requestAnimationFrame(cursorLoop);
    }
    function wakeCursor() {
        if (!rafActive) {
            rafActive = true;
            requestAnimationFrame(cursorLoop);
        }
    }

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        wakeCursor();
    });
    document.addEventListener('mousedown', () => { pressed = true; wakeCursor(); });
    document.addEventListener('mouseup',   () => { pressed = false; wakeCursor(); });
    document.addEventListener('mouseover', e => {
        targetScale = e.target.closest(HOVER_SEL) ? 1.55 : 1;
        ring.classList.toggle('hover', targetScale > 1);
        wakeCursor();
    });
}

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

function isPanelOpen(id) {
    const el = document.getElementById(id);
    return el && el.style.display !== 'none' && el.style.display !== '';
}

/* ─── Panel: About ───────────────────────── */
function showabout() {
    $("#about_container").css("display","inherit")
        .addClass("animated slideInLeft");
    setTimeout(() => $("#about_container").removeClass("animated slideInLeft"), 800);
    setTimeout(() => {
        document.querySelectorAll('#about_container .stagger-item')
            .forEach((el, i) => setTimeout(() => el.classList.add('visible'), 200 + i * 130));
    }, 400);
}
function closeabout() {
    document.querySelectorAll('#about_container .stagger-item')
        .forEach(el => el.classList.remove('visible'));
    $("#about_container").addClass("animated slideOutLeft");
    setTimeout(() => {
        $("#about_container").removeClass("animated slideOutLeft").css("display","none");
    }, 800);
}

/* ─── Panel: Work ────────────────────────── */
function showwork() {
    $("#work_container").css("display","inherit")
        .addClass("animated slideInRight");
    setTimeout(() => $("#work_container").removeClass("animated slideInRight"), 800);
}
function closework() {
    $("#work_container").addClass("animated slideOutRight");
    setTimeout(() => {
        $("#work_container").removeClass("animated slideOutRight").css("display","none");
    }, 800);
}

/* ─── Panel: Contact ─────────────────────── */
function showcontact() {
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
    $("#contact_container").addClass("animated slideOutDown");
    setTimeout(() => {
        $("#contact_container").removeClass("animated slideOutDown").css("display","none");
    }, 800);
}

/* ─── Panel: Art ─────────────────────────── */
function showart() {
    $("#art_container").css("display","inherit")
        .addClass("animated slideInDown");
    setTimeout(() => $("#art_container").removeClass("animated slideInDown"), 800);
}
function closeart() {
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
    window.open('resources/Resume_Fall_2026.pdf', '_blank');
});

/* ─── Project buttons ────────────────────── */
document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        window.open(this.getAttribute('data-url'), '_blank');
    });
});

/* ─── Violin strings (G-D-A-E, pluckable) ── */
const stringsSvg = document.getElementById('strings');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let audioCtx = null;

function audioReady() {
    if (!audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}
document.addEventListener('pointerdown', audioReady);

function pluckSound(freq, vel) {
    if (!audioCtx || audioCtx.state !== 'running') return;
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filt = audioCtx.createBiquadFilter();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    filt.type = 'lowpass';
    filt.frequency.value = 2400;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.1 * vel, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.05);
    osc.connect(filt);
    filt.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 1.1);
}

if (stringsSvg && !reducedMotion) {
    const nameEl = document.querySelector('.name-wrap h1');
    const tagEl = document.querySelector('.name-wrap h2');
    const labels = {};
    stringsSvg.querySelectorAll('.note-label').forEach(l => labels[l.dataset.note] = l);
    /* visual wobble speed (Hz): higher strings vibrate faster */
    const visHz = { G: 3.1, D: 3.6, A: 4.2, E: 4.9 };
    let W = 900;
    let H = 360;

    const strings = Array.from(stringsSvg.querySelectorAll('.string')).map(p => ({
        el: p,
        note: p.dataset.note,
        y: +p.dataset.y,
        freq: +p.dataset.freq,
        amp: 0, t0: 0, cx: 450
    }));

    function flatten(s) {
        s.el.setAttribute('d', `M0,${s.y} Q${W / 2},${s.y} ${W},${s.y}`);
    }
    /* place D and A equidistant around the name so it sits squarely
       between them; G and E continue the same spacing outward, and the
       tagline is centered in the A-E gap */
    function layout() {
        const gap = nameEl.getBoundingClientRect().height + 28;

        if (tagEl) {
            const h1a = nameEl.getBoundingClientRect();
            const h2a = tagEl.getBoundingClientRect();
            const curOffset = (h2a.top + h2a.height / 2) - (h1a.top + h1a.height / 2);
            const curMargin = parseFloat(getComputedStyle(tagEl).marginTop) || 0;
            /* A-E midpoint sits exactly one gap below the name's center */
            tagEl.style.marginTop = Math.round(curMargin + (gap - curOffset)) + 'px';
        }

        const h1R = nameEl.getBoundingClientRect();
        const wrapR = nameEl.parentElement.getBoundingClientRect();
        const offset = Math.abs((h1R.top + h1R.height / 2) - (wrapR.top + wrapR.height / 2));
        stringsSvg.style.height = Math.round(3 * gap + 2 * (offset + 30)) + 'px';

        const svgR = stringsSvg.getBoundingClientRect();
        W = stringsSvg.clientWidth || 900;
        H = Math.round(svgR.height) || 360;
        stringsSvg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        const fade = stringsSvg.querySelector('#string-fade');
        if (fade) fade.setAttribute('x2', W);

        const cy = (h1R.top + h1R.height / 2) - svgR.top;
        const ys = { G: cy - 1.5 * gap, D: cy - 0.5 * gap, A: cy + 0.5 * gap, E: cy + 1.5 * gap };
        strings.forEach(s => {
            s.y = Math.round(ys[s.note]);
            flatten(s);
            if (labels[s.note]) labels[s.note].setAttribute('y', s.y - 12);
        });
    }
    layout();
    window.addEventListener('resize', layout);
    window.addEventListener('load', layout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

    let rafActive = false;
    function tick(now) {
        let live = false;
        strings.forEach(s => {
            if (!s.amp) return;
            const t = (now - s.t0) / 1000;
            const env = s.amp * Math.exp(-2.8 * t);
            if (env < 0.3) {
                s.amp = 0;
                flatten(s);
                return;
            }
            const disp = env * Math.sin(2 * Math.PI * visHz[s.note] * t);
            s.el.setAttribute('d', `M0,${s.y} Q${s.cx},${s.y + disp} ${W},${s.y}`);
            live = true;
        });
        if (live) requestAnimationFrame(tick);
        else rafActive = false;
    }

    function pluck(s, strength, cx, sound) {
        s.amp = Math.min(30, Math.max(7, strength));
        s.t0 = performance.now();
        s.cx = Math.min(W * 0.9, Math.max(W * 0.1, cx));
        if (sound) {
            const label = labels[s.note];
            if (label) {
                label.classList.remove('pop');
                void label.getBoundingClientRect();
                label.classList.add('pop');
            }
            pluckSound(s.freq, Math.min(1, s.amp / 24));
        }
        if (!rafActive) {
            rafActive = true;
            requestAnimationFrame(tick);
        }
    }

    const anyPanelOpen = () =>
        ['about_container', 'work_container', 'art_container', 'contact_container'].some(isPanelOpen);

    /* pluck when the cursor crosses a string */
    let lastY = null;
    document.addEventListener('mousemove', e => {
        if (lastY !== null && !anyPanelOpen()) {
            const r = stringsSvg.getBoundingClientRect();
            if (e.clientX > r.left - 30 && e.clientX < r.right + 30) {
                strings.forEach(s => {
                    const sy = r.top + (s.y / H) * r.height;
                    if ((lastY - sy) * (e.clientY - sy) < 0) {
                        pluck(s, 6 + Math.abs(e.clientY - lastY) * 0.8, e.clientX - r.left, true);
                    }
                });
            }
        }
        lastY = e.clientY;
    });

    /* tap a string on touch screens */
    document.addEventListener('touchstart', e => {
        if (anyPanelOpen()) return;
        const t = e.touches[0];
        const r = stringsSvg.getBoundingClientRect();
        if (t.clientX < r.left || t.clientX > r.right || t.clientY < r.top - 20 || t.clientY > r.bottom + 20) return;
        audioReady();
        let best = null, bestDist = 1e9;
        strings.forEach(s => {
            const d = Math.abs(t.clientY - (r.top + (s.y / H) * r.height));
            if (d < bestDist) { bestDist = d; best = s; }
        });
        if (best && bestDist < 40) pluck(best, 16, t.clientX - r.left, true);
    }, { passive: true });

    /* strum all four on name hover / tap */
    let lastStrum = 0;
    function strum() {
        const now = performance.now();
        if (now - lastStrum < 1200) return;
        lastStrum = now;
        strings.forEach((s, i) =>
            setTimeout(() => pluck(s, 14, W * (0.35 + 0.1 * i), true), 30 + i * 110));
    }
    if (nameEl) {
        nameEl.addEventListener('mouseenter', strum);
        nameEl.addEventListener('pointerdown', () => { audioReady(); strum(); });
    }

    /* idle shimmer every few seconds */
    (function ambient() {
        setTimeout(() => {
            if (!document.hidden && !anyPanelOpen()) {
                const s = strings[Math.floor(Math.random() * strings.length)];
                pluck(s, 7, W * (0.3 + Math.random() * 0.4), false);
            }
            ambient();
        }, 5000 + Math.random() * 4000);
    })();
}

/* ─── Deep links (#about, #work, #art, #contact) ── */
const panelFns = { about: showabout, work: showwork, art: showart, contact: showcontact };
const hashPanel = location.hash.replace('#', '');
if (panelFns[hashPanel]) setTimeout(panelFns[hashPanel], 1700);

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