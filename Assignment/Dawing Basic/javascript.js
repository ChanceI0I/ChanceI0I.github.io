let cnv = document.getElementById("draw");
let ctx = cnv.getContext("2d");
let rectX = 250;
let rectY = 150;
let rectSize = 80;
let speed = 3;
cnv.width = 900;
cnv.height = 500;

let moveupkey = false;
let movedownkey = false;
let moveleftkey = false;
let moverightkey = false;

document.getElementById("apply").addEventListener("click", change_speed)

//move function
requestAnimationFrame(move)
function move() {
    
    document.getElementById("apply_size").addEventListener("click", change_size);

    // move up
    document.addEventListener("keydown",keyuphandler)
    function keyuphandler(event) {
        if (event.code == "KeyW") {
            moveupkey = true;
        }
    }
    document.addEventListener("keyup",keyuphandler_up)
    function keyuphandler_up(event) {
        if (event.code == "KeyW") {
            moveupkey = false;
        }
    }

    // move down
    document.addEventListener("keydown",keydownhandler)
    function keydownhandler(event) {
        if (event.code == "KeyS") {
            movedownkey = true;
        }
    }
    document.addEventListener("keyup",keydownhandler_up)
    function keydownhandler_up(event) {
        if (event.code == "KeyS") {
            movedownkey = false;
        }
    }

    // move right
    document.addEventListener("keydown",keyrighthandler)
    function keyrighthandler(event) {
        if (event.code == "KeyD") {
            moverightkey = true;
        }
    }
    document.addEventListener("keyup",keyrighthandler_up)
    function keyrighthandler_up(event) {
        if (event.code == "KeyD") {
            moverightkey = false;
        }
    }

    // move left
    document.addEventListener("keydown",keylefthandler)
    function keylefthandler(event) {
        if (event.code == "KeyA") {
            moveleftkey = true;
        }
    }
    document.addEventListener("keyup",keylefthandler_up)
    function keylefthandler_up(event) {
        if (event.code == "KeyA") {
            moveleftkey = false;
        }
    }

    if (moveupkey) {
        rectY -= speed;
        ctx.fillStyle = "white";
        ctx.fillRect(rectX, rectY+10, rectSize, rectSize);
    }

    if (movedownkey) {
        rectY += speed;
        ctx.fillStyle = "white";
        ctx.fillRect(rectX, rectY-15, rectSize, rectSize);
    }

    if (moveleftkey) {
        rectX -= speed;
        ctx.fillStyle = "white";
        ctx.fillRect(rectX+10, rectY, rectSize, rectSize);
    }

    if (moverightkey) {
        rectX += speed;
        ctx.fillStyle = "white";
        ctx.fillRect(rectX-10, rectY, rectSize, rectSize);
    }
    
    function change_size () {
        
        ctx.fillStyle= "white";
        ctx.fillRect(rectX, rectY, rectSize, rectSize)
        rectSize = Number(document.getElementById("size_block").value);   
    }

    ctx.fillStyle = "black";
    ctx.fillRect(rectX, rectY, rectSize, rectSize);

    requestAnimationFrame(move);
}

function change_speed () {
    speed = Number(document.getElementById("speed_block").value);
}

//---------------------enemie--------------------------------------------//

let rectX_ene = 0;
let rectY_ene = 10;
let num = 0;
let speed_ene = 2;

document.getElementById("apply_ene"),addEventListener("click",change_speed_ene);

requestAnimationFrame(move_ene);
function move_ene() {

    num = Math.random()*1000;

    ctx.fillStyle="grey"
    ctx.fillRect(rectX_ene, rectY_ene, 15, 15)

    if (rectY_ene >= 500) {
        ctx.fillStyle= "white";
        ctx.fillRect(rectX_ene-5, rectY_ene-5, 20, 15);
        rectX_ene = num;
        rectY_ene = 10;
    } else {
        rectY_ene = rectY_ene+speed_ene;
        ctx.fillStyle="white";
        ctx.fillRect(rectX_ene-5, rectY_ene-20, 25, 15);
    }

    if (rectX_ene < rectX + rectSize && rectX_ene + 15 > rectX && rectY_ene < rectY + rectSize && rectY_ene + 15 > rectY) {
        alert("Gameover");
        
        ctx.fillStyle="white";
        ctx.fillRect(rectX, rectY, rectSize, rectSize);
        ctx.fillStyle="white";
        ctx.fillRect(rectX_ene, rectY_ene-5, 20, 20);

        moveupkey = false;
        movedownkey = false;
        moveleftkey = false;
        moverightkey = false;

        rectY_ene = 10;
        rectX_ene = 10;

        rectX = 450;
        rectY = 250;
        
    }
    requestAnimationFrame(move_ene);
}

function change_speed_ene() {
    speed_ene = Number(document.getElementById("speed_blockene").value);
}