let data = {};

// SHOW SCREEN
function showScreen(id){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// SAVE NAME
function saveName() {
    const nameInput = document.getElementById("username");
    if(!nameInput.value.trim()){
        alert("Please enter your name");
        return;
    }
    data.name = nameInput.value.trim();
    showScreen("q1");
}

// SAVE ANSWER BUTTON
function saveAns(key, value, next){
    data[key] = value;
    showScreen(next);
}

// SAVE INPUT FIELD
function saveInput(id, next){
    const val = document.getElementById(id).value.trim();
    if(!val){
        alert("Please fill this field");
        return;
    }
    data[id] = val;
    showScreen(next);
}

// MATRIX INTRO
function startMatrixIntro(duration=2000){
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    const letters = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(()=>{
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#0F0";
        ctx.font = fontSize+"px monospace";

        for(let i=0;i<drops.length;i++){
            const text = letters[Math.floor(Math.random()*letters.length)];
            ctx.fillText(text,i*fontSize,drops[i]*fontSize);
            if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    },33);

    // STOP MATRIX AFTER DURATION
    setTimeout(()=>{
        clearInterval(interval);
        canvas.style.display = "none";
        showScreen("q0"); // show name input after matrix
    }, duration);
}

// CONFETTI (example, triggers later)
function startConfetti(){
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    const pieces = Array.from({length:150},()=>({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*6+3,
        dx: (Math.random()-0.5)*2,
        dy: Math.random()*3+2
    }));

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        pieces.forEach(p=>{
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fillStyle = `hsl(${Math.random()*360},100%,50%)`;
            ctx.fill();
            p.x+=p.dx;
            p.y+=p.dy;
            if(p.y>canvas.height){ p.y=0; p.x=Math.random()*canvas.width; }
        });
        requestAnimationFrame(draw);
    }
    draw();

    setTimeout(()=>{canvas.style.display="none";},5000);
}

// START MATRIX INTRO ON PAGE LOAD
window.onload = () => {
    startMatrixIntro(3000); // 5 sec intro
}
