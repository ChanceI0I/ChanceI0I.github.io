let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let enemy_attact = false, num1, num2;

document.addEventListener("keydown", key_down, false);
document.addEventListener("keyup", key_up, false);

function key_down(event) {
    if (event.code == "KeyW") {
        tank.tank_move_up = true;
    } else if (event.code == "KeyS") {
        tank.tank_move_down = true;
    } else if (event.code == "KeyA") {
        tank.tank_move_left = true;
    } else if (event.code == "KeyD") {
        tank.tank_move_right = true;
    }

    if (event.code == "KeyJ") {
        if (tank_alive) {
            if (bullet_in_air === false) {
                if (bullet.amount > 0) {
                    draw_bullet();
                    bullet_in_air = true;
                    bullet.amount --;
                    setTimeout(function(){bullet_in_air = false}, bullet.reload_time);
                    loading_bar_inside.width = 0;
                }
            }  
        }
    }   
}

function key_up(event) {

    if (event.code == "KeyW") {
        tank.tank_move_up = false;
    } else if (event.code == "KeyS") {
        tank.tank_move_down = false;
    } else if (event.code == "KeyA") {
        tank.tank_move_left = false;
    } else if (event.code == "KeyD") {
        tank.tank_move_right = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (tank_alive) {
        drawtank();  
    }

    locate_muzzle();
    locate_enemy_muzzle();

    if (alive) {
        if (bullet.amount === 0) {
            console.log("MISSION FAILED")
        }
        draw_enemy_tank(); 
        enemy_tank_fire();
        health_bar_enemy();
        
    } else {
        enemy_dead();
        num1 = Math.round(Math.random() * 500);
        num2 = Math.round(Math.random() * 500);
    }

    while (function_end) {
        enemy_tank_move();
        function_end = false;
        break;
    }
    enemy_destory();
    tank_explode(); // Player
    hit_wall();
    player_destory();
    reload();
    show_current_ammo();
    health_bar_player();
    draw_loading_bar();
    show_score()

    if (alive === false) {
        setTimeout(enemy_new, 1500)
    }

    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

enemy_tank_move();

function attact() {
    if (alive) {
        if (tank_alive) {
            if (enemy_fire) {
                draw_enemy_bullet();
            }
        }
    }
}
setInterval(attact, 2000)