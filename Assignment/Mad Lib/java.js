document.getElementById("btn").addEventListener("click",result)




function result() {
    let family_member_name = document.getElementById("name1").value;
    let noun = document.getElementById("pn_word").value;
    let action = document.getElementById("action_word").value;
    
    
    
    console.clear()
    console.log("Family member name: " + family_member_name)
    console.log("Plural noun: " + noun)
    console.log("Action: " + action)
    



    document.getElementById("family_member").innerHTML = family_member_name
    document.getElementById("plural_noun").innerHTML = noun
    document.getElementById("action").innerHTML = action

    
}