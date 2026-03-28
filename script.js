let data = {};

// SHOW SCREEN
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// MATRIX INTRO BEFORE FIRST QUESTION
function startMatrixIntro() {
    document.getElementById("start").classList.remove("active");

    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    const letters = "01".split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    const interval = setInterval(draw, 33);

    // Stop after 3 seconds and show first question
    setTimeout(() => {
        clearInterval(interval);
        canvas.style.display = "none";
        showScreen("q1"); // show first question
    }, 3000);
}
document.getElementById("startBtn").addEventListener("click", startMatrixIntro);
// SAVE INPUT FIELD
function saveInput(id, next) {
    let value = document.getElementById(id).value.trim();
    if (!value) {
        alert("Please enter a value 😊");
        return;
    }
    data[id] = value;
    showScreen(next);
}

// SUBMIT DATA
function submitData() {
    // CHECKBOX VALUES
    let checks = document.querySelectorAll("input[type=checkbox]:checked");
    data.expect = Array.from(checks).map(c => c.value);

    // SEND TO FORMSPREE
    fetch("https://formspree.io/f/xkopglpj", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    showScreen("end");
    startConfetti();
}

// CONFETTI ANIMATION
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    let pieces = Array.from({length:150},() => ({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*6+3,
        dx: (Math.random()-0.5)*2,
        dy: Math.random()*3+2
    }));

    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        pieces.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
            ctx.fillStyle = `hsl(${Math.random()*360},100%,50%)`;
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;

            if(p.y > canvas.height){
                p.y = 0;
                p.x = Math.random()*canvas.width;
            }
        });
        requestAnimationFrame(draw);
    }
    draw();

    setTimeout(() => { canvas.style.display="none"; }, 5000);
}
