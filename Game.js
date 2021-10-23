class Game {
  constructor() {
    this.resetButton = createButton("")
    this.resetTitle = createElement("h2")
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("LEAVE GAME")
    this.resetTitle.position(width/2 + 500, 20)
    this.resetTitle.class("customButton")

  }

  play() {
    this.handleElements();
    this.handleReset();
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
        if(index === player.index){
          camera.position.y = cars[index - 1].position.y
        }

      }

      this.handlePlayerControls();

      drawSprites();
    }
  }
  handleReset(){
    console.log("h")
    this.resetButton.mousePressed(()=>{
     database.ref("/").set({
       playerCount: 0, gameState: 0
     });
     //window.location.reload(); 
    })
      }
  handlePlayerControls() {
    // handling keyboard events
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
    if (keyIsDown(LEFT_ARROW) & player.positionX > width/3 - 50) {
      player.positionX -= 10;
      player.update();

    }
    if (keyIsDown(RIGHT_ARROW)& player.positionX < width/2 + 250 ) {
      player.positionX += 10;
      player.update();
    }
    if (keyIsDown(DOWN_ARROW)) {
      player.positionY -= 10;
      player.update();
    }
  



  }
  
 
}

