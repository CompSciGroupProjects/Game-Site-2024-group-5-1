function rock(){
    document.getElementById("PC").innerHTML = ("Rock");
}
function paper(){
    document.getElementById("PC").innerHTML = ("Paper");
}
function scissors(){
    document.getElementById("PC").innerHTML = ("Scissors");
}
function insert(){
    let x = Math.floor(Math.random() * 4) + 1;


    if(x===3){
        document.getElementById("CC").innerHTML = ("Rock");
    }
    if(x===2){
        document.getElementById("CC").innerHTML = ("Paper");
    }
    if(x===1){
        document.getElementById("CC").innerHTML = ("Scissors");
    }



    if(document.getElementById("CC").innerHTML === "Rock" && document.getElementById("PC").innerHTML === "Rock"){
        document.getElementById("Winner").innerHTML = ("Tie");
    }
    if(document.getElementById("CC").innerHTML === "Paper" && document.getElementById("PC").innerHTML === "Paper"){
        document.getElementById("Winner").innerHTML = ("Tie");
    }
    if(document.getElementById("CC").innerHTML === "Scissors" && document.getElementById("PC").innerHTML === "Scissors"){
        document.getElementById("Winner").innerHTML = ("Tie");
    }

    if(document.getElementById("CC").innerHTML === "Rock" && document.getElementById("PC").innerHTML === "Scissors"){
        document.getElementById("Winner").innerHTML = ("The Computer Wins This Round!");
    }
    if(document.getElementById("CC").innerHTML === "Paper" && document.getElementById("PC").innerHTML === "Rock"){
        document.getElementById("Winner").innerHTML = ("The Computer Wins This Round!");
    }
    if(document.getElementById("CC").innerHTML === "Scissors" && document.getElementById("PC").innerHTML === "Paper"){
        document.getElementById("Winner").innerHTML = ("The Computer Wins This Round!");
    }

    if(document.getElementById("CC").innerHTML === "Paper" && document.getElementById("PC").innerHTML === "Scissors"){
        document.getElementById("Winner").innerHTML = ("The Player Wins This Round!");
    }
    if(document.getElementById("CC").innerHTML === "Scissors" && document.getElementById("PC").innerHTML === "Rock"){
        document.getElementById("Winner").innerHTML = ("The Player Wins This Round!");
    }
    if(document.getElementById("CC").innerHTML === "Rock" && document.getElementById("PC").innerHTML === "Paper"){
        document.getElementById("Winner").innerHTML = ("The Player Wins This Round!");
    }




}
