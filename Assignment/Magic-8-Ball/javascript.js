//set event listener
document.getElementById("pic").addEventListener("click",answer);



//build function
function answer() {

    //get what user input
    let input = document.getElementById("question").value;

    //get random number
    let random_num = Math.random();

    //used to check the value
    console.clear();
    console.log(input);
    console.log(random_num);
    
    //answer the question
    if (input === "Does a magic 8 ball actually work?") {
        document.getElementById("answer").innerHTML="How dare you doubt me!";
    } else if (input === "Is JavaScript awesome?") {
        document.getElementById("answer").innerHTML="Of Course!";
    } else if (input === "") {
        document.getElementById("answer").innerHTML="Please ask a question.....";
    } else if (random_num <= 0.2) {
        document.getElementById("answer").innerHTML="Without a Doubt.";
    } else if (0.2 < random_num <= 0.4 ) {
        document.getElementById("answer").innerHTML="As I see it, yes.";
    } else if (0.4 < random_num <= 0.6) {
        document.getElementById("answer").innerHTML="Concentrate and ask again.";
    } else if (0.6 < random_num <= 0.8) {
        document.getElementById("answer").innerHTML="Don't count on it.";
    } else if (0.8 < random_num <= 1) {
        document.getElementById("answer").innerHTML="Outlook not so good.";
    }
}