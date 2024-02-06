import wordArry from "/words.js";
const wordDIV = document.querySelector(".word");
let correctLetters =[];
let random = Math.floor(Math.random() * wordArry.length-1);
const correctWord = wordArry[random];
console.log("Random Word  "+ correctWord);
wordDIV.innerHTML = Array(correctWord.length).fill("<span>_</span>").join("")
const pattern = new RegExp("^[A-Z]$");
let correctWordArray = [];
let EnteredLetters = [];
let spanArray =[]
let count=0;

document.getElementById("btn").addEventListener("click",()=>{
    let UserLetter = document.getElementById("txt").value.toUpperCase();
 
    if(UserLetter.length>0){
       
        if(pattern.test(UserLetter)){

           correctWordArray = correctWord.toUpperCase().split("");
           count++;
          
           if(EnteredLetters.includes(UserLetter)){
            alert("Letter "+ UserLetter +" Already Entered")
         }else{
            correctWordArray.forEach((letters,index) =>{
                if(letters === UserLetter ){
                    correctLetters.push(UserLetter)
                 
                    spanArray  =  document.querySelectorAll(".word span");
                    
                    spanArray[index].textContent = UserLetter;
                  
                }
               
                
               })
            EnteredLetters.push(UserLetter)
            
         }
          
       
         
         if(checkAnagram(correctLetters,correctWordArray)){
            count -= correctWord.length;
            let message ='';
            if (count === 1) {
                message = "Correct On the First Try. Goated For Real";
            } else if (count === 2 || count === 3) {
                message = "Alright Not Bad";
            } else if (count >= 4 && count <= 6) {
                message = "Bro, Aint no way u gotta pick up a book";
            } else if (count > 7) {
                message = "At this Point U gotta Go back to Elementary";
            }
            else if (count >= 8 && count <= 12) {
                message = "Expectations were Low But Oh My God This is Horrible but anyway u got the word correct ";
            }
            else if (count>12) {
                message = "Are You sure Your Not Brain Dead but anyway u got the word correct ";
            }
s            
            const gameover = document.querySelector(".gameover");
            const game = document.querySelector(".game");
            const gameElement = ` <div class="sentence">Congratulations U Guessed The Word After ${count} Times<p>${message}</p></div>
            <button id="reset">reset</button>`
            setTimeout(()=>{
                gameover.innerHTML = gameElement;
                gameover.classList.remove("hide");
                game.classList.add("hide");
                const resetbtn = document.getElementById('reset');
                resetbtn.addEventListener("click",()=>{
                    
                    window.location.reload();

                })
            },1000)
           
            console.log("The Correct word is  "+  correctWord)
            spanArray.forEach(span =>{
                span.style.color="green";
            })
         }
        
         
    
        }
        else{
            alert("Enter Only  One Alphabet ");
        }
    }
    else{
        alert("Enter A Letter");
    }
    
})
function checkAnagram(CL,CW){
    const sortedGuess = CL.sort().join("");
    const sortedWord = CW.sort().join("");
    return sortedGuess === sortedWord;
}
    


