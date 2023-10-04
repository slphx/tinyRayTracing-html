
class Light extends Object{
    position; intensity;
    constructor(p, i){
        super();
        this.type = 'Light';

        this.position = p;
        this.intensity = i;
    }
    
}

export {Light};