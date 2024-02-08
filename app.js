import wordArry from "./words.js";
const wordDIV = document.querySelector(".word");
let correctLetters =[];
let random = Math.floor(Math.random() * wordArry.length-1);
let correctWord = wordArry[random];
//wordDIV.innerHTML = Array(correctWord.length).fill("<span>_</span>").join("")
const pattern = new RegExp("^[A-Z]$");
let correctWordArray = [];
let EnteredLetters = [];
let spanArray =[]
let count=0;
let gameRunning =false;
let selectedLevel="Easy";
let minutes=1;
let seconds =1;
const Difficulty = document.getElementById("ToggleMenu");
const start = document.querySelector("#btnStart");
/*const PT = document.querySelector(".pointer");

document.addEventListener("mousemove", (e) => {
    PT.style.opacity = "1";
    PT.style.left = e.pageX + "px";
    PT.style.top = e.pageY + "px";
});
*/
setTimeout(()=>{
document.getElementById("mess").style.opacity =0;
},5500)
start.addEventListener("click",()=>{
    document.querySelector("#StartGame").classList.add("hide");
    gameRunning=true;

    checkRunning();
})

function endGame(){
    const gameovertimer = document.querySelector(".gameovertimer");
    const game = document.querySelector(".game");
    game.classList.add("hide");
    const gameElement = ` <div class="sentence">The Time is Over Its Not Easy As it Seems is it <br> Its Impossible </div>
            <button class ="btnButton" id="reset">Play Again</button>`;
           
    gameovertimer.innerHTML =gameElement;
    gameovertimer.classList.remove('hide');
    const resetbtn = document.getElementById('reset');
    resetbtn.addEventListener("click",()=>{
                    
        window.location.reload();

    })

}
Difficulty.addEventListener("click",()=>{
    document.querySelector("ul").classList.toggle("hide");
    document.querySelectorAll("li").forEach(item =>{
     
        item.addEventListener("click",(e)=>{
            Difficulty.textContent = e.target.textContent;
            selectedLevel = e.target.textContent;
            document.querySelector("ul").classList.toggle("hide");
          
        })
    })
})
function checkRunning(){
    const TimerDiv = document.querySelector(".timer");
if(gameRunning){
    document.querySelector("ul").classList.add("hide");
  

    Difficulty.disabled = true;
    document.querySelector(".game").classList.remove("hide");
   if(selectedLevel === "Easy"){
    while(correctWord.length>6){
        random = Math.floor(Math.random() * wordArry.length-1);
        correctWord = wordArry[random];
    }
   
   }
   else if(selectedLevel === "Hard"){
    while(correctWord.length<8){
        random = Math.floor(Math.random() * wordArry.length-1);
        correctWord = wordArry[random];
    }
   
   }
   else if(selectedLevel === "Impossible"){
    while(correctWord.length<9){
        random = Math.floor(Math.random() * wordArry.length-1);
        correctWord = wordArry[random];
    }
    let RandomNumber = 1+ Math.random()*3
    const currentDate = new Date();
   const  countDate = new Date();
   countDate.setMinutes (countDate.getMinutes() + RandomNumber);
  
   const myInter = setInterval(()=>{
    const now = new Date(); 
    let diff = countDate - now; 
    minutes= Math.floor(diff / (1000 * 60));
 seconds= Math.floor((diff % (1000 * 60)) / 1000)
    
 const spanElement = `<p id="timetxt">Time Left <span id="timer">${minutes} : ${seconds}</span></p>`

 TimerDiv.innerHTML = spanElement;
 if(minutes<1 && seconds >=30 ){
    document.getElementById("timer").style.color ="#9c423b";
 }
 else if(minutes <1 && seconds <30){
    document.getElementById("timer").style.color ="#e62c1e";
 }

    if(minutes <0 && seconds <0){
        clearInterval(myInter);
        console.log("INterval Clerard")
        endGame();
       }
   },1000)
   }
   //console.log("Random Word  "+ correctWord);
   wordDIV.innerHTML = Array(correctWord.length).fill("<span>_</span>").join("")

document.getElementById("btn").addEventListener("click",()=>{
    let UserLetter = document.getElementById("txt").value.toUpperCase();
    console.log(correctWord);
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
            if (count === 0) {
                message = "Correct On the First Try. Goated For Real";
            } else if (count >= 1 && count <=3) {
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
           
            const gameover = document.querySelector(".gameover");
            const game = document.querySelector(".game");
            const gameElement = ` <div class="sentence">Congratulations U Guessed The Word After ${count} Times<p>${message}</p></div>
            <button class ="btnButton" id="reset">Play Again</button>`
            setTimeout(()=>{
                gameover.innerHTML = gameElement;
                gameover.classList.remove("hide");
                game.classList.add("hide");
                const resetbtn = document.getElementById('reset');
                resetbtn.addEventListener("click",()=>{
                    
                    window.location.reload();

                })
            },1000)
           
            //console.log("The Correct word is  "+  correctWord)
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
    

}
}
