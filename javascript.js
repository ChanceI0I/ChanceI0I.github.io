// add eventlistener 
document.getElementById("result").addEventListener("click",check);

// build function
function check() {

    // name the variable and lowercase them
    let score = 0;
    let q1 = document.getElementById("answer_q1").value.toLowerCase();
    let q2 = document.getElementById("answer_q2").value.toLowerCase();
    let q3 = document.getElementById("answer_q3").value.toLowerCase();
    let q4 = document.getElementById("answer_q4").value.toLowerCase();
    let check_1 = document.getElementById("check1");
    let check_2 = document.getElementById("check2");
    let check_3 = document.getElementById("check3");
    let check_4 = document.getElementById("check4");
    let encouragement = document.getElementById("encourage").value;
    
    // check the answer
    if (q1 === "2") {
        check_1.innerHTML="Correct";
        // change the color of the word  green = right 
        check_1.style.color = "green";
        document.getElementById("answer_q1").style.borderColor = "green";
        document.getElementById("answer_q1").style.borderWidth = "2.5px";
        score ++;
    } else {
        check_1.innerHTML="Wrong";
        // color red = wrong
        check_1.style.color = "red";
        document.getElementById("answer_q1").style.borderColor = "red";
        document.getElementById("answer_q1").style.borderWidth = "2.5px";
    }


    if (q2 === "3") {
        check_2.innerHTML="Correct";
        check_2.style.color = "green";
        document.getElementById("answer_q2").style.borderColor = "green";
        document.getElementById("answer_q2").style.borderWidth = "2.5px";
        score ++;
    } else {
        check_2.innerHTML="Wrong";
        check_2.style.color = "red";
        document.getElementById("answer_q2").style.borderColor = "red";
        document.getElementById("answer_q2").style.borderWidth = "2.5px";
    }


    if (q3 === "4") {
        check_3.innerHTML="Correct";
        check_3.style.color = "green";
        document.getElementById("answer_q3").style.borderColor = "green";
        document.getElementById("answer_q3").style.borderWidth = "2.5px";
        score ++;
    } else {
        check_3.innerHTML="Wrong";
        check_3.style.color = "red";
        document.getElementById("answer_q3").style.borderColor = "red";
        document.getElementById("answer_q3").style.borderWidth = "2.5px";
    }


    if (q4 === "mr.veldkamp" || q4 === "mr.v") {
        check_4.innerHTML="Correct";
        check_4.style.color = "green";
        document.getElementById("answer_q4").style.borderColor = "green";
        document.getElementById("answer_q4").style.borderWidth = "2.5px";
        score ++;
    } else {
        check_4.innerHTML="Wrong";
        check_4.style.color = "red";
        document.getElementById("answer_q4").style.borderColor = "red";
        document.getElementById("answer_q4").style.borderWidth = "2.5px";
    }

    // used to check the score 
    console.log("score :" + score);

    // calculate the percentage
    let percent = (score/4 * 100);

    // print the score to user 
    setTimeout(function(){alert("Your score is: " + score + "/4 " + "(" + percent + "%)");}, 0)


    // encourage  
    if (score === 4) {
        document.getElementById("encourage").innerHTML="Well Done!"
    } else if (score === 3) {
        document.getElementById("encourage").innerHTML="You can do it!"
    } else if (score === 2) {
        document.getElementById("encourage").innerHTML="Don't give up!"
    } else if (score < 2) {
        document.getElementById("encourage").innerHTML="Seriously?"
    }
    
}