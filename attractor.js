class Attractor {
    constructor(x, y, z, m) {
        this.attractorLoc = createVector(x, y, z);
        //  this.attractorLoc.mult(100);
        this.attractorDims = createVector(10, 10, 0);
        this.attraction = createVector(0, 0, 0);
        this.mass = m * 10;

        // this.r = sqrt(m) * 10;
        this.r = 10;
        this.fade = 10;
    }


    attract() {
        // let steering = p5.Vector.sub(this.startLoc, this.location);
        // let slowRadius = 30;
        // let distance = steering.mag();
        // if (distance < slowRadius) {
        //     let speed = map(distance, 0, slowRadius, 0, this.maxSpeed);
        //     steering.setMag(speed);
        // } else {
        //     steering.setMag(this.maxSpeed);
        // }
        // steering.sub(this.velocity);
        // steering.limit(this.maxForce);
        // return (steering);
    }

    update() {
        // this.attractorLoc = createVector(mouseX - width / 2, mouseY - height / 2, 0);
        // attraction = p5.Vector.sub(this.attractorLoc, this.location);
        // diff.div(10);
    }

    show() {
        push();
        noStroke();
        translate(this.attractorLoc.x, this.attractorLoc.y, this.attractorLoc.z);
        // tint(255, this.fade);
        // image(img, -img.width * 0.5, -img.height * 0.5, img.width * 0.75, img.height * 0.75);
        fill(250, 0, 0);
        sphere(this.r / 2);
        pop();
    }



}




// function getForces() {
//     for (let i = 0; i < flock.length; i++) {
//         //gravity
//         if (keyIsPressed === true && keyCode == 71) {

//             let gravity = createVector(0, .2, 0);
//             let weight = p5.Vector.mult(gravity, flock[i].mass);
//             flock[i].applyForce(weight);
//         }
//         //wind
//         if (keyIsPressed === true && keyCode == 87) {
//             let wind = createVector(noise(xoff) * 10, 0, 0);
//             flock[i].applyForce(wind);
//             xoff += 0.1;
//         }
//         //attraction
//         for (let j = 0; j < attractors.length; j++) {
//             //seek
//             //  attractors[j].attractorLoc = createVector(mouseX - width / 2, mouseY - height / 2, 0);

//             let attraction = p5.Vector.sub(attractors[j].attractorLoc, flock[i].location);
//             let distance = attraction.mag();
//             let slowRadius = 250;
//             attraction.sub(flock[i].velocity);

//             if (keyIsPressed === true && keyCode == 65) {
//                 if (distance < slowRadius) {
//                     let slowMag = map(distance, 0, slowRadius, 0, flock[i].maxSpeed)
//                     attraction.setMag(slowMag);
//                     //print(d);
//                 } else {
//                     attraction.setMag(flock[i].maxSpeed);
//                 }
//                 flock[i].applyForce(attraction);

//             }

//             //repulsion
//             if (keyIsPressed === true && keyCode == 82) {
//                 if (distance > slowRadius) {
//                     attraction.mult(0);
//                 } else {
//                     attraction.setMag(flock[i].maxSpeed);
//                 }
//                 attraction.mult(-1);
//                 flock[i].applyForce(attraction);

//             }

//         }

//     }

//     for (let i = 0; i < attractors.length; i++) {
//         attractors[i].update();
//          attractors[i].show();
//         if (keyIsPressed === true && keyCode == 82) {
//             // if (attractors[i].fade < 255) {
//             //     attractors[i].fade += 2;
//             // }
//             // attractors[i].show();
//         }
//         // else {
//         //     attractors[i].fade = 0;
//         // }
//     }
// }