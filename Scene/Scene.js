
class Scene{
    objs;

    constructor(){
        this.objs = [];
    }

    intersect(ori, dir){
        let intersectP = {};
        intersectP["flag"] = false;
        let d;
        for (let i=0; i<this.objs.length; i++){
            d = this.objs[i].intersect(ori, dir);
            if (d.flag) {
                if (!intersectP["flag"]) intersectP = d;
                else if (d.dist < intersectP.dist) intersectP = d;
            }
        }
        return intersectP;
    }

    addObj(o){
        this.objs.push(o);
    }
}

export {Scene}