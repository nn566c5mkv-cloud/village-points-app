import struct
import zlib
import os

def create_png(width, height, filepath):
    def make_chunk(chunk_type, data):
        chunk = chunk_type + data
        crc = zlib.crc32(chunk) & 0xffffffff
        return struct.pack('>I', len(data)) + chunk + struct.pack('>I', crc)
    
    def make_ihdr(width, height):
        data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
        return make_chunk(b'IHDR', data)
    
    def make_idat(width, height):
        raw_data = b''
        for y in range(height):
            raw_data += b'\x00'
            for x in range(width):
                cx = x - width // 2
                cy = y - height // 2
                dist = (cx ** 2 + cy ** 2) ** 0.5
                max_dist = min(width, height) / 2
                
                if dist < max_dist * 0.5:
                    r, g, b = 45, 106, 79
                elif dist < max_dist * 0.85:
                    r, g, b = 255, 255, 255
                else:
                    r, g, b = 240, 247, 244
                
                raw_data += bytes([r, g, b])
        
        compressed = zlib.compress(raw_data, 9)
        return make_chunk(b'IDAT', compressed)
    
    def make_iend():
        return make_chunk(b'IEND', b'')
    
    with open(filepath, 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n')
        f.write(make_ihdr(width, height))
        f.write(make_idat(width, height))
        f.write(make_iend())

if __name__ == '__main__':
    os.makedirs('icons', exist_ok=True)
    
    for size in [192, 512]:
        filepath = f'icons/icon-{size}.png'
        create_png(size, size, filepath)
        print(f'Created: {filepath}')
    
    print('\nPNG icons generated successfully!')
