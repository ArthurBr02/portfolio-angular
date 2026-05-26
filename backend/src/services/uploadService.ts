import fs from 'fs';
import path from 'path';

export function getUploadsDir(): string {
  const dir = path.resolve(process.cwd(), 'uploads');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

export function deleteFile(filename: string): void {
  // only delete if it's an uploaded file (prevent arbitrary file deletion)
  if (filename.startsWith('/uploads/')) {
    const basename = path.basename(filename);
    const filepath = path.join(getUploadsDir(), basename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }
}
