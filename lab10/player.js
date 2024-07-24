import { Standing, Running, Jumping } from './playerStates.js';

// Draw the player
export class Player {
    constructor(game) {
        this.game = game;
        this.width = 64;
        this.height = 128;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.velocity = 0;
        this.jumpPower = 20;
        this.weight = 2;
        this.image = document.getElementById('player');
        this.speed = 0;
        this.frameX = 0;
        this.maxFrame = 2;
        this.fps = 10;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.frameY = 1;
        this.maxSpeed = 20;
        // this.states = [new Standing(this), new Running(this), new Jumping(this)];
        // this.currentState = this.states[0];
        // this.currentState.enter();
    }

    update(input, deltaTime){
        // this.currentState.handleInput(input);
        this.y += this.velocity
        if (input.includes(" ") || input.includes("ArrowUp") && this.onGround()){
            // Trigger jump
            this.velocity -= this.jumpPower;
        }
        this.y += this.velocity;
        if (!this.onGround()){
            this.velocity += this.weight;
        }
        else{
            this.velocity = 0;
        }

        // No flying off the ground
        if (this.y < (0 - this.height)){
            this.y = this.game.height - this.height
        }
        // console.log(this.y)

        // Animation?
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame){
                this.frameX += 1;
            }
            else {
                this.frameX = 0;
            }
        }
        else{
            this.frameTimer += deltaTime;
        }


    }
    // Draw Frames
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }

    onGround(){
        // Check if the player has fallen down
        return (this.y >= this.game.height - this.height)
    }

    // setState(state){
    //     this.currentState = this.state[state];
    //     this.currentState.enter();
    // }
}