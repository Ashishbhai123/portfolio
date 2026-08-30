const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let speedMultiplier = 1;
let particles = [];

/* 🎯 Create Particles */
for (let i = 0; i < 120; i++) {   // thoda kam count (smooth)
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,   // normal size
        speedX: (Math.random() - 0.5) * 0.4, // slow movement
        speedY: (Math.random() - 0.5) * 0.4
    });
}

/* 🎬 Animation */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        ctx.fillStyle = "#9dbdff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX * speedMultiplier;
        p.y += p.speedY * speedMultiplier;

        if (p.x > canvas.width || p.x < 0) p.speedX *= -1;
        if (p.y > canvas.height || p.y < 0) p.speedY *= -1;
    });

    requestAnimationFrame(animate);
}

animate();

/* 🔥 Scroll Speed Effect (Smooth) */
let scrollTimeout;

window.addEventListener("scroll", () => {
    speedMultiplier = 2;  // scroll pe thoda fast

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        speedMultiplier = 1;  // back to normal slow
    }, 200);
});

/* 📱 Resize Fix */
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== CURSOR GLOW EFFECT =====

const cursorGlow = document.createElement("div");
cursorGlow.className = "cursor-glow";
document.body.appendChild(cursorGlow);

let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursorGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    cursorGlow.style.transform =
        `translate(${glowX - 150}px, ${glowY - 150}px)`;

    requestAnimationFrame(animateCursorGlow);
}

animateCursorGlow();

// ===== 3D FLOATING PETALS =====

function createPetal() {

    const petal = document.createElement("div");

    petal.innerHTML = "🌸";
    petal.className = "floating-petal";

    // Random starting position
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.top = "-40px";

    // Random size
    const size = Math.random() * 12 + 10;
    petal.style.fontSize = size + "px";

    // Random depth / blur
    const depth = Math.random();

    if (depth < 0.3) {
        petal.style.filter = "blur(2px)";
        petal.style.opacity = "0.35";
    } else if (depth < 0.6) {
        petal.style.filter = "blur(1px)";
        petal.style.opacity = "0.55";
    } else {
        petal.style.opacity = "0.8";
    }

    document.body.appendChild(petal);

    // Random movement
    const duration = Math.random() * 5000 + 7000;
    const drift = (Math.random() - 0.5) * 350;
    const rotate = Math.random() * 720 - 360;

    petal.animate(
        [
            {
                transform:
                    "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)"
            },
            {
                transform:
                    `translate3d(${drift}px, 110vh, 0)
                     rotateX(${rotate}deg)
                     rotateY(${rotate}deg)
                     rotateZ(${rotate}deg)`
            }
        ],
        {
            duration: duration,
            easing: "ease-in-out",
            iterations: 1
        }
    );

    setTimeout(() => {
        petal.remove();
    }, duration);
}


// 🌸 Start slowly
setTimeout(createPetal, 2000);

// 🌸 New petal every 1.2 seconds
setInterval(createPetal, 1200);