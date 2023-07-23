let canvas = document.querySelector("#canvas");
const body = document.querySelector("body");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let theColor= '';
let lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;
body.style.backgroundColor = "#ffffff";
// Canvas properties
const ctx = canvas.getContext("2d");
let theInput = document.querySelector("#favcolor");
theInput.addEventListener("input", function(){
    theColor = theInput.value;
    // canvas.style.backgroundColor = theColor;
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = theColor;
    ctx.fill();
}, false);

ctx.lineWidth = lineW;
document.querySelector("#ageInputId").oninput = function(){
    draw = null;
    lineW = document.querySelector("#ageInputId").value;
    document.getElementById("ageOutputId").innerHTML = lineW.length == 1 ? '0'+lineW : lineW;
    ctx.lineWidth = lineW;
};
let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);
clrs.forEach(clr =>{
    clr.addEventListener("click", ()=>{
        ctx.strokeStyle = clr.dataset.clr;
    });
});
let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () =>{
    let data = canvas.toDataURL("imag/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";
    a.click();
})
window.addEventListener("mousedown", (e) => draw = true);
window.addEventListener("mouseup", (e) => draw = false);
canvas.addEventListener("mousemove", (e)=>{
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX;
        prevY = e.clientY;
        return;
    }
    let currentX = e.clientX;
    let currentY = e.clientY;
    // console.log(prevX, prevY);
    // console.log(currentX, currentY);
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    prevX = currentX;
    prevY = currentY;
})
document.body.addEventListener("touchstart", (e) => draw = true);
document.body.addEventListener("touchend", (e) => draw = false);
document.body.addEventListener("touchmove", (e)=>{
    let touch = e.touches[0];
    if(prevX == null || prevY == null || !draw){
        prevX = touch.clientX;
        prevY = touch.clientY;
        return;
    }
    let currentX = touch.clientX;
    let currentY = touch.clientY;
    // console.log(prevX, prevY);
    // console.log(currentX, currentY);
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    prevX = currentX;
    prevY = currentY;
})


window.addEventListener('resize', ()=>{
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})
