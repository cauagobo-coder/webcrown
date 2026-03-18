import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function run() {
    const dir = 'public/portfolio/paginas';
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
    for (const file of files) {
        let baseName = file.includes('Lúmine') ? 'lumine' : file.includes('Iron-Gym') ? 'fitnez' : 'royal';
        
        // Full Image
        await sharp(path.join(dir, file))
            .webp({ quality: 80 })
            .toFile(path.join(dir, `${baseName}.webp`));
            
        // Thumbnail for Hover (Width 600px, top crop or preserve aspect)
        await sharp(path.join(dir, file))
            .resize({ width: 600 })
            .webp({ quality: 70 })
            .toFile(path.join(dir, `${baseName}-thumb.webp`));
            
        console.log(`Converted ${file} to ${baseName}.webp and ${baseName}-thumb.webp`);
    }
}
run();
