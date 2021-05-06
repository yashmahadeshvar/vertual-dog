var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;
var food_stock_val;
var fedTime

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDogButton=createButton("feed Food");
  feedDogButton.position(700,95);
  feedDogButton.mousePressed(decreaseFood);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background("gold");
  foodObj.display();
  getCount();
  
    text("Last Feed : "+lastFed,350,30);
  
  drawSprites();
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function decreaseFood(){

  dog.addImage(happyDog);

  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
     foodObj.updateFoodStock(food_stock_val *0);
  }else{
     foodObj.updateFoodStock(food_stock_val -1); 
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()

  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


 //write code to read fedtime value from the database 
function getCount(){
  var fedTimeRef = database.ref('FeedTime');
  fedTimeRef.on("value",function(data){
      lastFed = data.val();
  })
}


