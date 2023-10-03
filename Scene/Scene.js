
class Scene{
    objs;

    constructor(){
        this.objs = [];
    }

    intersect(ori, dir){
        let minD = [-1];
        let d;
        for (let i=0; i<this.objs.length; i++){
            d = this.objs[i].intersect(ori, dir);
            if (d[0] > -1) {
                if (minD[0] === -1) minD = d;
                else if (d[0] < minD[0]) minD = d;
            }
        }
        if (minD[0] > -1) return minD;
        return [-1];
    }

    addObj(o){
        this.objs.push(o);
    }
}

export {Scene}