export class InputHandler {
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e =>{
            // Only add to array if...
            if ((e.key === " " || e.key === "ArrowUp") && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key)
            }
            console.log(e.key, this.keys)
        });

        window.addEventListener('keyup', e =>{
            // Only add to array if...
            if ((e.key === " " || e.key === "ArrowUp")){
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
            console.log(e.key, this.keys)
        });
    }
}