var words = Object.keys(data);
let number = Math.floor(Math.random()* words.length);
let word = words[number];
let answer = word.split("");
let dash=[];
let lives = "❤❤❤❤❤❤❤❤❤❤"
let incorrectGuess = [];
function displayHearts()
{
    document.getElementById("hearts").innerHTML =  lives;
}

function generate()
{
    setupKeyboard();
    document.getElementById("hearts").innerHTML =  lives;

     for(let i = 0; i < word.length; i++)
     {
         if(word[i] >= 'a' && word[i] <= 'z')
            dash.push("_ ");
         else dash.push(word[i]);
     }
    displayWord()

}
 function displayWord()
 {
     document.getElementById("word").innerHTML =  " ";
     for(let i = 0; i < word.length; i++)
     {
         document.getElementById("word").innerHTML +=  dash[i];
     }
 }
function check(letter)
{
        if(answer.includes(letter)|| incorrectGuess.includes(letter))
        {
            for(let i = 0; i < word.length; i++)
            {
                if(answer[i]===letter)
                {
                    dash[i] = letter;
                    document.getElementById(letter).disabled = true;

                }
            }

        }
        else
        {

            document.getElementById(letter).disabled = true;
            lives = lives.substring(0, lives.length-1)
            document.getElementById("hearts").innerHTML =  lives;
        }
        if(!(incorrectGuess.includes(letter)))
        {
            incorrectGuess.push(letter);
        }

        win();
        lose();
    displayWord();
    displayHearts();
    document.getElementById("clicked").innerHTML =  incorrectGuess;
}

function lose()
{
    if(lives.length===0)
    {

        document.getElementById("keyboard").innerHTML =  "lose";
        document.getElementById("answer").innerHTML =  "The answer is: " + word + "</br>" + data[word];
        removeKeyboard();
    }

}

function win()
{
   if(JSON.stringify(answer)===JSON.stringify(dash))
   {
       document.getElementById("answer").innerHTML =  "The answer is: " + word + "</br>" + data[word];
       document.getElementById("keyboard").innerHTML =  "win";
   }
}
function setupKeyboard() {
    document.addEventListener('keydown', function(event) {
        if(document.getElementById("keyboard").innerHTML ===  "win" || document.getElementById("keyboard").innerHTML ===  "lose")
        {
            return;
        }
        else if (event.key >='a' && event.key <= 'z') {
            check(event.key)
        }

        }

    )
    ;
}

function removeKeyboard() {
    document.removeEventListener('keydown', this)
}
