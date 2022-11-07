var PLAY = 1;
var END = 0;
var gameState = PLAY;

var hero, hero_running, hero_collided;
var bg, invisibleground, bgImg;
var stoneObstacle;
var gameOverImg, restartImg;
var score = 0;

function preload() {
    hero_running = loadAnimation("h1.png", "h2.png", "h3.png", "h4.png", "h5.png", "h6.png", "h7.png");
    bgImg = loadImage("bg2.jpg");
    stoneObstacle = loadImage("image-removebg-preview.png");
    restartImg = loadImage("restart.webp");
    gameOverImg = loadImage("game_over-removebg-preview.png");
    hero_collided = loadAnimation("h4.png")
}

function setup() {
    createCanvas(600, 200);


    bg = createSprite(300, 100, 600, 200)
    bg.addImage(bgImg);
    bg.scale = 1.3;


    hero = createSprite(50, 160, 20, 50);
    hero.addAnimation("running", hero_running);
    hero.addAnimation("collided", hero_collided)
    hero.scale = 0.2;
    hero.debug = true;
    hero.setCollider("circle", 0, 0, 150)

    gameOver = createSprite(300, 100);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300, 150);
    restart.addImage(restartImg);

    gameOver.scale = 0.4;
    restart.scale = 0.09;

    invisibleground = createSprite(200, 200, 400, 10);
    invisibleground.visible = false;

    stoneObstaclesGroup = new Group();
}

function draw() {
    background("black");

    if (gameState === PLAY) {
        score += Math.round(getFrameRate() / 60);
        console.log(hero.y)
        hero.changeAnimation("running");
        gameOver.visible = false;
        restart.visible = false;

        bg.velocityX = -(4 + Math.round(score / 100))

        if (bg.x <= 200) {
            bg.x = bg.width / 2;
        }



        hero.velocityY = hero.velocityY + 0.8;
        spawnstoneObstacles();
        if (stoneObstaclesGroup.isTouching(hero)) {
            gameState = END;
        }
    }
    else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        hero.changeAnimation("collided")

        bg.velocityX = 0;
        hero.velocityY = 0;

        stoneObstaclesGroup.setLifetimeEach(-1);
        stoneObstaclesGroup.setVelocityXEach(0);

        if (mousePressedOver(restart)) {
            reset();
        }

    }

    hero.collide(invisibleground);

    drawSprites();
    textSize(20);
    stroke("black");
    strokeWeight(4);
    fill("white");
    text("Score: " + score, 450, 30);
}

function reset() {
    gameState = PLAY;
    stoneObstaclesGroup.destroyEach();
    gameOver.visible = false;
    restart.visible = false;
    hero.changeAnimation("running")
}


function spawnstoneObstacles() {
    if (frameCount % 120 === 0) {
        var stone = createSprite(600, 165, 10, 40);
        stone.addImage(stoneObstacle);

        stone.velocityX = -(6 + Math.round(score / 100));

        stone.scale = 0.3;
        stone.lifetime = 300;

        stoneObstaclesGroup.add(stone);
    }
}

function keyReleased() {
    if (keyCode === 32) {
        if (hero.y >= 40) {
            hero.velocityY = -12;
        }
    }
}
