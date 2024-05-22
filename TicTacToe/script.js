let boxes = document.querySelectorAll(".box");
let turn = "X";
let winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
let playingPVP = false;
let playingEasy = false;
let playingHard = false;
let isGameOver = false;
//GAMEMODES
function PvP(){
    if(playingEasy||playingHard)
    {
        location.reload();
    }else
        playingPVP = true;
    Reset()
    boxes.forEach(e => {
        e.innerHTML = ""
        e.addEventListener("click", () => {
            if (!isGameOver && e.innerHTML === "") {
                e.innerHTML = turn;
                Win();
                Draw();
                changeTurn();
            }
        })
    })
}
function smartBot(){
    if(playingEasy||playingPVP)
    {
        location.reload();
    }else
        playingHard = true;
    Reset()
    boxes.forEach(e => {
        e.innerHTML = ""
        e.addEventListener("click", () => {
            if (!isGameOver && e.innerHTML === "") {
                e.innerHTML = turn;
                Win();
                Draw();
                changeTurn();
                SmartBotAlgo()
            }
        })
    })
}
//CONDITIONS
function saveBoard() {
    let board = [];
    boxes.forEach(e => {
        board.push(e.innerHTML);
    });
    return board;
}
function changeTurn(){
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    }
    else {
        turn = "X";
        document.querySelector(".bg").style.left = "0px";
    }
}
function Win(){
    for(let i = 0; i<winConditions.length; i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if(v0 !== "" && v0 === v1 && v0 === v2){
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " win";
            document.querySelector("#play-again").style.display = "inline"

            for(j = 0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#ECF39E"
                boxes[winConditions[i][j]].style.color = "#4F772D"
            }
        }
    }
    return turn;
}
function Draw(){
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false;
        })

        if(isDraw){
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline"
        }
    }
}
//ALGORITHMS
function SmartBotAlgo() {
    Win();
    Draw();
    getNextBestMove();
}
function getNextBestMove() {
    let bestScore = -Infinity;
    let move;
    let board = saveBoard();
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    if (move !== undefined) {
        boxes[move].innerHTML = 'O';
        Win();
        Draw();
        changeTurn();
    }
}
function minimax(board, depth, isMaximizing) {
    let scores = {
        'X': -10,
        'O': 10,
        'draw': 0
    };

    let result = checkWinner(board);
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
function checkWinner(board) {
    for (let i = 0; i < winConditions.length; i++) {
        let [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'draw';
}
//RESET
function Reset(){
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"
    })
}
document.querySelector("#play-again").addEventListener("click", ()=>{
    Reset()
})