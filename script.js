let revealObserver;

(async () => {
try {
    const lat = 12.5847, lon = -81.7006;
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=America%2FBogota`);
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const code = data.current.weather_code;

    const conditions = {
    0: ['Cielo despejado', '☀️'], 1: ['Mayormente despejado', '🌤️'], 2: ['Parcialmente nublado', '⛅'],
    3: ['Nublado', '☁️'], 45: ['Neblina', '🌫️'], 48: ['Neblina', '🌫️'],
    51: ['Llovizna ligera', '🌦️'], 53: ['Llovizna', '🌦️'], 55: ['Llovizna intensa', '🌧️'],
    61: ['Lluvia ligera', '🌦️'], 63: ['Lluvia', '🌧️'], 65: ['Lluvia intensa', '🌧️'],
    80: ['Chubascos', '🌦️'], 81: ['Chubascos', '🌧️'], 82: ['Chubascos fuertes', '⛈️'],
    95: ['Tormenta', '⛈️']
    };
    const [desc, emoji] = conditions[code] || ['Clima tropical', '🌤️'];

    document.getElementById('weather-text').textContent = `San Andrés ahora: ${temp}°C, ${desc}`;
    document.querySelector('.weather-emoji').textContent = emoji;

    const ctas = temp >= 26
    ? ['¡Ideal para la playa y el parasail! 🪂', '¡Perfecto para un paseo en lancha! 🚤']
    : ['¡Buen momento para recorrer la isla en mula! ⛳', '¡Aprovecha y explora San Andrés! 🏝️'];
    document.getElementById('weather-cta').textContent = ctas[Math.floor(Math.random() * ctas.length)];

    // Degradado de la barra según la temperatura
    const bar = document.getElementById('weather-bar');
    let gradient;
    if (temp < 24) {
        gradient = 'linear-gradient(90deg, #0B4C6E, #2E8FA8 55%, #7FD8E0 130%)'; // fresco — azules fríos
    } else if (temp < 28) {
        gradient = 'linear-gradient(90deg, #1F6B4A, #4FAE6D 55%, #C9E36B 130%)'; // agradable — verdes
    } else if (temp < 32) {
        gradient = 'linear-gradient(90deg, #C77B1F, #E8A93B 55%, #F2C94C 130%)'; // caluroso — dorados cálidos
    } else {
        gradient = 'linear-gradient(90deg, #B3301A, #E8562F 55%, #FF8A3D 130%)'; // muy caluroso — rojo-naranja intenso
    }
    bar.style.background = gradient;
    
} catch (e) {
    document.getElementById('weather-text').textContent = 'San Andrés, Isla · Clima tropical todo el año';
}
})();

const COUNTER_NAMESPACE = 'coco-explore-sai';
const COUNTER_KEY = 'turistas-atendidos';
const BASE_COUNT = 500;

(async () => {
try {
    const res = await fetch(`https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`);
    const data = await res.json();
    const total = (data && typeof data.value === 'number') ? data.value : 0;
    document.getElementById('tourist-count').textContent = (BASE_COUNT + total) + '+';
} catch (e) { /* si falla, se queda el número base */ }
})();

document.querySelectorAll('.wa-reserve-btn').forEach(btn => {
btn.addEventListener('click', () => {
    fetch(`https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`)
    .then(r => r.json())
    .then(data => {
        if (data && typeof data.value === 'number') {
        document.getElementById('tourist-count').textContent = (BASE_COUNT + data.value) + '+';
        }
    })
    .catch(() => {});
});
});

function mostrarContacto(){
    document.getElementById("contactModal").style.display = "flex";
}

function cerrarModal(){
    document.getElementById("contactModal").style.display = "none";
}

function abrirWhatsApp() {

    const telefono = "573005940627";

    const mensaje =
`¡Hola! Vengo de parte de la página web de Coco Explore SAI.

Me gustaría recibir más información sobre sus servicios y conocer la disponibilidad.

¡Muchas gracias!

*Comisión para: Laura Rivera*`

;

    window.open(
        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
        "_blank"
    );
}

function irFormulario(){
    cerrarModal();
    document.getElementById("contacto").scrollIntoView({
        behavior:"smooth"
    });
}

function toggleFaq(btn){
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}

/* ===== GALERIA / FOTOS: slider de una imagen a la vez con flechas, puntos y autoplay ===== */
(() => {
    const track = document.getElementById('galTrack');
    if (!track) return;
    const slides = Array.from(track.children);
    const total = slides.length;
    const dotsWrap = document.getElementById('galDots');
    const leftArrow = document.getElementById('galArrowLeft');
    const rightArrow = document.getElementById('galArrowRight');
    let idx = 0;
    let timer = null;
    const AUTO_MS = 5000;

    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i, true));
        dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
        track.style.transform = `translateX(-${idx * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    function goTo(i, manual) {
        idx = (i + total) % total;
        render();
        if (manual) restartAutoplay();
    }
    function next() { goTo(idx + 1); }
    function restartAutoplay() {
        clearInterval(timer);
        timer = setInterval(next, AUTO_MS);
    }

    leftArrow.addEventListener('click', () => goTo(idx - 1, true));
    rightArrow.addEventListener('click', () => goTo(idx + 1, true));
    restartAutoplay();
})();


const activityData = [
   {
    img: 'data/Descubre/NadaMantaraya.png',
    title: 'Nadar entre rayas',
    desc: 'Vive una experiencia inolvidable nadando junto a mantarrayas en aguas cristalinas del mar de los siete colores. Una actividad segura y perfecta para conectar con la vida marina del Caribe.'
},
{
    img: 'data/Descubre/Mar7Colores.jpg',
    title: 'Mar de los siete colores',
    desc: 'Descubre el famoso mar Caribe de San Andrés, reconocido por sus impresionantes tonalidades de azul y turquesa que cambian con la profundidad y la luz del sol.'
},
{
    img: 'data/Descubre/JardinBotanico.png',
    title: 'Jardín Botánico',
    desc: 'Recorre senderos rodeados de vegetación nativa y conoce la biodiversidad de San Andrés mientras disfrutas de vistas panorámicas y aprendes sobre la flora de la isla.'
},
{
    img: 'data/Descubre/cayocangrejo.png',
    title: 'Cayo Cangrejo',
    desc: 'Las deliciosas empanadas de cangrejo que se venden en Cayo Cangrejo son razón suficiente para llegar a este lugar de Providencia, donde también podrás rodear el islote nadando y disfrutar panorámicas inolvidables del Caribe.'
},
{
    img: 'data/Descubre/bahia_manzanillo.png',
    title: 'Bahía de Manzanillo',
    desc: 'Una playa tranquila de aguas poco profundas, perfecta para descansar en familia, disfrutar del paisaje y relajarte lejos de las zonas más concurridas.'
},
{
    img: 'data/Descubre/laguna-big-pond.png',
    title: 'Laguna Big Pond',
    desc: 'Explora esta reserva natural rodeada de vegetación donde podrás observar caimanes, aves y otras especies propias del ecosistema de San Andrés.'
},
{
    img: 'data/Descubre/OldPointMangrove.png',
    title: 'Parque Regional de Manglar Old Point',
    desc: 'Recorre los manglares en kayak o lancha y descubre uno de los ecosistemas más importantes del archipiélago, hogar de aves, peces y especies nativas.'
},
{
    img: 'data/Descubre/old-providence.png',
    title: 'Parque Nacional Natural Old Providence',
    desc: 'Conoce una de las áreas protegidas más importantes del Caribe colombiano, donde se conservan arrecifes, bosques y una extraordinaria biodiversidad.'
},
{
    img: 'data/Descubre/Playa-de-San-Luis-San-Andres-Colombia.png',
    title: 'Playas de San Luis',
    desc: 'Relájate en playas de arena blanca y mar tranquilo, ideales para nadar, descansar y disfrutar de un ambiente mucho más calmado que el centro de la isla.'
},
{
    img: 'data/Descubre/iglesiaLALOMA.png',
    title: 'Iglesia Bautista La Loma',
    desc: 'Visita la iglesia más antigua de San Andrés y disfruta de uno de los mejores miradores naturales, desde donde podrás apreciar gran parte de la isla.'
},
{
    img: 'data/Descubre/GREENMOONFESTIVAL.png',
    title: 'Festival Green Moon',
    desc: 'Vive el evento cultural más importante del archipiélago, una celebración llena de música caribeña, gastronomía, danza y tradiciones del pueblo raizal.'
},
{
    img: 'data/Descubre/BahiaSuroeste.png',
    title: 'Bahía del Suroeste',
    desc: 'Uno de los lugares favoritos para contemplar el atardecer mientras disfrutas de la tranquilidad y las impresionantes vistas del mar Caribe.'
},
{
    img: 'data/Descubre/Puente-de-los-enamorados.jpg',
    title: 'Puente de los Enamorados',
    desc: 'Un icónico puente de madera ideal para caminar, tomar fotografías y contemplar el paisaje del mar de los siete colores en cualquier momento del día.'
},
{
    img: 'data/Descubre/CayoBolivar.png',
    title: 'Cayo Bolívar',
    desc: 'Un pequeño paraíso rodeado por aguas completamente cristalinas, perfecto para excursiones en lancha, snorkel y disfrutar de playas prácticamente vírgenes.'
},
{
    img: 'data/Descubre/PlayasProvidencia.png',
    title: 'Playas de Providencia',
    desc: 'Disfruta de playas de arena blanca y aguas turquesas en un entorno mucho más tranquilo, ideal para quienes buscan naturaleza y descanso.'
},
{
    img: 'data/Descubre/JohnnyCay.png',
    title: 'Johnny Cay',
    desc: 'El islote más famoso de San Andrés, conocido por sus cocoteros, playas de arena blanca, gastronomía típica y ambiente caribeño.'
},
{
    img: 'data/Descubre/Navega-en-san-andres.png',
    title: 'Navegar en San Andrés',
    desc: 'Recorre la isla en velero o catamarán mientras disfrutas de las increíbles tonalidades del Caribe y de paisajes inolvidables.'
},
{
    img: 'data/Descubre/Buceo.png',
    title: 'Buceo en San Andrés',
    desc: 'Explora arrecifes de coral, peces tropicales y barcos hundidos en uno de los destinos de buceo más reconocidos del Caribe colombiano.'
},
{
    img: 'data/Descubre/BuceoProvidencia.png',
    title: 'Buceo en Providencia',
    desc: 'Descubre arrecifes coralinos prácticamente intactos y una gran diversidad de especies marinas en aguas de excelente visibilidad.'
},
{
    img: 'data/Descubre/Posadanativa.png',
    title: 'Posadas Nativas',
    desc: 'Hospédate con familias locales y vive una experiencia auténtica, conociendo de cerca la cultura, gastronomía y hospitalidad raizal.'
},
{
    img: 'data/Descubre/BanderaAzul.png',
    title: 'Playas Bandera Azul',
    desc: 'Disfruta playas reconocidas internacionalmente por su excelente calidad ambiental, limpieza, seguridad y compromiso con la sostenibilidad.'
},
{
    img: 'data/Descubre/Parasail.png',
    title: 'Parasail',
    desc: 'Vuela sobre el mar de los siete colores y disfruta de una vista panorámica única de San Andrés en una experiencia llena de adrenalina.'
},
{
    img: 'data/Descubre/Snorkel.png',
    title: 'Snorkel',
    desc: 'Nada entre peces tropicales y arrecifes de coral en aguas poco profundas, una actividad perfecta para todas las edades.'
},
{
    img: 'data/Descubre/WestView.png',
    title: 'West View',
    desc: 'Uno de los lugares más populares para nadar, hacer snorkel y lanzarse al mar desde plataformas naturales rodeadas de aguas cristalinas.'
},
{
    img: 'data/Descubre/LaPiscinita.png',
    title: 'La Piscinita',
    desc: 'Una piscina natural famosa por la transparencia del agua y la gran cantidad de peces de colores que pueden observarse muy cerca de la costa.'
},
{
    img: 'data/Descubre/hoyo-soplador.png',
    title: 'Hoyo Soplador',
    desc: 'Contempla este fenómeno natural donde el mar expulsa chorros de agua a presión entre las rocas cuando las olas golpean con fuerza.'
},
{
    img: 'data/Descubre/rocky.png',
    title: 'Rocky Cay',
    desc: 'Camina sobre el mar hasta este pequeño islote y visita el famoso barco encallado, uno de los paisajes más fotografiados de San Andrés.'
},
{
    img: 'data/Descubre/Tour.png',
    title: 'Tour Bahía',
    desc: 'Disfruta un recorrido en lancha por los principales cayos y playas de San Andrés mientras conoces los lugares más emblemáticos de la isla.'
},
{
    img: 'data/Descubre/PaddleBoard.png',
    title: 'Paddle Board',
    desc: 'Deslízate sobre las tranquilas aguas del Caribe practicando paddle board, una actividad ideal para disfrutar del paisaje y el mar.'
},
{
    img: 'data/Descubre/PescaDeportiva.png',
    title: 'Pesca Deportiva',
    desc: 'Vive la emoción de pescar en aguas profundas del Caribe colombiano acompañado por guías expertos y embarcaciones completamente equipadas.'
}
];

const ACTIVITY_INITIAL = 8;
const ACTIVITY_STEP = 4;
const ACTIVITY_MAX_CLICKS = 6;
let activityVisible = ACTIVITY_INITIAL;
let activityClicks = 0;


function renderActivities(){
    const grid = document.getElementById('activityGrid');
    if (!grid) return;
    grid.innerHTML = '';
    activityData.slice(0, activityVisible).forEach((a, i) => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        card.addEventListener('click', () => abrirActividad(i));

        const visual = a.img
            ? `<img src="${a.img}" alt="${a.title}" class="activity-card-photo" loading="lazy">`
            : `<div class="activity-card-icon">${a.icon}</div>`;

        card.innerHTML = `
            ${visual}
            <div class="activity-card-overlay">
                <div class="activity-card-title">${a.title}</div>
            </div>
        `;
        grid.appendChild(card);
    });
    updateLoadMoreButton();
    observeReveal();
}

function updateLoadMoreButton(){
    const btn = document.getElementById('loadMoreBtn');
    if (!btn) return;
    const reachedMaxClicks = activityClicks >= ACTIVITY_MAX_CLICKS;
    const reachedAllItems = activityVisible >= activityData.length;
    btn.style.display = (reachedMaxClicks || reachedAllItems) ? 'none' : 'inline-block';
}

const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        activityVisible = Math.min(activityVisible + ACTIVITY_STEP, activityData.length);
        activityClicks++;
        renderActivities();
    });
}

