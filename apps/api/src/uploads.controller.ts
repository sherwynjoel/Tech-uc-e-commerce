import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('uploads')
export class UploadsController {
    @Get(':filename')
    getFile(@Param('filename') filename: string, @Res() res: Response) {
        // Ensure we are looking in the correct folder: apps/api/uploads
        // process.cwd() should be apps/api
        const filePath = join(process.cwd(), 'uploads', filename);

        if (!existsSync(filePath)) {
            // Fallback: try relative to __dirname (dist/src/...) -> dist/uploads or similar?
            // Let's stick to process.cwd() for now as it matches where multer saves.
            // If file missing, maybe 404.
            throw new NotFoundException('File not found');
        }

        return res.sendFile(filePath);
    }
}
