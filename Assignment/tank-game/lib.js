//Due to the different screen refresh rate, you may need to change the number in line 609/610 (function  "draw_loading_bar")

let raf, raf_bullet, raf_enemy_bullet, function_end = false, alive = true, tank_alive = true, enemy_fire = false, bullet_in_air = false;
let up = 0, down = 0, left = 0, right = 0, score_num = 0;

function drawtank() {
    
    ctx.drawImage(tank.img, tank.x, tank.y, tank.size, tank.size);

    if (tank.tank_move_up) {
        tank.img = tank.up_img;
    } else if (tank.tank_move_down) {
        tank.img = tank.down_img;
    } else if (tank.tank_move_left) {
        tank.img = tank.left_img;
    } else if (tank.tank_move_right) {
        tank.img = tank.right_img;
    }
    
    if (tank.tank_move_up) {
        if (tank.y > 0) {
            tank.y -= tank.speed;
        }
    } else if (tank.tank_move_down) {
        if (tank.y + tank.size < canvas.height) {
            tank.y += tank.speed;
        }
    } else if (tank.tank_move_right) {
        if (tank.x + tank.size < canvas.width) {
            tank.x += tank.speed;
        }
    } else if (tank.tank_move_left) {
        if (tank.x > 0) {
            tank.x -= tank.speed;
        }
    }
}

function locate_muzzle() {
    if (tank.img === tank.up_img) {
        tank.muzzle_x = tank.x + tank.size/2;
        tank.muzzle_y = tank.y - 2;
    } else if (tank.img === tank.down_img) {
        tank.muzzle_x = tank.x + tank.size/2 - 2;
        tank.muzzle_y = tank.y + tank.size;
    } else if (tank.img === tank.left_img) {
        tank.muzzle_x = tank.x;
        tank.muzzle_y = tank.y + tank.size/2 -2;
    } else if (tank.img === tank.right_img) {
       tank.muzzle_x = tank.x + tank.size;
       tank.muzzle_y = tank.y + tank.size/2 - 2;
    }
}

function locate_bullet() {
    bullet.x = tank.muzzle_x;
    bullet.y = tank.muzzle_y;
}

function draw_bullet() {
    // let raf;
    function reset_animation() {
        cancelAnimationFrame(raf_bullet);
    }

    function draw_new_bullet_up_down() {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.length);
    }

    function draw_new_bullet_left_right() {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.length, bullet.width);
    }
    
    if (tank.img === tank.up_img) {
        reset_animation();
        locate_bullet();
        function bullet_move_up() { 
            draw_new_bullet_up_down();
            bullet.y -= bullet.speed;
            raf_bullet = requestAnimationFrame(bullet_move_up);  
        }
        raf_bullet = requestAnimationFrame(bullet_move_up);
    } else if (tank.img === tank.down_img) {  
        reset_animation();
        locate_bullet();
        function bullet_move_down() {
            draw_new_bullet_up_down()
            bullet.y += bullet.speed;
            raf_bullet = requestAnimationFrame(bullet_move_down);
        }
        raf_bullet = requestAnimationFrame(bullet_move_down);
        
    } else if (tank.img === tank.left_img) {
        reset_animation();
        locate_bullet();
        function bullet_move_left() {
            draw_new_bullet_left_right()
            bullet.x -= bullet.speed;
            raf_bullet = requestAnimationFrame(bullet_move_left);
        }
        raf_bullet = requestAnimationFrame(bullet_move_left);

    } else if (tank.img === tank.right_img) {
        reset_animation();
        locate_bullet();
        function bullet_move_right() {
            draw_new_bullet_left_right()
            bullet.x += bullet.speed;
            raf_bullet = requestAnimationFrame(bullet_move_right);
        }
        raf_bullet = requestAnimationFrame(bullet_move_right);
    }
}

const tank = {
    up_img : document.getElementById("tank_up"),
    down_img : document.getElementById("tank_down"),
    left_img : document.getElementById("tank_left"),
    right_img : document.getElementById("tank_right"),
    img : document.getElementById("tank_up"),

    tank_move_up : false,
    tank_move_down : false,
    tank_move_right : false,
    tank_move_left : false,

    health : 1,

    size : 35,
    speed : 2,
    x : 50,
    y : 50,
    muzzle_x : 0,
    muzzle_y : 0,
}

const bullet = {
    
    length : 7,
    width : 2,
    color : "red",
    speed : 3,
    fire : false,
    amount : 5,
    damage : 0.5,
    extra : 0,
    reload_time : 4000,

    x : 0,
    y : 0,    
}

