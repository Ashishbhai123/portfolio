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

// ===== AIRPLANE + PETAL EFFECT =====

function createAirplane() {

    const airplane = document.createElement("div");

    airplane.innerHTML = "✈";
    airplane.style.position = "fixed";
    airplane.style.left = "-70px";
    airplane.style.top = (Math.random() * 45 + 15) + "vh";
    airplane.style.fontSize = "34px";
    airplane.style.zIndex = "9998";
    airplane.style.pointerEvents = "none";
    airplane.style.display = "block";
    airplane.style.opacity = "1";

    document.body.appendChild(airplane);

    let x = -70;
    const speed = 3.5;

    const fly = setInterval(() => {

        x += speed;
        airplane.style.left = x + "px";

        // 🌸 Petal trail
        if (Math.random() < 0.45) {

            const petal = document.createElement("div");

            petal.innerHTML = "🌸";

            petal.style.position = "fixed";
            petal.style.left = (x - 5) + "px";
            petal.style.top =
                (parseFloat(airplane.style.top) + 3) + "vh";

            petal.style.fontSize = "13px";
            petal.style.zIndex = "9997";
            petal.style.pointerEvents = "none";
            petal.style.opacity = "0.8";

            document.body.appendChild(petal);

            let petalY = 0;
            let petalX = x - 5;
            let opacity = 0.8;

            const fall = setInterval(() => {

                petalY += 1;
                petalX -= 0.5;
                opacity -= 0.025;

                petal.style.left = petalX + "px";
                petal.style.transform =
                    `translateY(${petalY}px) rotate(${petalY * 4}deg)`;
                petal.style.opacity = opacity;

                if (opacity <= 0) {
                    clearInterval(fall);
                    petal.remove();
                }

            }, 40);
        }

        // Screen cross karne ke baad remove
        if (x > window.innerWidth + 100) {
            clearInterval(fly);
            airplane.remove();
        }

    }, 16);
}


// ✈️ First airplane
setTimeout(createAirplane, 2000);


// ✈️ Every 6 seconds
setInterval(createAirplane, 6000);