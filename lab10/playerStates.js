const states = {
    STANDING: 0,
    RUNNING: 1,
    JUMPING: 2
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class Standing extends State {
    // constructor(player){
    //     super("Standing")
    //     this.player = player;
    // }

    // enter(){
    //     this.player.frameY = 0;
    // }

    // handleInput(input){
    //     if (input.includes(" ") || input.includes("ArrowUp")){
    //         this.player.setState(states.RUNNING);
    //     }
    // }
}

export class Running extends State {
    // constructor(player){
    //     super("Running")
    //     this.player = player;
    // }

    // enter(){
    //     this.player.frameY = 1;
    // }

    // handleInput(input){
    //     if (input.includes(" ") || input.includes("ArrowUp")){
    //         this.player.setState(states.JUMPING);
    //     }
    // }
}

export class Jumping extends State {
    // constructor(player){
    //     super("Running")
    //     this.player = player;
    // }

    // enter(){
    //     this.player.frameY = 2;
    // }

    // handleInput(input){
    //     if (input.includes(" ") || input.includes("ArrowUp")){
    //         this.player.setState(states.RUNNING);
    //     }
    // }
}