
class Material{
    diffuse_color; albedo; specular_exp;

    constructor(color, a, spec){
        this.diffuse_color = color;
        this.albedo = a;
        this.specular_exp = spec;
    }

}

export {Material};