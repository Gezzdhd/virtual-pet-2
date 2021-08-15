//Create variables here
var dog, happyDog, foodS, foodStock
var database, dogImg1, dogImg2
var feedTime, lastFed, addFood, feed, foodObject
function preload()
{
	dogImg1= loadImage("images/dogImg.png")
  dogImg2= loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database()
  dog= createSprite(300,300,10,10)
  foodObject= new Food()
dog.addImage(dogImg1)
dog.scale=0.3
foodStock=database.ref('Food')
foodStock.on("value", readStock)
feed=createButton("feed the dog")
feed.position(700,95)
feed.mousePressed(feedDog)
addFood=createButton("addFood")
addFood.position(800,95)
addFood.mousePressed(addFood)
}


function draw() {  
background(46,139,87)
foodObject.display()
feedTime=database.ref("feedTime")
feedTime.on("value", function(data){
  lastFed=data.val()
})
fill(255,255,254)
textSize(15)
if(lastFed>=12){
  text("Last Feed:"+lastFed%12+"PM", 350,350)

  }
  else if(lastFed==0){
    text("Last Feed :12 AM",350,30)
  }
else{
  text("Last Feed:" + lastFed+"AM",350,30)
}
drawSprites()
}
function readStock(data){
  foodS=data.val()
  foodObject.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(happyDog)
  if(foodObject.getFoodStock()<=0){
    foodObject.updateFoodStock(foodObject.getFoodStock()*0)
  }
  else{
    foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  }
  database.ref("/").update({
    Food: foodObject.getFoodStock(),FeedTime:hour()
  })

  
}

function addFood(){
  foodS++
  database.ref("/").update({
    Food: foodS
  })
}