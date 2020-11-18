//Creating animations

//animations like p5 images should be stored in variables
//in order to be displayed during the draw cycle
var snake, moon, ribs;
var fr = 15;


//Terminal command to install p5.serialserver: npm install p5.serialserver
//Terminal command to start server: node~/node_modules/p5.serialserver / startserver.js


var serial; // variable to hold an instance of the serialport library
var options = {
    baudrate: 9600
}; // set baudrate to 9600; must match Arduino baudrate
var portName = 'COM3';
let latestData = "waiting for data";
//it's advisable (but not necessary) to load the images in the preload function
//of your sketch otherwise they may appear with a little delay
function preload() {

    //create an animation from a sequence of numbered images
    //pass the first and the last file name and it will try to find the ones in between

    ribs = loadAnimation('assets/ribs_1.png', 'assets/ribs_4.png');
    ribs.looping = false;



}

function setup() {
    createCanvas(windowWidth, windowHeight);

    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('data', gotData); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.open(portName, options); // open a serial port @ 9600

}

function draw() {
    background(15, 16, 37);
    //
    //    //    //print(inData);
    //
    //
    //    //specify the animation instance and its x,y position
    //    //animation() will update the animation frame as well
    if (ribs.getFrame() == ribs.getLastFrame())
        ribs.changeFrame(4);



    animation(ribs, 400, 450);
}

function reAnimation() {
    //rewind on mouse pressed - change frame to 0
    ribs.rewind();


}
// We are connected and ready to go
function serverConnected() {
    print("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
    print("List of Serial Ports:");
    // theList is an array of their names
    for (let i = 0; i < thelist.length; i++) {
        // Display in the console
        print(i + " " + thelist[i]);
    }
}

// Connected to our serial device
function gotOpen() {
    print("Serial Port is Open");
}

function gotClose() {
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
    print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
    let currentString = serial.readLine(); // read the incoming string
    trim(currentString); // remove any trailing whitespace
    if (!currentString) return; // if the string is empty, do no more
    console.log(currentString); // print the string
    latestData = currentString; // save it for the draw method

    if (currentString = latestData) reAnimation;

}





function serialEvent() {
    try {
        var inData = port.readStringUntil('\n');
        inData = trim(inData); // cut off white space (carriage return)

        if (inData.charAt(0) == 'S') { // leading 'S' means Pulse Sensor data packet


            inData = inData.substring(1); // cut off the leading 'S'
            var Sensor = int(inData); // convert the string to usable int
        }


        if (inData.charAt(0) == 'B') { // leading 'B' for BPM data
            inData = inData.substring(1); // cut off the leading 'B'
            BPM = int(inData); // convert the string to usable int
            beat = true; // set beat flag to advance heart rate graph
            heart = 20; // begin heart image 'swell' timer
        }


        if (inData.charAt(0) == 'Q') { // leading 'Q' means IBI data
            inData = inData.substring(1); // cut off the leading 'Q'
            IBI = int(inData); // convert the string to usable int


        }

        console.log(Sensor);


        console.log(inData);


    } catch (err) {
        //        console.log(toString());
    }

} // END OF SERIAL EVENT
function serverConnected() {
    print('connected to server.');
}

function portOpen() {
    print('the serial port opened.')
}

function serialError(err) {
    print('Something went wrong with the serial port. ' + err);
}

function portClose() {
    print('The serial port closed.');
}

function closingCode() {
    serial.close(portName);
    return null;
}
