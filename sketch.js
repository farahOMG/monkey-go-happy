var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var obstacle,obstacleImage;
var banana ,bananaImage
var bananaGroup, obstacleGroup;
var score = 0;
var ground;
var background,background_image;
var Ground;
var survivalTime = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
}
function setup() {
createCanvas(400,400);

monkey = createSprite(100,320,20,20)
monkey.addAnimation("monkey",monkey_running)
monkey.scale=0.15;
  
Ground = createSprite(200,390,400,10)  
invisibleCeiling = createSprite(200,6,400,10)  
invisibleCeiling.visible = false;
  
obstacleGroup = createGroup();  
bananaGroup = createGroup();
}


function draw() {
background("white");    
background.velocityX=-5;  
background.x = background.width / 2;  
  
stroke("black");
textSize=20;
fill("black");  
survivalTime= Math.ceil(frameCount/frameRate())
text("Survival Time : " + survivalTime,10,20) 
survivalTime.debug=true; 

text("Score : " + score,350,20)
  

if(monkey.isTouching(bananaGroup))  {
bananaGroup.destroyEach();
score=  score+1;
}
  
if(monkey.isTouching(obstacleGroup))   {
monkey.setVelocity=0;
background.setVelocity=0;
obstacleGroup.setVelocity=0;
bananaGroup.setVelocity=0;
Ground.setVelocity=0;
text("Game Over",200,200);
}  
   
  
  if(keyDown("space")) {
    monkey.velocityY = -15;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8

  monkey.collide(Ground);
  monkey.collide(invisibleCeiling);

  food();
  spawn_obstacle();
  

  drawSprites();

 

} 

function food () {
if (frameCount % 80 === 0) {
banana = createSprite(300,200,10,10);
banana.addImage(bananaImage); 
banana.y=Math.round(random(120,200));
banana.velocityX=-5
banana.scale=0.1;  
banana.lifetime= 150;
bananaGroup.add(banana); 
} }

function spawn_obstacle () {
if (frameCount %300 === 0) {
obstacle = createSprite(300,380,10,10);
obstacle.addImage(obstacleImage);
obstacle.scale=0.2
obstacle.velocityX=-6
obstacle.lifetime=150;
obstacleGroup.add(obstacle);
}
}