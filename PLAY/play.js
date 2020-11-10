//Creating animations

//animations like p5 images should be stored in variables
//in order to be displayed during the draw cycle
var snake, moon;
var fr = 15;

//it's advisable (but not necessary) to load the images in the preload function
//of your sketch otherwise they may appear with a little delay
function preload() {

    //create an animation from a sequence of numbered images
    //pass the first and the last file name and it will try to find the ones in between
    snake = loadAnimation('assets/snake_1.png', 'assets/snake_2.png', 'assets/snake_3.png');
    snake.looping = false;
    moon = loadAnimation('assets/moon_1.png', 'assets/moon_5.png');
    moon.looping = false;



}

function setup() {
    createCanvas(windowWidth, windowHeight);

}

function draw() {
    background(255, 255, 255);

    //specify the animation instance and its x,y position
    //animation() will update the animation frame as well
    if (moon.getFrame() == moon.getLastFrame())
        moon.changeFrame(5);

    if (mouseIsPressed)
        snake.goToFrame(0);
    else
        snake.goToFrame(snake.getLastFrame());



    animation(moon, 400, 450);
    animation(snake, 300, 150);

}

function mousePressed() {
    //rewind on mouse pressed - change frame to 0
    moon.rewind();


}
