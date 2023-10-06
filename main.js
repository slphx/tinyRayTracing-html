import { Sphere } from "./Object/Sphere.js";
import { Vec3 } from "./Geometry/Vector.js";
import { Scene } from "./Scene/Scene.js";
import { Material } from "./Material/Material.js";
import { Light } from "./Object/Light.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const width = 1024;
const height = 768;
// const width = 100;
// const height = 50;
const fov = 45;
const maxDepth = 4;

const scene = new Scene;

canvas.width = width;
canvas.height = height;
let imageData = ctx.createImageData(width, height);

const ivory = new Material(new Vec3(0.6, 0.3, 0.1), [0.4, 0.4, 0.3], 50);
const red_rubber = new Material(new Vec3(0.9, 0.1, 0), [0.3, 0.1, 0.1], 10);
const mirror = new Material(new Vec3(0.0, 10.0, 0.8), [1.0, 1.0, 1.0], 1425);

function set(x, y, color){
    y = height - y;
    if (color.type === 'Vec') color = color.v;
    let index = (y*width+x)*4;
    for (let j=0; j<3; j++){
        imageData.data[index+j]=color[j]*255;
    }
    imageData.data[index+3] = 255;        
}

function castRay(orig, dir, scene, depth){
    let intersect = scene.intersect(orig, dir);
    if (intersect["flag"] && depth <= maxDepth) {
        let diffuse_intensity = 0;
        let specular_intensity = 0;
        for (let light of scene.lights){
            let lightDir = intersect["hit"].sub(light.position).normalize();

            let lightHit = scene.intersect(light.position, lightDir);
            if (lightHit["dist"] < light.position.sub(intersect["hit"]).length() - 1e-4) continue;
            
            diffuse_intensity += Math.max(0, -lightDir.dot(intersect["N"])) * light.intensity;
            
            let reflectDir = lightDir.sub(intersect["N"].dot(lightDir.dot(intersect["N"])).dot(2));
            specular_intensity += Math.pow(Math.max(0, reflectDir.dot(dir.dot(-1))), intersect["material"].specular_exp) * light.intensity;

            // specular_intensity += Math.pow(dir.dot(-1).add(lightDir.dot(-1)).normalize().dot(intersect["N"]), intersect["material"].specular_exp+10) * light.intensity;
        }
        let diffuse = intersect["material"].diffuse_color.dot(diffuse_intensity).dot(intersect["material"].albedo[0]);
        let specular = new Vec3(1, 1, 1).dot(specular_intensity).dot(intersect["material"].albedo[1]);
        return diffuse.add(specular);
    } else return [0.2,0.7,0.8];
}

function render(scene){

    for (let i=0; i<width; i++){
        for (let j=0; j<height; j++){
            let x = (2*(i+0.5)/width - 1) * Math.tan(fov/2)*width/height;
            let y = (2*(j+0.5)/height - 1) * Math.tan(fov/2);
            let orig = new Vec3(0, 0, 0);
            let dir = (new Vec3(x, y, -1)).normalize();
            let color = castRay(orig, dir, scene, 0);
            set(i, j, color);
        }
    }
}

function main(){

    scene.addObj(new Sphere(new Vec3(-3,    0,   -16), 2, ivory));
    scene.addObj(new Sphere(new Vec3(-1.0, -1.5, -12), 2, mirror));
    scene.addObj(new Sphere(new Vec3( 1.5, -0.5, -18), 3, red_rubber));
    scene.addObj(new Sphere(new Vec3( 7,    5,   -18), 4, mirror));

    scene.addLight(new Light(new Vec3(-20, 20, 20), 1.5));
    scene.addLight(new Light(new Vec3( 30, 50, -25), 1.8));
    scene.addLight(new Light(new Vec3( 30, 20,  30), 1.7));
    render(scene);
    
}

main();
ctx.putImageData(imageData, 0, 0);