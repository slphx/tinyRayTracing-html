
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const width = 1024;
const height = 768;
canvas.width = width;
canvas.height = height;
let imageData = ctx.createImageData(width, height);

function set(x, y, color){
    let index = (y*width+x)*4;
    for (let j=0; j<3; j++){
        imageData.data[index+j]=color[j];
    }
    imageData.data[index+3] = 255;        
}

function main(){
    for (let i=0; i<width; i++){
        for (let j=0; j<height; j++){
            set(i, j, [255.0*i/width, 255.0*j/height, 0]);
        }
    }
    
}

main();
ctx.putImageData(imageData, 0, 0);