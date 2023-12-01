class Particle {
    constructor(x, y, z, d, a_x, a_y) {
        this.location = createVector(x, y, z);
        this.startLoc = createVector(a_x, a_y, z);
        this.globeLoc = createVector(a_x * 0.5, a_y, z);

        // this.startLoc = createVector(x * 0.5, y * 0.5, z);
        // this.startLoc = p5.Vector.mult();

        // print("x = "+ this.location.x);
        // print("y = "+ this.location.y);
        // print("z = "+ this.startLoc.z);
        // print("-----------");


       // this.repelLoc = createVector(-cubeDims.x / 2 + 300, -cubeDims.y / 2 + 50, -100);
    //    this.repelLoc = createVector(-cubeDims.x*0.25,-cubeDims.y*0.1,cubeDims.z*0.5);
    this.repelLoc = createVector(0,0,cubeDims.z*0.5);
        this.velocity = p5.Vector.random3D();
        this.acceleration = p5.Vector.random3D();
        this.dims = createVector(d, d, d);
        // print(d);
        this.r = sqrt(d);
        this.targetR = this.r;
        this.mass = createVector(d, d, d);
        //  this.mass.mult(5);
        // this.maxSpeed = 15;//logo bounce for intro
        // this.maxForce = 1.3; //logo bouce for intro

         this.maxSpeed = 3; //standard good settings
        this.maxForce = 0.1; //standard good settings
        this.color = color(255);
        //
    }
    applyForce(force) {
        // print(force);
        // let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(force);
    }

    align(particles) {

        let steering = createVector();
        let perceptionRadius = 100;
        let total = 0;
        for (let other of particles) {
            let d = dist(this.location.x, this.location.y, this.location.z, other.location.x, other.location.y, other.location.z);
            if (other != this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            // steering.mult(alignSlider.value());
            return (steering);
        }

    }

    cohesion(particles) {

        let steering = createVector();
        let perceptionRadius =200;
        let total = 0;
        for (let other of particles) {
            let d = dist(this.location.x, this.location.y, this.location.z, other.location.x, other.location.y, other.location.z);
            if (other != this && d < perceptionRadius) {
                steering.add(other.location);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.location);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            // steering.mult(cohesionSlider.value());
            return (steering);
        }

    }

    separation(particles) {

        let steering = createVector();
        let perceptionRadius = 50;
        let total = 0;
        for (let other of particles) {
            let d = dist(this.location.x, this.location.y, this.location.z, other.location.x, other.location.y, other.location.z);
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.location, other.location);
                diff.div(d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            // steering.mult(separationSlider.value());
            return (steering);
        }

    }
    returnToStart(particles) {
        //   let startPositions = this.startLoc;
        let xScale = p5.Vector.mult(this.startLoc, patternScaler);
     //   this.startLoc = createVector(xScale, this.startLoc.y, this.startLoc.z);
        let steering = p5.Vector.sub(xScale, this.location);
        let slowRadius = 25;
        let distance = steering.mag();
        if (distance < slowRadius) {
            let speed = map(distance, 0, slowRadius, 0, this.maxSpeed);
            steering.setMag(speed);
        } else {
            steering.setMag(this.maxSpeed);
        }
        // steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        return (steering);
    }
    halfWidth(particles) {
        //   let startPositions = this.startLoc;
        let steering = p5.Vector.sub(this.globeLoc, this.location);
        let slowRadius = 25;
        let distance = steering.mag();
        if (distance < slowRadius) {
            let speed = map(distance, 0, slowRadius, 0, this.maxSpeed);
            steering.setMag(speed);
        } else {
            steering.setMag(this.maxSpeed);
        }
        // steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        return (steering);
    }


    // repel
    repel(particles) {
     //   this.repelLoc = createVector(mouseX - (width / 2), mouseY - (height / 2), 0);
        // print("replc = " + this.repelLoc)
        let steering = p5.Vector.sub(this.repelLoc, this.location);
        let slowRadius = 700;
        let distance = steering.mag();
        if (distance < slowRadius) {
            let speed = map(distance, 0, slowRadius, 0, this.maxSpeed);
            steering.setMag(speed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce * 2);
            steering.mult(-1);
            return (steering);

        }

    }

    // expand(particles) {
    //     let expandVal = this.r * 2;
    //     return (expandVal);
    // }


    flock(particles) {

        let sep = this.separation(particles); // Separation
        let ali = this.align(particles); // Alignment
        let coh = this.cohesion(particles); // Cohesion
        if (sep !== undefined) {
            sep.mult(separationSlider.value());
        }
        if (ali !== undefined) {
            ali.mult(alignSlider.value());

        }
        if (coh !== undefined) {
            coh.mult(cohesionSlider.value());
        }

        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);

    }

    applyGravity(particles) {
        let gr = this.gravity(particles);
        this.applyForce(gr);
    }

    applyWind(particles) {
        let wi = this.wind(particles);
        this.applyForce(wi);
    }


    applyPattern(particles) {
        let ret = this.returnToStart(particles);
        this.applyForce(ret);
    }
    applyHalfWidth(particles) {
        let hw = this.halfWidth(particles);
        this.applyForce(hw);
    }

    applyRepel(particles) {
        let rep = this.repel(particles);
        this.applyForce(rep);
    }
    applyExpand(particles) {
        this.r += 0.1;
    }
    applyBacktoNormal(particles) {
        if (this.r > this.targetR) {
            this.r -= 0.1;
        } else if (this.r < this.targetR) {
            this.r += 0.1;
        }
    }

    applyContract(particles) {
        if (this.r > 0) {
            this.r -= 0.1;
        }
    }


    wind(particles) {
        let emitter = createVector(-cubeDims.x / 2 + 100, this.location.y, 0);
        let steering = p5.Vector.sub(emitter, this.location);
        let slowRadius = 100;
        let distance = steering.mag();
        if (distance < slowRadius) {
            let speed = map(distance, 0, slowRadius, 0, this.maxSpeed);
            steering.setMag(speed);
        } else {
            steering.setMag(this.maxSpeed);
        }
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        steering.mult(-1);
        // let steering = createVector(0.1, 0, 0);
        return (steering);
    }

    gravity(particles) {

        // if (gravityCheck.checked()) {
        // let sinOffset = sin(sinCount) * (random(-0.2, 0.2));
        let sinOffset = map(noise(sinCount), 0.48, 0.52, 0, 1);
        // let sinOffsetEq = 
        let sinOffsetMult = sinOffset * 0.0005;
        let gravity = createVector(sinOffsetMult, -0.001, 0);
        let weight = p5.Vector.mult(gravity, this.mass);
        sinCount += 0.1;
        return (weight);
        // }
    }

    // applyAttraction(particles) {
    //     let att = this.attract(particles);
    //     this.applyForce(att);
    // }
    // attract() {
    //     let steering = p5.Vector.sub(this.startLoc, this.location);
    //     let slowRadius = 30;
    //     let distance = steering.mag();
    //     if (distance < slowRadius) {
    //         let speed = map(distance, 0, slowRadius, 0, this.maxSpeed);
    //         steering.setMag(speed);
    //     } else {
    //         steering.setMag(this.maxSpeed);
    //     }
    //     steering.sub(this.velocity);
    //     steering.limit(this.maxForce);
    //     return (steering);
    // }

    update() {
        let centerS = createVector(0, 0, 0);
        let alpha = p5.Vector.sub(this.location, this.startLoc);
        let dist = alpha.mag();
        // this.color = color(255, 255 - map(dist, 0, 250, 0, 255));
        this.velocity.limit(this.maxSpeed); //limits the strength of the velocity

        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);


        this.acceleration.mult(0);

    }

    show() {
        push();
        noStroke();
        fill(this.color);
        translate(this.location.x, this.location.y, this.location.z);
        sphere(this.r / 2);
        pop();
        //repel emitter
        // push();
        // noStroke();
        // fill(255,0,0);
        // translate(this.repelLoc.x, this.repelLoc.y, this.repelLoc.z);
        // sphere(this.r * 20);
        // pop();
    }



    checkCollision() {
        //bounce
            if (this.location.x >= cubeDims.x / 2 - (this.dims.x / 4)) {
                this.location.x = cubeDims.x / 2 - (this.dims.x / 4);
                this.velocity.x = this.velocity.x * -1;
            } else if (this.location.x <= -cubeDims.x / 2 + (this.dims.x / 4)) {
                this.location.x = -cubeDims.x / 2 + (this.dims.x / 4);
                this.velocity.x = this.velocity.x * -1;
            }
            if (this.location.y >= cubeDims.y / 2 - (this.dims.y / 4)) {
                this.location.y = cubeDims.y / 2 - (this.dims.y / 4);
                this.velocity.y = this.velocity.y * -1;
            } else if (this.location.y <= -cubeDims.y / 2 + (this.dims.y / 4)) {
                this.location.y = -cubeDims.y / 2 + (this.dims.y / 4);
                this.velocity.y = this.velocity.y * -1;
            }
            if (this.location.z >= cubeDims.z / 2 - (this.dims.z / 4)) {
                this.location.z = cubeDims.z / 2 - (this.dims.z / 4);
                this.velocity.z = this.velocity.z * -1;
            } else if (this.location.z <= -cubeDims.z / 2 + (this.dims.z / 4)) {
                this.location.z = -cubeDims.z / 2 + (this.dims.z / 4);
                this.velocity.z = this.velocity.z * -1;
            }
        }
        //tunnel

    //     if (this.location.x >= cubeDims.x / 2) {
    //         this.location.x = -cubeDims.x / 2;
    //     } else if (this.location.x <= -cubeDims.x / 2) {
    //         this.location.x = cubeDims.x / 2;
    //     }
    //     if (this.location.y >= cubeDims.y / 2) {
    //         //opens base
    //         // this.location.y = -cubeDims.y / 2;
    //         //closes base
    //         this.location.y = cubeDims.y / 2 - (this.dims.y / 4);
    //         this.velocity.y = this.velocity.y * -1;
    //     } else if (this.location.y <= -cubeDims.y / 2) {
    //         //gas up opens top
    //         // this.location.y = cubeDims.y / 2;
    //         //closes lid
    //         this.location.y = -cubeDims.y / 2 + (this.dims.y / 4);
    //         this.velocity.y = this.velocity.y * -1;
    //     }
    //     if (this.location.z >= cubeDims.z / 2) {
    //         this.location.z = cubeDims.z / 2;
    //         this.velocity.z = this.velocity.z * -1;
    //     } else if (this.location.z <= -cubeDims.z / 2) {
    //         this.location.z = -cubeDims.z / 2;
    //         this.velocity.z = this.velocity.z * -1;
    //     }
    // }
}


//------------------------
//settings tests
//------------------------
//faster
//4000 particles
//globe:  this.acceleration.setMag(0.01);
//globe:  this.velocity.limit(3);//limits the strength of the velocity
//------------------------

//slower
//8000 particles
//globe:  this.acceleration.setMag(0.005);//sets the strength of the acceleration
//globe:  this.velocity.limit(1);//limits the strength of the velocity