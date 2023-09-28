

class Vec3 extends VecN{

    constructor(a, b, c){
        super([a, b, c]);
    }
    x(){
        return v[0];
    }
    y(){
        return v[1];
    }
    z(){
        return v[2];
    }
}

class VecN{
    v; length;

    constructor(v){
        this.v = v;
        this.length = v.length;
    }
    add(v){
        if (this.length != v.length) throw new Error("长度不相等的向量相加");
        let ret = [];
        for (let i=0; i<this.length; i++){
            ret.push(this.v[i]+v.v[i]);
        }
    }
}

export {Vec3, VecN};