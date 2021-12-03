// set Event listener 
document.getElementById("1").addEventListener("click",test_1);
document.getElementById("2").addEventListener("click",test_2);
document.getElementById("3").addEventListener("click",test_3);
document.getElementById("4").addEventListener("click",test_4);
document.getElementById("5").addEventListener("click",test_5);

// function building
function test_1() {
    console.clear()
    for (num=1 ;num <= 500 ;num ++) {
        console.log("I'm so happy!");
    }
}

function test_2() {
    console.clear()
    for (num = 12 ;num <= 800 ;num = num + 4) {
        console.log(num);
    }
}

function test_3() {
    console.clear()
    for (num = 55 ;num >= 11;num -= 2) {
        console.log(num);
    }
}

function test_4() {
    console.clear()
    let result = (1+50)*50/2;
    console.log(result);
}

function test_5() {
    console.clear()
    let result = (1+100)*100/2;
    console.log(result);
}