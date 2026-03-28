let data = {}; // store all answers

// ------------------- SCREEN CONTROL -------------------
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    window.scrollTo(0,0); // mobile fix
}

function nextQ(next) {
    showScreen(next);
}

function saveAns(key, value, next) {
    data[key] = value;
    showScreen(next);
}

// ------------------- NAME INPUT -------------------
document.getElementById("q0Next").addEventListener("click", () => {
    const nameInput = document.getElementById("username");
    if (!nameInput.value.trim()) {
        alert("Please enter your name");
        return;
    }
    data.name = nameInput.value.trim();
    showScreen("q1");
});

// ------------------- RELATION INPUT -------------------
document.getElementById("q3Next").addEventListener("click", () => {
    const rel = document.getElementById("relation").value.trim();
    if (!rel) {
        alert("Please enter or select a relation");
        return;
    }
    data.relation = rel;
    showScreen("q4");
});

// ------------------- SUBMIT -------------------
function submitData() {
    let checks = document.querySelectorAll("input[type=checkbox]:checked");
    data.expect = Array.from(checks).map(c => c.value);

    // Send to Formspree
    fetch("https://formspree.io/f/xkopglpj", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    showScreen("end");
    startConfetti();
}

// ------------------- CONFETTI -------------------
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
            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fillStyle=`hsl(${Math.random()*360},100%,50%)`;
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;

            if(p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random()*canvas.width;
            }
        });
        requestAnimationFrame(draw);
    }

    draw();

    setTimeout(()=>{canvas.style.display="none";},5000);
}

// MATRIX INTRO
function startMatrixIntro(duration = 2000) {
    const matrixCanvas = document.getElementById("matrix");
    const mCtx = matrixCanvas.getContext("2d");
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const letters = "01";
    const fontSize = 14;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        mCtx.fillStyle = "rgba(0,0,0,0.05)";
        mCtx.fillRect(0,0,matrixCanvas.width,matrixCanvas.height);

        mCtx.fillStyle = "#0F0";
        mCtx.font = fontSize + "px monospace";

        for(let i=0; i<drops.length; i++) {
            const text = letters[Math.floor(Math.random()*letters.length)];
            mCtx.fillText(text, i*fontSize, drops[i]*fontSize);
            if(drops[i]*fontSize > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    const interval = setInterval(draw, 33);

    setTimeout(() => {
        clearInterval(interval);
        matrixCanvas.style.display = "none";
        showScreen("q0"); // show name input AFTER matrix intro
    }, duration);
}

// START MATRIX INTRO on page load
window.onload = () => {
    startMatrixIntro(2000); // 2 seconds
};
