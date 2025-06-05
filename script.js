function controller(event){
 
    //alert("Press ENTER to RUN and Press SPACEBAR to JUMP You're the !ASH RUNNER!")
    //alert(event.key != "Enter");

    if(event.key == "Enter"){
        
        if(runWorker==0){
            run();
            runSound.play()
            moveBackground();
            updateScore();
            flameMargins.forEach(createFlames);
        }

    }


    if(event.key == " "){

        if(jumpWorker== 0){
            
            if(runWorker!=0){

                clearInterval(runWorker);
                runSound.pause();
                jump();
                jumpSound.play();

            }
       
        }
       
    }

}

var runImage = 1;
var runWorker=0;
var runSound = new Audio("run.mp3");
runSound.loop = true;

function run(){

    runWorker= setInterval(()=>{

        runImage = runImage +1;

        if(runImage == 9){
            runImage=1;
        }

        document.getElementById("boy").src="run"+runImage+".png";

    },100);
   
}

var jumpImage=1;
var jumpWorker=0;
var jumpMargin=312;
var jumpSound = new Audio("jump.mp3")

function jump(){
    
    jumpWorker= setInterval(()=>{

        jumpImage = jumpImage +1;

        if(jumpImage < 8){
            jumpMargin=jumpMargin - 15;
            document.getElementById("boy").style.marginTop = jumpMargin +"px";
        }

        if(jumpImage > 7){
            jumpMargin=jumpMargin + 15;
            document.getElementById("boy").style.marginTop = jumpMargin +"px";
        }

        if(jumpImage == 13){
           jumpImage = 1;

           clearInterval(jumpWorker);
           jumpWorker = 0;
           run();
           runSound.play();
        }

        document.getElementById("boy").src = "jump" +jumpImage+ ".png";
    
    },100);

}

var backgroundWorker = 0;
var backgroundPosition = 0;
 
function moveBackground(){

    backgroundWorker = setInterval(()=>{

        backgroundPosition = backgroundPosition- 10;
        document.getElementById("background").style.backgroundPositionX = backgroundPosition + "px";

    },100);

}

var score = 0;
var scoreWorker = 0;

    function updateScore(){

        scoreWorker = setInterval(()=>{

            if(score == 100000){
                alert("You Won! Press OK to RESTART!");
                window.location.reload();
            }

            score = score + 1;
            document.getElementById("score").innerHTML = score;
            
    },100                          );
}

var flameMargins = [500,1000,1500,2500,3000,3500,4000,5000,5900,6500,7200,7500,8400,9000,10500,11150,11500,12000,13000,13500,14000,14500,15000,16000,16900,17500,18200,18500,18700,1900,19200,19400,20000,21100,22150];
var flameWorker = 0;
var gameOver = false;


function createFlames(x){

    var i = document.createElement("img");
    i.src= "flame.gif";
    i.className ="flame";
    i.style.marginLeft = x +"px";

    document.getElementById("background").appendChild(i);


    flameWorker = setInterval(()=>{
        
        if(gameOver == false){   
            x = x - 10;
            i.style.marginLeft = x + "px";

            if(x == 180){
                if (jumpWorker == 0){
                    gameOver = true;
                    clearInterval(runWorker);
                    runSound.pause();
                    clearInterval(backgroundWorker);
                    clearInterval(scoreWorker);
                    //clearInterval(flameWorker);
                    //flameWorker = 0;
                    dead();
                    deadSound.play();
                
                }
            }
        }    

    },50);
}

var deadImage = 1;
var deadWorker= 0;
var deadSound= new Audio("dead.mp3")

function dead(){

    deadWorker = setInterval(()=>{
        deadImage = deadImage + 1;
        
        if(deadImage == 11){
            deadImage=1;
            clearInterval(deadWorker);
            alert("Game Over! Press OK to RESTART");
            window.location.reload();
        }

        document.getElementById("boy").src= "dead"+ deadImage +".png";
    },100);
}