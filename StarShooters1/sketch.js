var playerShip, bullet, playerShipIMG, backGroundIMG, bulletIMG;
var enemy, enemyGroup, bulletGroup, enemy1IMG, enemy2IMG, enemy3IMG;
var life = 3;
var gameState = "play";
var gameOver, restart, gameOverIMG, restartIMG;
var score = 0;
var getReady, start, getReadyIMG, startIMG;

function preload() {
  playerShipIMG = loadImage("images/playerShip.png");	
  enemyIMG1 = loadImage("images/enemy_1.png");	
  enemyIMG2 = loadImage("images/enemy_2.png");	
  enemyIMG3 = loadImage("images/enemy3.png");	
  backGroundIMG = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png");
  bulletIMG = loadImage("images/laser3.png");
  gameOverIMG = loadImage("images/gameOver.png");
  restartIMG = loadImage("images/yellowRestartButton.png");
  startIMG = loadImage("images/start.png");
  getReadyIMG = loadImage("images/getReady.png");
}

function setup() {
  createCanvas(500, 700);

  bg = createSprite(200,350,500,1400);
  bg.addAnimation("background", backGroundIMG);
  bg.scale = 0.5;
  bg.velocityY = 2;
  bg.y = bg.height/2;

  playerShip = createSprite(250,600,50,50);
  playerShip.debug = true;
  playerShip.addImage("spaceship", playerShipIMG);

  gameOver = createSprite(250, 350, 20, 20);
  gameOver.addImage("gameOver", gameOverIMG);
  gameOver.visible = false;

  restart = createSprite(250, 450, 20, 20);
  restart.addImage("restart", restartIMG);
  restart.scale = 0.17;
  restart.visible = false;

  getReady = createSprite(250,350, 20,20);
  getReady.visible = false;
  
  start = createSprite(250, 450, 20, 20);
  start.visible = false;

  

  enemyGroup = new Group();

  bulletGroup = new Group();
}


function draw() {
  
  background(0);
  
  if(gameState === "play") {
    
    if(keyWentDown("space")) {
      bullet = createSprite(playerShip.x, playerShip.y, 50, 50);
      bullet.visible = false;
      bullet.visible = true;
      bullet.debug = true;
      bullet.setCollider("rectangle", 0, 0, 120, 340);
      bullet.addImage(bulletIMG);
      bullet.scale = 0.15;
      bullet.velocityY = -7;
      bulletGroup.add(bullet);
    }

    if(enemyGroup.collide(playerShip)) {
      life = life -1;
      //playerShip.x = 250;
      //playerShip.y = 600;
      //console.log("hello");
      enemyGroup.destroyEach();
    }

    if(enemyGroup.isTouching(bulletGroup)) {
      enemyGroup.destroyEach();
      bulletGroup.destroyEach();
      score+=100;
    }
    
    

    spawnEnemies();

    if(life === 0) {
      gameState = "end";
    }
  }
  
  playerShip.x = mouseX;
  playerShip.y = mouseY;

  console.log(gameState);
  // if(score === 1000) {
  //   getReady.visible = true;
  //   start.visible = true;
  // }

  if(bg.y > 350) {
    bg.y = bg.height/2;
  }
  
  if(gameState === "end") {
    gameOver.visible = true;
    restart.visible = true;
  }

  if(mousePressedOver(restart)) {
    reset();
  }

  drawSprites(); 
 
  fill("White")
  text("Lives : "+life, 50,50);
  text("Score : "+score, 50,100);
  
}

function spawnEnemies() {
  if(frameCount % 100 == 0) {
    enemy = createSprite(random(0, 500), 10, 50, 50);
    enemy.debug = true;
    enemy.velocityY = 5;
    var rand = Math.round(random(1,3));
    switch(rand) {
     case 1 : enemy.addImage(enemyIMG1); 
       break;
     case 2 : enemy.addImage(enemyIMG2);
       break;
     case 3 : enemy.addImage(enemyIMG3);
       break;
     default : break;
    }
    enemyGroup.add(enemy);
    enemy.lifetime = 140;
  }
}

function reset() {
  gameState = "play";
  gameOver.visible = false;
  restart.visible = false;
  life = 3;
  score = 0;
}






