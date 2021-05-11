var ball;
var database, position
function setup(){
    createCanvas(500,500);
    //created a database out of firebase
    database=firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //.ref- is used to refer to a particular property in a database
    //.on is a listener that will listen to the changes happening in the referred property
    var ballPosition=database.ref('felix/position')
    //whatever needs to be done if there is a change in the value is written in the () after "value",
    ballPosition.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if ( position !== undefined )
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}



//write part of the database
function writePosition(x,y){
    //.set is used to set the value of a particular property in database
    database.ref('felix/position').set({
        'x':position.x+x,
        'y':position.y+y
    })
}

//read part of the database
function readPosition(data){
    position = data.val();
    //the position of ball and the changed position in database should be same
    //so that in the other tab it's reflected 
    ball.x=position.x;
    ball.y=position.y;
}

function showError(){
    console.log("this is how an error in a database will look")
}