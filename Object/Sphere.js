import { Vec3 } from "../Geometry/Vector.js";

class Sphere extends Object{
    center; radius; material;

    constructor(c, r, m){
        super();
        this.type = 'Sphere';
        this.center = c; this.radius = r;
        if (m != undefined) this.material = m;
    }

    intersect(ori, dir){
        let L = this.center.sub(ori);
        let tca = L.dot(dir);
        let d2 = L.dot(L) - tca*tca;
        if (d2 > Math.pow(this.radius, 2)) return [-1];
        let thc = Math.sqrt(Math.pow(this.radius, 2) - d2);
        let dist = tca - thc;
        let dist2 = tca + thc;
        if (dist < 0) dist = dist2;
        if (dist < 0) return [-1];
        return [dist, this.material];
    }
}

export {Sphere}