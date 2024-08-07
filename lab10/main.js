import { Player } from './player.js';
import { InputHandler } from './events.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');

    // Background sizes
    canvas.width = 500;
    canvas.height = 500;
    
    class Game {

        constructor (width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler();
        }

        update(deltaTime){
            this.player.update(this.input.keys, deltaTime);
        }

        draw(context){
            // Draw the player
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height)

    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx)
        requestAnimationFrame(animate);
    }

    animate(0);
});