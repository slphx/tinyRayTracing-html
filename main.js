import { Sphere } from "./Object/Sphere.js";
import { Vec3 } from "./Geometry/Vector.js";
import { Scene } from "./Scene/Scene.js";
import { Material } from "./Material/Material.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const width = 1024;
const height = 768;
// const width = 100;
// const height = 50;
const fov = 45;

const scene = new Scene;

canvas.width = width;
canvas.height = height;
let imageData = ctx.createImageData(width, height);

const ivory = new Material([0.4, 0.4, 0.3]);
const red_rubber = new Material([0.3, 0.1, 0.1]);

function set(x, y, color){
    if (color.type === 'Vec3') color = [color.x(), color.y(), color.z()];
    let index = (y*width+x)*4;
    for (let j=0; j<3; j++){
        imageData.data[index+j]=color[j]*255;
    }
    imageData.data[index+3] = 255;        
}

function render(scene){

    for (let i=0; i<width; i++){
        for (let j=0; j<height; j++){
            let x = (2*(i+0.5)/width - 1) * Math.tan(fov/2)*width/height;
            let y = (2*(j+0.5)/height - 1) * Math.tan(fov/2);
            let dir = (new Vec3(x, y, -1)).normalize();
            let intersect = scene.intersect(new Vec3(0,0,0), dir);
            if (intersect[0] > -1) {
                set(i, j, intersect[1].diffuse_color);
            } else set(i, j, [0.2,0.7,0.8]);
        }
    }
}

function main(){

    scene.addObj(new Sphere(new Vec3(-3,    0,   -16), 2, ivory));
    scene.addObj(new Sphere(new Vec3(-1.0, -1.5, -12), 2, red_rubber));
    scene.addObj(new Sphere(new Vec3( 1.5, -0.5, -18), 3, red_rubber));
    scene.addObj(new Sphere(new Vec3( 7,    5,   -18), 4, ivory));

    render(scene);
    
}

main();
ctx.putImageData(imageData, 0, 0);