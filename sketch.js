var score;

var bscore;

var bg, bg_img;

var monkey, monkey_running;

var bananaGroup, banana_img;

var stoneGroup, stone_img;

var ground;

var PLAY=0;

var END=1;

var gameState=PLAY;

var sc;

function preload(){
  
  bg_img = loadImage("jungle.jpg");
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  banana_img=loadImage("banana.png");
  
  stone_img=loadImage("stone.png");
  
}

function setup() {
  
  createCanvas(displayWidth,displayHeight-200);
  
  score=0;
  
  bscore=0;
  
  bg = createSprite(100,180,400,20);
  bg.addImage("bg",bg_img);
  bg.scale=1.9;
  bg.x = bg.width /2;
  bg.velocityX = -1;
  
  monkey=createSprite(400,350);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.09;
  
  ground=createSprite(400,580,displayWidth,10);
  ground.visible=false;
  
  bananaGroup=new Group();
  stoneGroup=new Group();
  
  sc=0;
  
}

function draw() {
  camera.x=monkey.x;  
  background("white");
  
  if(gameState===PLAY){
    spawnBanana();
    spawnStone();

    if (bg.x < 400){
      bg.x = bg.width/2;
    }

    if(keyDown("space")) {
      monkey.velocityY = -10;
    }

    monkey.velocityY = monkey.velocityY + 0.3;

    if(monkey.isTouching(bananaGroup)){
      bananaGroup.removeSprites();
      score=score+2;
      bscore=bscore+1;
      switch(score){
        case 2 : monkey.scale=0.11;
          break;
        case 4: monkey.scale=0.13;
          break;
          case 6 : monkey.scale=0.15;
          break;
        case 8:monkey.scale=0.17;
          break;
        case 10:monkey.scale=0.19;
          break;
        case 12:monkey.scale=0.21;
          break;
        case 14:monkey.scale=0.23;
          break;
        case 16:monkey.scale=0.25;
          break;
        case 18:monkey.scale=0.27;
          break;
        case 20:monkey.scale=0.29;
          break;
        default : break;
      }
    }
    
    if(monkey.isTouching(stoneGroup)){
      sc=sc+1;
      switch(sc){
        case 1 : monkey.scale=0.09;
                score=score-2;
                stoneGroup.removeSprites();
            break;
          case 2: gameState=END
          break;
          default : break;
          
      }
  
      
    }

   
    monkey.collide(ground);
  }
  else
  if(gameState===END){
    bg.velocityX=0;
    monkey.velocityY=0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
  
  fill("red");
  stroke("black");
  textSize(40);
  text("Score : "+score,880,50);
  
  fill("blue");
  stroke("black");
  textSize(40);
  text("Total Bananas : "+bscore,800,100);
  
  textSize(100);
  fill("yellow");
  stroke("black");
  strokeWeight(10);
  if(gameState===END)
    text("You Lost!",200,300)  

  textSize(40);
  fill("blue");
  stroke("black");
  strokeWeight(5)
  text("You have only 1 Life", -300,50)
  
}

function spawnBanana() {
  
  if (frameCount % 120 === 0) {
    var banana = createSprite(camera.x+width/2,200);
    banana.setCollider("rectangle",0,50,1000,300);
    banana.y = Math.round(random(200,500));
    banana.addImage(banana_img);
    banana.scale = 0.08;
    banana.velocityX = random(-3,-6);
    banana.lifetime = 800;
    bananaGroup.add(banana);
  } 
  
}

function spawnStone() {
  
  if (frameCount % 100 === 0) {   
    var stone = createSprite(camera.x+width/2,500);
    stone.setCollider("rectangle",-10,0,400,350);
    stone.addImage(stone_img);
    stone.scale = 0.5;
    stone.velocityX = random(-4,-8);
    stone.lifetime = 800;
    stoneGroup.add(stone);
    monkey.depth=stone.depth;
    monkey.depth=monkey.depth+1;
  } 
  
}