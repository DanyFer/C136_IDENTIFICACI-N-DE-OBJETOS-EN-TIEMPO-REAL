objectDetector= "";
img = "";
objects = [];
statu = "";

function preload()
{
   //img = loadImage("Tofu_Miet.png");
   video = createVideo("https://nellygila.github.io/ADV_MP3_IMAGE/Un_mundo_sin_espejo.mp4");
   
}
function setup()
{
    canvas = createCanvas(850, 480);
	canvas.center();
    //video.size(850, 480);
    video.hide();

    
}
function go()
{
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML ="Estatus: detectando objetos"
}

function modelLoaded()
{
    console.log("cargando...");
    statu = true;
    objectDetector.detect(video, gotResult);
    video.loop();
    video.speed(0.8);
    video.volume(10);

    
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;

}

function draw()
{
    image(video, 0, 0, 850, 480);


    if(statu !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Estatus: objeto detectado"; 
            document.getElementById("number_of_objects").innerHTML = "El número de objetos detectados es:" + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height)
        }
        
    } 

    
    
}   