const enemy_tank = {
    up_img : document.getElementById("enemy_tank_up"),
    down_img : document.getElementById("enemy_tank_down"),
    left_img : document.getElementById("enemy_tank_left"),
    right_img : document.getElementById("enemy_tank_right"),
    img : document.getElementById("enemy_tank_up"),

    tank_move_up : false,
    tank_move_down : false,
    tank_move_right : false,
    tank_move_left : false,

    health : 1,

    size : 35,
    speed : 1,
    x : 300,
    y : 300,

    muzzle_x : 0,
    muzzle_y : 0,

}

const dead_img = {
    img : document.getElementById("enemy_explode"),

    size : 45,
}

const tank_explode_img = {
    img : document.getElementById("tank_explode"),
    size : 45,
}

const bullet_amount = {
    img : document.getElementById("bullet_amount"),
    size : 30,
}

const health_bar_border = {
    style : "black",
    line_width : 0.5,
    x : 0,
    y : 0,
    width : 35,
    height : 5,
}

const health_bar_inside = {
    style : "red",
    x : 0,
    y : 0,
    width : (health_bar_border.width - health_bar_border.line_width * 2) * enemy_tank.health,
    height : health_bar_border.height - health_bar_border.line_width * 2,
}

const player_health_bar_border = {
    style : "black",
    line_width : 1,
    x : 80,
    y : 10,
    width : 150,
    height : 15,
}

const player_health_bar_inside = {
    style : "red",
    x : 0,
    y : 0,
    width : (player_health_bar_border.width - player_health_bar_border.line_width * 2) * tank.health,
    height : player_health_bar_border.height - player_health_bar_border.line_width * 2,
}

const loading_bar = {
    height : 6,
    width : 80,
    x : 578,
    y : 485,
    style : "black",
    line_width : 2,
}

const loading_bar_inside = {
    x : 0,
    y : 0,

    height : loading_bar.height - loading_bar.line_width * 2,
    // width : loading_bar.width - loading_bar.line_width * 2,
    width : 0,
    style : "red",
}

const score = {
    style : "black",
    x : 600,
    y : 30,
}

function choose_direction() {
    let num = Math.random();

    // console.log(num)
    // console.log("up: ", enemy_tank.tank_move_up, "down: ", enemy_tank.tank_move_down, "left: ", enemy_tank.tank_move_left, "right: ",enemy_tank.tank_move_right)

    if (0 < num && num <= 0.25) {
        enemy_tank.tank_move_up = true;
        enemy_tank.tank_move_down = false;
        enemy_tank.tank_move_left = false;
        enemy_tank.tank_move_right = false;
        up ++;
    } else if (0.25 < num && num <= 0.50 ) {
        enemy_tank.tank_move_up = false;
        enemy_tank.tank_move_down = true;
        enemy_tank.tank_move_left = false;
        enemy_tank.tank_move_right = false;
        down ++;
    } else if (0.50 < num && num <= 0.75) {
        enemy_tank.tank_move_up = false;
        enemy_tank.tank_move_down = false;
        enemy_tank.tank_move_left = true;
        enemy_tank.tank_move_right = false;
        left ++;
    } else if (0.75 < num && num <= 1.00) {
        enemy_tank.tank_move_up = false;
        enemy_tank.tank_move_down = false;
        enemy_tank.tank_move_left = false;
        enemy_tank.tank_move_right = true;
        right ++;
    }
    // console.log("up: ", up, "down: ", down, "left: ", left, "right", right)

}

function enemy_tank_move() {
    cancelAnimationFrame(raf);
    choose_direction();
    let num = Math.floor(Math.random() * 10000 + 1000) + 1;

    if (enemy_tank.tank_move_up) {
        enemy_tank.img = enemy_tank.up_img;
    } else if (enemy_tank.tank_move_down) {
        enemy_tank.img = enemy_tank.down_img;
    } else if (enemy_tank.tank_move_right) {
        enemy_tank.img = enemy_tank.right_img;
    } else if (enemy_tank.tank_move_left) {
        enemy_tank.img = enemy_tank.left_img;
    }
    
    // console.log(num)
    if (enemy_tank.tank_move_up) {   
            setTimeout(function(){cancelAnimationFrame(raf)}, num)
            setTimeout(function(){function_end = true}, num)
            function move_up() {
                enemy_tank.y -= enemy_tank.speed;
                raf = requestAnimationFrame(move_up);
            }
            raf = requestAnimationFrame(move_up);
    } else if (enemy_tank.tank_move_down) {
            setTimeout(function(){cancelAnimationFrame(raf)}, num)
            setTimeout(function(){function_end = true}, num)
            function move_down() {
                enemy_tank.y += enemy_tank.speed;
                raf = requestAnimationFrame(move_down);
            }
            raf = requestAnimationFrame(move_down);
    } else if (enemy_tank.tank_move_right) {
            setTimeout(function(){cancelAnimationFrame(raf)}, num)
            setTimeout(function(){function_end = true}, num)
            function move_right() {
                enemy_tank.x += enemy_tank.speed;
                raf = requestAnimationFrame(move_right);
            }
            raf = requestAnimationFrame(move_right);
    } else if (enemy_tank.tank_move_left) {
            setTimeout(function(){cancelAnimationFrame(raf)}, num)
            setTimeout(function(){function_end = true}, num)
            function move_left() {
                enemy_tank.x -= enemy_tank.speed;
                raf = requestAnimationFrame(move_left);
            }
            raf = requestAnimationFrame(move_left);
    }
}

