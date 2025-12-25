const fs = require('fs');
const path = require('path');

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const ICONS_DIR = path.join(__dirname, 'icons');

function createPNGIcon(size) {
  const canvasSize = size;
  const padding = size * 0.1;
  const iconSize = size - (padding * 2);
  
  let pngData = [];
  
  const width = canvasSize;
  const height = canvasSize;
  
  const centerX = width / 2;
  const centerY = height / 2;
  
  const headerLength = 8;
  const ihdrLength = 13;
  const imageDataLength = (width * height * 4) + height;
  const iendLength = 12;
  const totalLength = headerLength + ihdrLength + imageDataLength + iendLength;
  
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    crcTable[n] = c;
  }
  
  function crc32(data) {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
      let index = (crc ^ data[i]) & 0xff;
      crc = crcTable[index] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }
  
  function createChunk(type, data) {
    const typeBytes = Buffer.from(type, 'ascii');
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const crcData = Buffer.concat([typeBytes, data]);
    const crcValue = Buffer.alloc(4);
    crcValue.writeUInt32BE(crc32(crcData));
    return Buffer.concat([length, typeBytes, data, crcValue]);
  }
  
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = createChunk('IHDR', ihdrData);
  
  const imageData = Buffer.alloc(imageDataLength);
  let offset = 0;
  
  for (let y = 0; y < height; y++) {
    imageData[offset++] = 0;
    
    for (let x = 0; x < width; x++) {
      const dx = Math.abs(x - centerX);
      const dy = Math.abs(y - centerY);
      const distFromCenter = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.min(width, height) / 2;
      
      let r, g, b;
      
      if (distFromCenter < maxDist * 0.5) {
        r = 45;
        g = 106;
        b = 79;
      } else if (distFromCenter < maxDist * 0.65) {
        r = 255;
        g = 255;
        b = 255;
      } else if (distFromCenter < maxDist * 0.85) {
        r = 45;
        g = 106;
        b = 79;
      } else {
        r = 240;
        g = 247;
        b = 244;
      }
      
      imageData[offset++] = r;
      imageData[offset++] = g;
      imageData[offset++] = b;
      imageData[offset++] = 255;
    }
  }
  
  const idat = createChunk('IDAT', Buffer.concat([Buffer.from([120, 156]), zlibDeflate(imageData)]));
  const iend = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdr, idat, iend]);
}

function zlibDeflate(data) {
  const compressed = [];
  const blockSize = 65535;
  
  for (let i = 0; i < data.length; i += blockSize) {
    const chunk = data.slice(i, Math.min(i + blockSize, data.length));
    const isLast = i + blockSize >= data.length;
    
    const header = Buffer.alloc(5);
    header[0] = isLast ? 1 : 0;
    header.writeUInt16LE(chunk.length, 1);
    header.writeUInt16LE(~chunk.length & 0xFFFF, 3);
    
    let adler = 1;
    let s1 = 0;
    let s2 = 0;
    const modulus = 65521;
    
    for (let j = 0; j < chunk.length; j++) {
      s1 = (s1 + chunk[j]) % modulus;
      s2 = (s2 + s1) % modulus;
    }
    adler = (s2 << 16) | s1;
    
    const checksum = Buffer.alloc(4);
    checksum.writeUInt32BE(adler, 0);
    
    compressed.push(...header);
    compressed.push(...chunk);
    compressed.push(...checksum);
  }
  
  return Buffer.from(compressed);
}

function generateIcons() {
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
    console.log('创建图标目录: ' + ICONS_DIR);
  }
  
  let generated = 0;
  
  for (const size of ICON_SIZES) {
    const iconPath = path.join(ICONS_DIR, `icon-${size}.png`);
    const iconData = createPNGIcon(size);
    fs.writeFileSync(iconPath, iconData);
    console.log(`已生成图标: icon-${size}.png (${size}x${size})`);
    generated++;
  }
  
  console.log(`\n成功生成 ${generated} 个图标文件`);
  console.log('图标目录: ' + ICONS_DIR);
}

generateIcons();
