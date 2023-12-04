class Particle {
    constructor(x, y, z, d, a_x, a_y) {
        this.location = createVector(x, y, z);
        this.startLoc = createVector(a_x, a_y, z);
        this.globeLoc = createVector(a_x * 0.5, a_y, z); 
        // this.startLoc = createVector(x * 0.5, y * 0.5, z);
        this.repelLoc = createVector(0, 0, cubeDims.z * 0.5);
        this.velocity = p5.Vector.random3D();
        this.acceleration = p5.Vector.random3D();
        this.dims = createVector(d, d, d);
        this.r = sqrt(d);
        this.targetR = this.r;
        this.mass = createVector(d, d, d);
        // this.maxSpeed = 15;//logo bounce for intro
        // this.maxForce = 1.3; //logo bouce for intro
        this.maxSpeed = 3; //standard good settings
        this.maxForce = 0.1; //standard good settings
        this.color = color(255); //used for when we connect color to a parameter e.g. distance from destination
    }
    applyForce(force) {
        this.acceleration.add(force);
    }
    align(particles) {
        let steering = createVector();
        let perceptionRadius = aPerceptionRadius.value();
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
            return (steering);
        }
    }
    cohesion(particles) {
        let steering = createVector();
        let perceptionRadius = cPerceptionRadius.value();
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
            return (steering);
        }
    }
    separation(particles) {
        let steering = createVector();
        let perceptionRadius = cPerceptionRadius.value();
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
            return (steering);
        }
    }
    returnToStart(particles) {
        let xScale = p5.Vector.mult(this.startLoc, patternScaler);
        let steering = p5.Vector.sub(xScale, this.location);
        let slowRadius = 25;
        let distance = steering.mag();
        if (distance < slowRadius) {
            let speed = map(distance, 0, slowRadius, 0, this.maxSpeed);
            steering.setMag(speed);
        } else {
            steering.setMag(this.maxSpeed);
        }
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        return (steering);
    }
    halfWidth(particles) {
        let steering = p5.Vector.sub(this.globeLoc, this.location);
        let slowRadius = 25;
        let distance = steering.mag();
        if (distance < slowRadius) {
            let speed = map(distance, 0, slowRadius, 0, this.maxSpeed);
            steering.setMag(speed);
        } else {
            steering.setMag(this.maxSpeed);
        }
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        return (steering);
    }

    repel(particles) {
        //   this.repelLoc = createVector(mouseX - (width / 2), mouseY - (height / 2), 0);      // sets repel location to the mouse pos
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

    applyGas(particles) {
        let ga = this.gas(particles);
        this.applyForce(ga);
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
        return (steering);
    }

    gas(particles) {
        let sinOffset = map(noise(sinCount), 0.48, 0.52, 0, 1);
        let sinOffsetMult = sinOffset * 0.0008;
        let gas = createVector(sinOffsetMult, -0.005, 0);
        let weight = p5.Vector.mult(gas, this.mass);
        sinCount += 0.1;
        return (weight);
   
    }

    gravity(particles) {
        let gravity = createVector(0, 0.01, 0);
        let weight = p5.Vector.mult(gravity, this.mass);
        sinCount += 0.1;
        return (weight);
   
    }

    update() {
        let centerS = createVector(0, 0, 0);
        let alpha = p5.Vector.sub(this.location, this.startLoc);
        let dist = alpha.mag();
        // this.color = color(255, 255 - map(dist, 0, 250, 0, 255)); //used to set the color relative to the dist from the destination
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
