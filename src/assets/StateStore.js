export default class History {
    constructor() {
        this.states = [];
        this.undos = [];
    }
    
    push(state) {
        this.states.push(state);
        this.undos = [];
        console.log(this.states);
        console.log(this.undos);
        return;
    }

    undo() {
        if (this.states.length == 0) return;
        this.undos.push(this.states.pop());
        console.log(this.states);
        console.log(this.undos);
        return this.states[this.states.length - 1];
    }

    redo() {
        if (this.undos.length == 0) return;
        this.states.push(this.undos.pop());
        console.log(this.states);
        console.log(this.undos);
        return this.states[this.states.length - 1];
    }
}