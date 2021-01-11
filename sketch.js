var sword, swordImage, gameoverImage
var enemy, enemyImage, enemygroup
var fruit, fruit1Image, fruit2Image, fruit3Image, fruit4Image, fruitgroup
var END = "end"
var PLAY = "play"
var gamestate = PLAY
var score = 0

function preload() {
  swordImage = loadImage("sword.png")
  gameoverImage = loadImage("gameover.png")
  enemyImage = loadImage("alien1.png", "alien2.png")
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")
  swordSound = loadSound("knifeSwooshSound.mp3")
  enemySound = loadSound("gameover.mp3")

}

function setup() {

  createCanvas(400, 400);

  sword = createSprite(40, 200, 20, 20)
  sword.addImage(swordImage)
  sword.scale = 0.7


  enemygroup = new Group()
  fruitgroup = new Group()
}

function draw() {
  background("brown");
  text("Score: " + score, 300, 50);

  if (gamestate === PLAY) {
    sword.y = mouseY
    sword.x = mouseX
    fruits();
    enemys();
  }

  if (fruitgroup.isTouching(sword)) {
    fruitgroup.destroyEach();
    swordSound.play();
    score = score + 2
    
  }

  if (enemygroup.isTouching(sword)) {
    enemygroup.velocityX = 0
    fruitgroup.velocityX = 0
    enemySound.play();
    gamestate = END
  }

  if (gamestate === END) {
    fruitgroup.destroyEach();
    enemygroup.destroyEach();
    sword.addImage(gameoverImage)
    sword.x = 200
    sword.y = 200
  }
  
  drawSprites();
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    position = Math.round(random(1,2))
    var fruit = createSprite(400, 200, 20, 20)
    fruit.scale = 0.2
    fruit.setLifetime = 100;
    fruitgroup.add(fruit)
    
    if(position===1){
      fruit.x=400
      fruit.velocityX = -(7+(score/4))
    }
    else{
      if(position===2){
      fruit.x=0
      fruit.velocityX = (7+(score/4))

      }
    }

    r = Math.round(random(1, 4))
      if (r == 1){
     fruit.addImage(fruit1Image);
    }
      if (r == 2){
     fruit.addImage(fruit2Image);
    }
      if (r == 3){
     fruit.addImage(fruit3Image);
    }
      if (r == 4){
     fruit.addImage(fruit4Image);
    }
  }


}

function enemys() {
  if (World.frameCount % 100 === 0) {
    var enemy = createSprite(400, 200, 20, 20)
    enemy.addImage(enemyImage)
    enemy.y = Math.round(random(100, 300))
    enemy.velocityX = -(8+(score/10))
    enemy.setLifetime = 50;

    enemygroup.add(enemy)
  }
}