renderActivities();

function abrirActividad(i){
    const a = activityData[i];
    const visual = document.getElementById('activityModalVisual');
    if (a.img) {
        visual.innerHTML = `<img src="${a.img}" alt="${a.title}" style="width:100%;height:100%;object-fit:cover;">`;
    } else {
        visual.innerHTML = '';
        visual.textContent = a.icon;
    }
    document.getElementById('activityModalTitle').textContent = a.title;
    document.getElementById('activityModalDesc').textContent = a.desc;
    document.getElementById('activityModal').style.display = 'flex';
}


function cerrarActividad(){
    document.getElementById('activityModal').style.display = 'none';
}

/* ============================================================
   MENÚ QUE SE OCULTA AL BAJAR Y REAPARECE AL SUBIR
   (un solo bloque — antes estaba duplicado)
   ============================================================ */
(() => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    let lastScroll = window.scrollY;
    let ticking = false;
    const HIDE_AFTER = 80; // px antes de empezar a ocultar (evita parpadeo cerca del tope)

    function onScroll(){
        const current = window.scrollY;
        // Un pequeño detalle extra: sombra cuando ya no estamos arriba del todo
        nav.classList.toggle('nav-scrolled', current > 12);

        if (current > lastScroll && current > HIDE_AFTER) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        lastScroll = current;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    });
})();

