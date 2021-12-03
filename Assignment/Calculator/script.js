

document.getElementById("button_calculate").addEventListener("click",calculate);

function calculate() {
    let topa = Number(document.getElementById("top").value);
    let buttonb = Number(document.getElementById("button").value);
    let heighth = Number(document.getElementById("height").value);



    //let output = ((1/2)*(topa + buttonb)*heighth);
    let output1 = topa + buttonb;
    let output2 = output1 * 0.5;
    let output3 = output2 * heighth
    let output = output3

    console.clear();
    console.log("top = " + topa);
    console.log("button = " + buttonb);
    console.log("height = " + heighth);
    console.log("top + button = " + output1)
    console.log("(top + button) * 0.5 = " + output2)
    console.log("answer = " + output3)
    
    document.getElementById("answeroutput").innerHTML =  output;

}



