// script.js

let data = {};

// SCREEN CONTROL
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const screen = document.getElementById(id);
    screen.classList.add("active");
    // Scroll to top on mobile so the question is visible
    window.scrollTo(0,0);
}

// NEXT QUESTION (yes/no)
function nextQ(next) {
    showScreen(next);
    // Save name and move to first question
document.getElementById("q0Next").addEventListener("click", () => {
    const nameInput = document.getElementById("username");
    if (!nameInput.value.trim()) {
        alert("Please enter your name");
        return;
    }
    data.name = nameInput.value.trim();  // save in data object
    showScreen("q1");  // move to the first question
});
}

// SAVE ANSWER (yes/no)
function saveAns(key, value, next) {
    data[key] = value;
    showScreen(next);
}

// SAVE INPUT (for Q3)
function saveInput(id, next) {
    const input = document.getElementById(id);
    if (!input.value) {
        alert("Please enter a value");
        return;
    }
    data[id] = input.value;
    showScreen(next);
}

// MATRIX RAIN INTRO
function startMatrixIntro() {
    document.getElementById("start").classList.remove("active");

    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%".split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const interval = setInterval(draw, 33);

    setTimeout(() => {
        clearInterval(interval);
        canvas.style.display = "none";
        showScreen("q0");
    }, 3000);
}

// SUBMIT DATA
function submitData() {
    const checks = document.querySelectorAll("#q5 input[type=checkbox]:checked");
    data.expect = Array.from(checks).map(c => c.value);

    // Send to Formspree
    fetch("https://formspree.io/f/xkopglpj", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).catch(err => console.log("Form submission failed", err));

    showScreen("end");
    startConfetti();
}

// CONFETTI
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    const pieces = Array.from({ length: 150 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 6 + 3,
        dx: (Math.random() - 0.5) * 2,
        dy: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360},100%,50%)`
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(draw);
    }

    draw();

    setTimeout(() => { canvas.style.display = "none"; }, 5000);
}

// ATTACH BUTTONS AFTER DOM LOAD
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startBtn").addEventListener("click", startMatrixIntro);
    document.getElementById("q3Next").addEventListener("click", () => saveInput('relation','q4'));
});