function hit_wall() {
    if (enemy_tank.y <= 0) {
        cancelAnimationFrame(raf)
        enemy_tank.img = enemy_tank.down_img;

        setTimeout(function(){cancelAnimationFrame(raf)}, 2000)
        setTimeout(function(){function_end = true}, 2000)
        function move_down() {
            enemy_tank.y += enemy_tank.speed;
            raf = requestAnimationFrame(move_down);
        }
        raf = requestAnimationFrame(move_down);
    } else if (enemy_tank.y + enemy_tank.size >= canvas.height) {
        cancelAnimationFrame(raf)
        enemy_tank.img = enemy_tank.up_img;

        setTimeout(function(){cancelAnimationFrame(raf)}, 2000)
            setTimeout(function(){function_end = true}, 2000)
            function move_up() {
                enemy_tank.y -= enemy_tank.speed;
                raf = requestAnimationFrame(move_up);
            }
            raf = requestAnimationFrame(move_up);
    } else if (enemy_tank.x + enemy_tank.size >= canvas.width) {
        cancelAnimationFrame(raf)
        enemy_tank.img = enemy_tank.left_img;

        setTimeout(function(){cancelAnimationFrame(raf)}, 2000)
            setTimeout(function(){function_end = true}, 2000)
            function move_left() {
                enemy_tank.x -= enemy_tank.speed;
                raf = requestAnimationFrame(move_left);
            }
            raf = requestAnimationFrame(move_left);
    } else if (enemy_tank.x <= 0) {
        cancelAnimationFrame(raf)
        enemy_tank.img = enemy_tank.right_img;

        setTimeout(function(){cancelAnimationFrame(raf)}, 2000)
            setTimeout(function(){function_end = true}, 2000)
            function move_right() {
                enemy_tank.x += enemy_tank.speed;
                raf = requestAnimationFrame(move_right);
            }
            raf = requestAnimationFrame(move_right);
    }
}

function enemy_destory() {
    if(bullet.x < enemy_tank.x + enemy_tank.size && bullet.x + 15 > enemy_tank.x && bullet.y < enemy_tank.y + enemy_tank.size && bullet.y + 15 > enemy_tank.y) {
        bullet.x = -100;
        bullet.y = -100;
        enemy_tank.health -= bullet.damage;
        if (enemy_tank.health <= 0) {
            alive = false;
        }
    }
}

function enemy_dead() {
    cancelAnimationFrame(raf);
    let fire_x = enemy_tank.x;
    let fire_y = enemy_tank.y;
    
    ctx.drawImage(dead_img.img, fire_x, fire_y, dead_img.size, dead_img.size);
}

function draw_enemy_tank() {
    ctx.drawImage(enemy_tank.img, enemy_tank.x, enemy_tank.y, enemy_tank.size, enemy_tank.size);
}

function enemy_tank_fire() {
    if ((enemy_tank.img === enemy_tank.up_img && tank.y < enemy_tank.y && ((tank.x > enemy_tank.x && tank.x < enemy_tank.x + enemy_tank.size) || (tank.x + tank.size > enemy_tank.x && tank.x + tank.size < enemy_tank.x + enemy_tank.size))) || (enemy_tank.img === enemy_tank.down_img && tank.y > enemy_tank.y && ((enemy_tank.x < tank.x + tank.size && enemy_tank.x > tank.x) || (enemy_tank.x + enemy_tank.size < tank.x + tank.size && enemy_tank.x + enemy_tank.size > tank.x))) || (enemy_tank.img === enemy_tank.left_img && tank.x < enemy_tank.x && ((enemy_tank.y > tank.y && enemy_tank.y < tank.y + tank.size) || (enemy_tank.y + enemy_tank.size > tank.y && enemy_tank.y + enemy_tank.size < tank.y + tank.size))) || (enemy_tank.img === enemy_tank.right_img && tank.x > enemy_tank.x && ((enemy_tank.y > tank.y && enemy_tank.y < tank.y + tank.size) || (enemy_tank.y + enemy_tank.size > tank.y && enemy_tank.y + enemy_tank.size < tank.y + tank.size)))) {
        enemy_fire = true
    } else {
        enemy_fire = false;
    }
}

