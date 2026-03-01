const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let speedMultiplier = 1;
let particles = [];

/* 🎯 Create Particles */
for (let i = 0; i < 120; i++) {
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

  Scroll Speed Effect (Smooth)
let scrollTimeout;

window.addEventListener("scroll", () => {
    speedMultiplier = 2;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        speedMultiplier = 1;
    }, 200);
});

/* 📱 Resize Fix */
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


