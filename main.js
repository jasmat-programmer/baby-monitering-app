
objects = [];
status = "";
audio = ""
function preload(){
    audio = loadSound("Alarm.mp3")
}
function setup(){
 canvas = createCanvas(380,380);
 canvas.center();
 video = createCapture(VIDEO);
 video.size(380,380);
 video.hide()
 objectDetector = ml5.objectDetector('cocossd',modelLoaded);
 document.getElementById("status").innerHTML = "status = detecting object";
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "status = detecting object";
}

function draw(){
    image(video,0,0,380,380);
     if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video , gotResult);
     for( i = 0; i < objects.length ; i++){
        document.getElementById("status").innerHTML = "status = person detected";
        document.getElementById("numOfObjects").innerHTML = "person found "+objects.length;
        audio.pause()
      
        fill(r,g,b)
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y)
        noFill();
        stroke(r,g,b);
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    
    }
     }
     else{
        document.getElementById("status").innerHTML = "status = person not detected";
        document.getElementById("numOfObjects").innerHTML = "person not found ";
        audio.play()
     }
}
function modelLoaded(){
    console.log("Model loaded !!");
    status = true;
}
function gotResult(error , results){
    if (error){
        console.log("yo there is a error!!");
    }
    console.log(results);
    objects = results;
}



