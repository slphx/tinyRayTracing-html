
class VecN{
    v; n;

    constructor(v){
        this.v = v;
        this.n = v.length;
        this.type = 'VecN';
    }
    length(){
        let sum = 0;
        for (let i=0; i<this.n; i++){
            sum += Math.pow(this.v[i], 2);
        }
        return Math.sqrt(sum);
    }
    normalize(){
        let l = this.length();
        for (let i=0; i<this.n; i++){
            this.v[i]/=l;
        }
        return this;
    }
    add(v){
        if (this.n != v.n) throw new Error("长度不相等的向量相加");
        let ret = [];
        for (let i=0; i<this.n; i++){
            ret.push(this.v[i]+v.v[i]);
        }
        return new VecN(ret);
    }
    sub(v){
        if (this.n != v.n) throw new Error("长度不相等的向量相减");
        let ret = [];
        for (let i=0; i<this.n; i++){
            ret.push(this.v[i]-v.v[i]);
        }
        return new VecN(ret);
    }
    dot(v){
        if (this.n != v.n) throw new Error("长度不相等的向量相点乘");
        let ret = 0;
        for (let i=0; i<this.n; i++){
            ret += this.v[i]*v.v[i];
        }
        return ret;
    }
}

class Vec3 extends VecN{
    constructor(a, b, c){
        if (a === undefined) super(0, 0, 0);
        else super([a, b, c]);
        this.type = 'Vec3';
    }
    x(){
        return this.v[0];
    }
    y(){
        return this.v[1];
    }
    z(){
        return this.v[2];
    }

}

export {Vec3, VecN};