const enemy_bullet = {
    
    length : 7,
    width : 2,
    color : "black",
    speed : 3,
    fire : false,

    damage: 0.3,

    x : 0,
    y : 0,    
}

function locate_enemy_muzzle() {
    if (enemy_tank.img === enemy_tank.up_img) {
        enemy_tank.muzzle_x = enemy_tank.x + enemy_tank.size/2;
        enemy_tank.muzzle_y = enemy_tank.y - 2;
    } else if (enemy_tank.img === enemy_tank.down_img) {
        enemy_tank.muzzle_x = enemy_tank.x + enemy_tank.size/2 - 2;
        enemy_tank.muzzle_y = enemy_tank.y + enemy_tank.size;
    } else if (enemy_tank.img === enemy_tank.left_img) {
        enemy_tank.muzzle_x = enemy_tank.x;
        enemy_tank.muzzle_y = enemy_tank.y + enemy_tank.size/2 -2;
    } else if (enemy_tank.img === enemy_tank.right_img) {
       enemy_tank.muzzle_x = enemy_tank.x + enemy_tank.size;
       enemy_tank.muzzle_y = enemy_tank.y + enemy_tank.size/2 - 2;
    }
}

function locate_enemy_bullet() {
    enemy_bullet.x = enemy_tank.muzzle_x;
    enemy_bullet.y = enemy_tank.muzzle_y;
}

function draw_enemy_bullet() {

    function reset_animation() {
        cancelAnimationFrame(raf_enemy_bullet);
    }

    function draw_new_enemy_bullet_up_down() {
        ctx.fillStyle = enemy_bullet.color;
        ctx.fillRect(enemy_bullet.x, enemy_bullet.y, enemy_bullet.width, enemy_bullet.length);
    }

    function draw_new_enemy_bullet_left_right() {
        ctx.fillStyle = enemy_bullet.color;
        ctx.fillRect(enemy_bullet.x, enemy_bullet.y, enemy_bullet.length, enemy_bullet.width);
    }
    
    if (enemy_tank.img === enemy_tank.up_img) {
        reset_animation();
        locate_enemy_bullet();
        function enemy_bullet_move_up() { 
            draw_new_enemy_bullet_up_down();
            enemy_bullet.y -= enemy_bullet.speed;
            raf_enemy_bullet = requestAnimationFrame(enemy_bullet_move_up);  
        }
        raf_enemy_bullet = requestAnimationFrame(enemy_bullet_move_up);
    } else if (enemy_tank.img === enemy_tank.down_img) {  
        reset_animation();
        locate_enemy_bullet();
        function enemy_bullet_move_down() {
            draw_new_enemy_bullet_up_down()
            enemy_bullet.y += enemy_bullet.speed;
            raf_enemy_bullet = requestAnimationFrame(enemy_bullet_move_down);
        }
        raf_enemy_bullet = requestAnimationFrame(enemy_bullet_move_down);
        
    } else if (enemy_tank.img === enemy_tank.left_img) {
        reset_animation();
        locate_enemy_bullet();
        function enemy_bullet_move_left() {
            draw_new_enemy_bullet_left_right()
            enemy_bullet.x -= enemy_bullet.speed;
            raf_enemy_bullet = requestAnimationFrame(enemy_bullet_move_left);
        }
        raf_enemy_bullet = requestAnimationFrame(enemy_bullet_move_left);

    } else if (enemy_tank.img === enemy_tank.right_img) {
        reset_animation();
        locate_enemy_bullet();
        function enemy_bullet_move_right() {
            draw_new_enemy_bullet_left_right()
            enemy_bullet.x += enemy_bullet.speed;
            raf_enemy_bullet = requestAnimationFrame(enemy_bullet_move_right);
        }
        raf_enemy_bullet = requestAnimationFrame(enemy_bullet_move_right);
    }
}

function player_destory() {
    if(enemy_bullet.x < tank.x + tank.size && enemy_bullet.x  > tank.x && enemy_bullet.y < tank.y + tank.size && enemy_bullet.y + 15 > tank.y) {
        enemy_bullet.x = -100;
        enemy_bullet.y = -100;
        tank.health -= enemy_bullet.damage;
        if (tank.health <= 0) {
            tank_alive = false;
            console.log("YOU LOOSE");
        }
    } 
}

