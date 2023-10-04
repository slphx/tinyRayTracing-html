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
        let ret = {};
        let L = this.center.sub(ori);
        let tca = L.dot(dir);
        let d2 = L.dot(L) - tca*tca;
        if (d2 > Math.pow(this.radius, 2)) {
            ret["flag"] = false;
            return ret;
        };
        let thc = Math.sqrt(Math.pow(this.radius, 2) - d2);
        let dist = tca - thc;
        let dist2 = tca + thc;
        if (dist < 0) dist = dist2;
        ret["dist"] = dist;
        if (dist < 0) {
            ret["flag"] = false;
            return ret;
        }

        ret["flag"] = true;
        ret["material"] = this.material;
        ret["hit"] = ori.add(dir.dot(dist));
        ret["N"] = ret["hit"].sub(this.center).normalize();
        return ret;
    }
}

export {Sphere}