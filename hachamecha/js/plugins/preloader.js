Galv.CACHE.autoLoadPictures = function() {
    const fs = require('fs');
    const path = require('path');
    const directory = path.join(process.mainModule.path, 'img/pictures');

    try {
        const files = fs.readdirSync(directory);
        files.forEach(file => {
            if (file.match(/\.(png|jpg|jpeg)$/i)) { 
                const imageName = file.replace(/\.(png|jpg|jpeg)$/i, '');
                const bitmap = ImageManager.loadBitmap('img/pictures/', imageName);
                Galv.CACHE.load('pictures', imageName);
            }
        });
        console.log("Preloaded all images from 'pictures' folder.");
    } catch (error) {
        console.error("Error preloading images: ", error);
    }
};

const _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    Galv.CACHE.autoLoadPictures();
    _Scene_Boot_start.call(this);
};

