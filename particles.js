const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let speedMultiplier = 1;

let particles = [];

for (let i = 0; i < 150; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5),
        speedY: (Math.random() - 0.5)
    });
}

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


// 🔥 Scroll Speed Effect
let scrollTimeout;

window.addEventListener("scroll", () => {
    speedMultiplier = 4; // scroll pe fast

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        speedMultiplier = 1; // normal speed
    }, 200);
});

window.addEventListener("scroll", function () {
  let scrollY = window.scrollY;
  pJSDom[0].pJS.particles.move.speed = 2 + scrollY * 0.01;
});


