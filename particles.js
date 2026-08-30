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

// ===== AIRPLANE + PETAL TRAIL =====

function createAirplane() {

    const airplane = document.createElement("div");
    airplane.className = "airplane";
    airplane.innerHTML = "✈️";

    airplane.style.top = (Math.random() * 55 + 10) + "%";

    document.body.appendChild(airplane);

    const petalTimer = setInterval(() => {

        const rect = airplane.getBoundingClientRect();

        if (rect.left > -50 && rect.left < window.innerWidth) {

            const petal = document.createElement("div");
            petal.className = "petal";
            petal.innerHTML = "🌸";

            petal.style.left = rect.left + "px";
            petal.style.top = (rect.top + 15) + "px";

            document.body.appendChild(petal);

            setTimeout(() => {
                petal.remove();
            }, 1800);
        }

    }, 180);

    setTimeout(() => {
        clearInterval(petalTimer);
        airplane.remove();
    }, 9000);
}


// First airplane
setTimeout(createAirplane, 3000);

// Every 6 seconds
setInterval(createAirplane, 6000);