// ---------- Theme toggle ----------
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// ---------- Mobile nav ----------
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ---------- Nav border on scroll ----------
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ---------- Toggle buttons ----------
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        const isExpanded = btn.classList.toggle('expanded');
        const textEl = btn.querySelector('.toggle-text');
        if (target === 'news') {
            document.querySelectorAll('.news-hidden').forEach(el => {
                el.style.display = isExpanded ? 'flex' : 'none';
            });
            textEl.textContent = isExpanded ? 'Show less' : 'Show more';
        } else if (target === 'publications') {
            document.querySelectorAll('.pub-hidden').forEach(el => {
                el.style.display = isExpanded ? 'block' : 'none';
            });
            textEl.textContent = isExpanded ? 'Show fewer' : 'Show all publications';
        }
    });
});

// ---------- Scroll animations ----------
window.addEventListener('DOMContentLoaded', () => {
    // Hero entrance
    const hero = document.querySelector('.about-section');
    if (hero) {
        hero.classList.add('hero-animate');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                hero.classList.add('hero-visible');
            });
        });
    }

    // Section fade-in on scroll
    const animateEls = document.querySelectorAll('.animate-in');
    if (animateEls.length && 'IntersectionObserver' in window) {
        setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => entry.target.classList.add('visible'), i * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
            animateEls.forEach(el => observer.observe(el));
        }, 150);
    }
});

// ==========================================================================
// Snowflake Animation — 雪飞 (snow flying)
// Gentle drifting snowflakes behind the hero section.
// ==========================================================================

(function () {
    const canvas = document.getElementById('snowflake-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Teal palette for snowflakes
    const FLAKE_COLORS = [
        { r: 6, g: 138, b: 161 },   // main teal
        { r: 6, g: 161, b: 138 },   // warm teal
        { r: 6, g: 114, b: 161 },   // cool teal
        { r: 11, g: 188, b: 217 },  // bright cyan
        { r: 4, g: 93, b: 110 },    // deep teal
    ];

    const CONFIG = {
        count: 22,
        minSize: 4,
        maxSize: 14,
        fallSpeed: 0.3,
        driftSpeed: 0.15,
        rotateSpeed: 0.003,
        mouseRadius: 120,
        mouseForce: 0.015,
    };

    let flakes = [];
    let mouse = { x: -9999, y: -9999 };
    let width, height;
    let time = 0;

    function resize() {
        const section = canvas.parentElement;
        const rect = section.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width + 200;
        height = rect.height + 120;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createFlakes() {
        flakes = [];
        for (let i = 0; i < CONFIG.count; i++) {
            flakes.push(makeFlake(true));
        }
    }

    function makeFlake(randomY) {
        const color = FLAKE_COLORS[Math.floor(Math.random() * FLAKE_COLORS.length)];
        const size = CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize);
        // Smaller flakes are more transparent (depth effect)
        const sizeRatio = (size - CONFIG.minSize) / (CONFIG.maxSize - CONFIG.minSize);
        const opacity = 0.22 + sizeRatio * 0.32;
        const branches = Math.random() > 0.4 ? 6 : 4;
        return {
            x: Math.random() * width,
            y: randomY ? Math.random() * height : -20 - Math.random() * 60,
            size,
            opacity,
            color,
            branches,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * CONFIG.rotateSpeed * 2,
            phase: Math.random() * Math.PI * 2,
            fallMul: 0.5 + Math.random() * 0.8,
            driftMul: 0.5 + Math.random(),
            // Sub-branch detail level (0 = simple, 1 = detailed)
            detail: Math.random(),
        };
    }

    // Draw a single snowflake crystal
    function drawFlake(f) {
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation);
        ctx.strokeStyle = `rgba(${f.color.r},${f.color.g},${f.color.b},${f.opacity})`;
        ctx.lineWidth = f.size > 9 ? 1.2 : 0.8;
        ctx.lineCap = 'round';

        const r = f.size;
        const n = f.branches;

        for (let i = 0; i < n; i++) {
            const angle = (Math.PI * 2 / n) * i;
            ctx.save();
            ctx.rotate(angle);

            // Main arm
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(r, 0);
            ctx.stroke();

            // Sub-branches (only on larger / more detailed flakes)
            if (f.detail > 0.3) {
                const bLen = r * 0.35;
                const bPos = r * 0.55;
                ctx.beginPath();
                ctx.moveTo(bPos, 0);
                ctx.lineTo(bPos + bLen * Math.cos(Math.PI / 4), -bLen * Math.sin(Math.PI / 4));
                ctx.moveTo(bPos, 0);
                ctx.lineTo(bPos + bLen * Math.cos(Math.PI / 4), bLen * Math.sin(Math.PI / 4));
                ctx.stroke();
            }

            // Tiny tip branches on detailed flakes
            if (f.detail > 0.65) {
                const tLen = r * 0.2;
                const tPos = r * 0.82;
                ctx.beginPath();
                ctx.moveTo(tPos, 0);
                ctx.lineTo(tPos + tLen * Math.cos(Math.PI / 5), -tLen * Math.sin(Math.PI / 5));
                ctx.moveTo(tPos, 0);
                ctx.lineTo(tPos + tLen * Math.cos(Math.PI / 5), tLen * Math.sin(Math.PI / 5));
                ctx.stroke();
            }

            ctx.restore();
        }

        // Center dot
        ctx.fillStyle = `rgba(${f.color.r},${f.color.g},${f.color.b},${f.opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(0, 0, f.size > 9 ? 1.5 : 1, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    function update() {
        time += 0.01;

        for (let i = 0; i < flakes.length; i++) {
            const f = flakes[i];

            // Gentle fall + horizontal drift
            f.y += CONFIG.fallSpeed * f.fallMul;
            f.x += Math.sin(time + f.phase) * CONFIG.driftSpeed * f.driftMul;
            f.rotation += f.rotSpeed;

            // Mouse interaction — gentle push away
            const dx = f.x - mouse.x;
            const dy = f.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONFIG.mouseRadius && dist > 0) {
                const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseForce;
                f.x += (dx / dist) * force * 3;
                f.y += (dy / dist) * force * 3;
            }

            // Reset when fallen past bottom
            if (f.y > height + 30) {
                flakes[i] = makeFlake(false);
            }
            // Wrap horizontal
            if (f.x < -30) f.x = width + 30;
            if (f.x > width + 30) f.x = -30;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (const f of flakes) {
            drawFlake(f);
        }
    }

    function animate() {
        update();
        draw();
        requestAnimationFrame(animate);
    }

    function handleMouse(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left + 100;
        mouse.y = e.clientY - rect.top + 60;
    }

    function init() {
        resize();
        createFlakes();
        animate();
        setTimeout(() => canvas.classList.add('loaded'), 300);

        window.addEventListener('resize', () => {
            resize();
            for (const f of flakes) {
                if (f.x > width) f.x = Math.random() * width;
                if (f.y > height) f.y = Math.random() * height;
            }
        });

        canvas.parentElement.addEventListener('mousemove', handleMouse, { passive: true });
        canvas.parentElement.addEventListener('mouseleave', () => {
            mouse.x = -9999;
            mouse.y = -9999;
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