/* ============================================================
   MENÚ HAMBURGUESA (móvil)
   ============================================================ */
(() => {
    const burger = document.getElementById('navBurger');
    const menu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('mobileMenuBackdrop');
    if (!burger || !menu || !backdrop) return;

    function openMenu(){
        menu.classList.add('open');
        backdrop.classList.add('open');
        burger.classList.add('active');
        burger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu(){
        menu.classList.remove('open');
        backdrop.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    burger.addEventListener('click', () => {
        if (menu.classList.contains('open')) closeMenu();
        else openMenu();
    });
    backdrop.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
})();

/* ============================================================
   CERRAR MODALES HACIENDO CLIC AFUERA O CON ESCAPE
   ============================================================ */
(() => {
    function closeAnyOpenModal(){
        document.querySelectorAll('.modal').forEach(m => {
            if (m.style.display === 'flex') m.style.display = 'none';
        });
    }

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            // Si el clic fue directamente sobre el fondo oscuro (no sobre la tarjeta interna), cierra
            if (e.target === modal) modal.style.display = 'none';
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAnyOpenModal();
    });
})();

/* ============================================================
   ANIMACIONES DE ENTRADA AL HACER SCROLL (Intersection Observer)
   ============================================================ */
function observeReveal(){
    if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
    }
    document.querySelectorAll('.reveal:not(.in-view), .reveal-stagger:not(.in-view)').forEach(el => {
        revealObserver.observe(el);
    });
}

function initRevealTargets(){
    // Marca automáticamente las secciones y grids principales para animarlos al entrar en pantalla
    document.querySelectorAll('.section-head').forEach(el => el.classList.add('reveal'));
    document.querySelectorAll('.problems-grid-v2, .bento-wrap, .gallery-carousel, .steps-row, .activity-grid, .partners-row, .faq-list, .contact-section')
        .forEach(el => el.classList.add('reveal-stagger'));
    observeReveal();
}

document.addEventListener('DOMContentLoaded', initRevealTargets);
if (document.readyState !== 'loading') initRevealTargets();

/* ===== CONTADOR ANIMADO DE LOS NÚMEROS DEL HERO ===== */
function animateStat(el){
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 4500;
    const start = performance.now();

    function step(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out, empieza rápido y frena al final
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
}

const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-num[data-target]').forEach(animateStat);
            heroStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const heroStatsEl = document.querySelector('.hero-stats');
if (heroStatsEl) heroStatsObserver.observe(heroStatsEl);