function tank_explode() {
    if (tank_alive === false) {
        let fire_x = tank.x;
        let fire_y = tank.y;
        ctx.drawImage(tank_explode_img.img, fire_x, fire_y, tank_explode_img.size, tank_explode_img.size);
    }
}

function reload() {

    if (bullet_in_air) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("RELOADING", 565, 473)
    } else {
        ctx.font = "20px Arial";
        ctx.fillStyle = "rgb(111, 228, 76)";
        ctx.fillText("READY", 585, 473)
    }
}

function show_current_ammo() {
    ctx.drawImage(bullet_amount.img, 575, 420, bullet_amount.size, bullet_amount.size);

    ctx.font = "30px Arial"
    ctx.fillStyle = "black"
    ctx.fillText("=", 610, 447);

    ctx.font = "30px Arial"
    if (bullet.amount < 3) {
        ctx.fillStyle = "red"
    } else {
        ctx.fillStyle = "black"
    }
    ctx.fillText(bullet.amount, 640, 447);
}

function health_bar_enemy() {
    health_bar_border.x = enemy_tank.x + 0;
    health_bar_border.y = enemy_tank.y - 15;
    
    health_bar_inside.x = health_bar_border.x + health_bar_border.line_width;
    health_bar_inside.y = health_bar_border.y + health_bar_border.line_width;

    health_bar_inside.width = (health_bar_border.width - health_bar_border.line_width * 2) * enemy_tank.health,

    ctx.strokeStyle = health_bar_border.style;
    ctx.lineWidth = health_bar_border.line_width;
    ctx.strokeRect(health_bar_border.x, health_bar_border.y, health_bar_border.width, health_bar_border.height);

    ctx.fillStyle = health_bar_inside.style;
    ctx.fillRect(health_bar_inside.x, health_bar_inside.y, health_bar_inside.width, health_bar_inside.height)
}

function health_bar_player() {
    player_health_bar_inside.x = player_health_bar_border.x + player_health_bar_border.line_width;
    player_health_bar_inside.y = player_health_bar_border.y + player_health_bar_border.line_width;

    player_health_bar_inside.width = (player_health_bar_border.width - player_health_bar_border.line_width * 2) * tank.health

    ctx.strokeStyle = player_health_bar_border.style;
    ctx.lineWidth = player_health_bar_border.line_width;
    ctx.strokeRect(player_health_bar_border.x, player_health_bar_border.y, player_health_bar_border.width, player_health_bar_border.height);

    if (tank_alive) {
        ctx.fillStyle = player_health_bar_inside.style;
        ctx.fillRect(player_health_bar_inside.x, player_health_bar_inside.y, player_health_bar_inside.width, player_health_bar_inside.height);
    }

    ctx.fillStyle = player_health_bar_border.style;
    ctx.font = "20px Arial"
    ctx.fillText("Health :", 5, 23)
}

function draw_loading_bar() {
    ctx.strokeStyle = loading_bar.style;
    ctx.lineWidth = loading_bar.line_width;
    ctx.strokeRect(loading_bar.x, loading_bar.y, loading_bar.width, loading_bar.height);

    loading_bar_inside.x = loading_bar.x + loading_bar.line_width;
    loading_bar_inside.y = loading_bar.y + loading_bar.line_width;

    if (bullet_in_air) {
        loading_bar_inside.style = "red"
        ctx.fillStyle = loading_bar_inside.style;
        ctx.fillRect(loading_bar_inside.x, loading_bar_inside.y, loading_bar_inside.width, loading_bar_inside.height);
        // loading_bar_inside.width += 0.317; //60 Hertz
        loading_bar_inside.width += 0.26; //75 Hertz
    } else if (bullet_in_air === false){
        loading_bar_inside.style = "rgb(111, 228, 76)";
        loading_bar_inside.width = loading_bar.width - loading_bar.line_width * 2;
        ctx.fillStyle = loading_bar_inside.style;
        ctx.fillRect(loading_bar_inside.x, loading_bar_inside.y, loading_bar_inside.width, loading_bar_inside.height);
    }
}

function enemy_new() {
    while (alive === false) {
        enemy_bullet.damage += 0.1;
        enemy_tank.health = 1;
        bullet.amount += 5 + bullet.extra;
        if (bullet.damage > 0.1) {
            bullet.damage -= 0.05;
            bullet.extra += 1;
        }
        alive = true;
        enemy_tank.x = num1; 
        enemy_tank.y = num2;
        score_num ++
        break;
    }
}

function show_score() {
    ctx.fillStyle = score.style;
    ctx.fillText("Score: " + score_num, score.x, score.y)
}