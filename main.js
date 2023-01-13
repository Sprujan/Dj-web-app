song_1_status = "";
song_2_status = "";
score_leftwrist = 0;
score_rightwrist = 0;
leftwrist_x = 0;
leftwrist_y = 0;
rightwrist_x = 0;
rightwrist_y = 0;

song_1 = "";
song_2 = "";

function preload(){
    song_1 = loadSound("Xenogenesis.mp3");
    song_2 = loadSound("happy.mp3");
}

function setup(){
    canvas = createCanvas(600, 550);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    Posenet = ml5.poseNet(video, modelLoaded);
    Posenet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("Posenet is initialised.");
}

function gotPoses(results){
    if(results.length > 0){
        score_leftwrist = results[0].pose.keypoints[9].score;
        leftwrist_x = results[0].pose.leftWrist.x;
        leftwrist_y = results[0].pose.leftWrist.y;
        rightwrist_y = results[0].pose.rightWrist.y;
        rightwrist_x = results[0].pose.rightWrist.x;
        score_rightwrist = results[0].pose.keypoints[10].score;
    }
}

function draw(){
    image(video, 0, 0, 600, 550);
    fill("red");
    stroke("red");
    song_1_status = song_1.isPlaying();
    if(score_leftwrist > 0.2){
        circle(leftwrist_x, leftwrist_y, 25);
        song_2.stop(); 
        if(song_1_status == false){
            song_1.play();
            document.getElementById("heading_2").innerHTML = "Playing Xenogenesis";
        }
    }
    song_2_status = song_2.isPlaying();
    if(score_rightwrist > 0.2){
        circle(rightwrist_x, rightwrist_y, 25);
        song_1.stop();
        if(song_2_status == false){
            song_2.play();
            document.getElementById("heading_2").innerHTML = "Playing Happy song";
        }
    }
}