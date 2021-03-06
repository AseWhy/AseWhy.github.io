import EventEmitter from 'events';

const NAME = Symbol();

export class Module extends EventEmitter {
    constructor(name){
        super();

        this[NAME] = name;
    }

    getName(){
        return this[NAME];
    }

    getNamespace(key){
        return 'user.settings.' + this[NAME] + '.' + key;
    }

    set(key, data) {
        localStorage.setItem(this.getNamespace(key), JSON.stringify(data));
    }

    get(key) {
        const data = localStorage.getItem(this.getNamespace(key));

        return data != null ? JSON.parse(data) : null;
    }
}