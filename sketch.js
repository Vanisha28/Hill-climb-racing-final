var background, backgroundImg;
var car, carImg;
var ground, groundImg;
var story, storyImg;
var bg, bgImg
var gameover, gameoverImg;
var restart, restartImg;
var start, startImg;
var playagain, playagainImg;
var gameState = 0;
var score = 0;
var CoinsGroup, DiamondsGroup, PoliceGroup;
var gameState = "start";

var flag=false;

function preload(){
backgroundImg = loadImage("images/bg 2.jpg");
carImg = loadAnimation("images/car1.png","images/car2.png","images/car3.png");
groundImg = loadImage("images/ground 3.png");
coinImg = loadImage("images/coin.png");
diamondImg = loadImage("images/diamond.png");
policeImg = loadAnimation("images/p1.png","images/p2.png","images/p3.png","images/p4.png","images/p5.png","images/p6.png","images/p7.png");
storyImg = loadImage("images/story_slide.png");
bgImg = loadImage("images/youwin_bg.jpg");
startImg = loadImage("images/start.png");
gameoverImg = loadImage("images/gameover.png");
restartImg = loadImage("images/restart.png");
playagainImg = loadImage("images/play again.png");
sound1 = loadSound("sounds/bgsound.mp3");
sound2 = loadSound("sounds/coinclicksound.wav");
sound3 = loadSound("sounds/diamondclicksound.mp3");
sound4 = loadSound("sounds/gameoversound.wav");
sound5 = loadSound("sounds/winningsound.mp3");
}

function setup() {
createCanvas(displayWidth,displayHeight-150);
ground = createSprite(displayWidth/2, displayHeight/2, displayWidth, 10);
ground.scale = 1.8;
ground.addImage(groundImg);

car = createSprite(200, 500, 50, 50);
car.addAnimation("car",carImg);

invisibleGround = createSprite(displayWidth/2, displayHeight/2+130, displayWidth, 10);
car.setCollider("rectangle",0,0,120,120);
invisibleGround.visible = false;

CoinsGroup = new Group();
DiamondsGroup = new Group();
PoliceGroup = new Group();

startButton = createSprite(1200,550);
startButton.addImage(startImg);
startButton.scale = 0.7;

restartButton = createSprite(650,500);
restartButton.addImage(restartImg);
restartButton.scale = 0.7;

playagainButton = createSprite(650,550);
playagainButton.addImage(playagainImg);
playagainButton.scale = 1;
sound1.play();

}

function draw() {
if(gameState === "start"){
background(storyImg);
startButton.visible = true;
restartButton.visible = false;
playagainButton.visible = false;
car.visible = false;
ground.visible = false;

if(mousePressedOver(startButton)){
gameState = "play";
}
}
if(gameState === "play"){
background(backgroundImg);
sound1.stop();
startButton.visible = false;
restartButton.visible = false;
playagainButton.visible = false;

car.visible = true;
ground.visible = true;


if(ground.x<600){
ground.x = 700;
}
ground.velocityX = -15;

if(keyDown("up_arrow")&& car.y >= 400){
car.velocityY = -17;
}

// console.log(car.y);
car.velocityY = car.velocityY+0.5;
car.collide(invisibleGround);

for(var i=0; i<DiamondsGroup.length; i++){
if(DiamondsGroup.isTouching(car)){
sound3.play();
score = score+15;
DiamondsGroup.get(i).destroy();
}
}

for(var j=0; j<CoinsGroup.length; j++){
if(CoinsGroup.isTouching(car)){
sound2.play();
score = score+10;
CoinsGroup.get(j).destroy();
}
}


textSize(35);
fill ("black");
textFont("ALGERIAN");
text ("Score : "+score,displayWidth-300,50);



SpawnCoins();
SpawnDiamonds();
Spawnpolice();

if(PoliceGroup.isTouching(car)){
gameState = "end";
sound4.play();
}
if(score >= 100){
 
gameState="win"
sound5.play()
}
}
console.log(gameState)
if(gameState === "end"){
sound2.stop();
sound3.stop();
background(gameoverImg);
restartButton.visible = true;
if(mousePressedOver(restartButton)){

reset()

}
car.visible = false;
car.velocityY = 0;
CoinsGroup.destroyEach();
DiamondsGroup.destroyEach();
ground.visible = false;
ground.velocityX = 0;
PoliceGroup.destroyEach();
PoliceGroup.setVelocityXEach(0);
}

if(gameState==="win"){

background(bgImg)


playagainButton.visible=true
car.visible=false;
car.velocityY = 0;
CoinsGroup.destroyEach();
DiamondsGroup.destroyEach();
ground.visible=false;
ground.velocityX = 0;
PoliceGroup.destroyEach();
PoliceGroup.setVelocityXEach(0);
if(mousePressedOver(playagainButton)){
// loop()
reset()
}
}

drawSprites();

}


function SpawnCoins(){
if(frameCount % 200 === 0){
var coin = createSprite(displayWidth,Math.round(random(300,100)))
coin.addImage(coinImg);
coin.scale = 0.5;
coin.velocityX = -3;
coin.depth = car.depth;
car.depth = car.depth+1;
CoinsGroup.add(coin);
}
}


function SpawnDiamonds(){
if(frameCount % 300 === 0){
var diamond = createSprite(displayWidth,Math.round(random(450,300)))
diamond.addImage(diamondImg);
diamond.scale = 0.5;
diamond.velocityX = -3;
diamond.depth = car.depth;
car.depth = car.depth+1;
DiamondsGroup.add(diamond);
}
}


function Spawnpolice(){
if(frameCount % 400 === 0){
var police = createSprite(displayWidth,430);
police.addAnimation("police_walking",policeImg);
police.velocityX = -12;
police.scale = 1.5;
PoliceGroup.add(police);
}
}


function reset(){
gameState="start";
gameState="play"
score=0;

}

function sound(){
sound5.play();
// noLoop()
}