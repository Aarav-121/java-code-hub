let data = {};

// SCREEN CONTROL
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// NEXT QUESTION
function nextQ(next) {
    showScreen(next);
}

// SAVE ANSWER
function saveAns(key, value, next) {
    data[key] = value;
    showScreen(next);
}

// SAVE INPUT
function saveInput(id, next) {
    let value = document.getElementById(id).value;

    if (!value) {
        alert("Please enter something 😊");
        return;
    }

    data[id] = value;
    showScreen(next);
}


// SUBMIT
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

// CONFETTI 🎉
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    let pieces = Array.from({length:150},()=>({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*6+3,
        dx:(Math.random()-0.5)*2,
        dy:Math.random()*3+2
    }));

    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        pieces.forEach(p=>{
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fillStyle=`hsl(${Math.random()*360},100%,50%)`;
            ctx.fill();

            p.x+=p.dx;
            p.y+=p.dy;

            if(p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random()*canvas.width;
            }
        });

        requestAnimationFrame(draw);
    }

    draw();

    setTimeout(()=>{
        canvas.style.display="none";
    },5000);
}
