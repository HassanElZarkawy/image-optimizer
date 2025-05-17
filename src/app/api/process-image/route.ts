import { NextRequest, NextResponse } from 'next/server';
import { ResizeOptions, ProcessImageResponse } from '@/lib/types';

/**
 * Maximum file size in bytes (10MB)
 */
const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * Process image API route
 * POST /api/process-image
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Check if the request is a multipart form
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Request must be multipart/form-data'
          }
        },
        { status: 400 }
      );
    }

    // Parse the form data
    const formData = await request.formData();

    // Get the file from the form data
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'No file provided'
          }
        },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: `File size exceeds the maximum allowed size (10MB)`
          }
        },
        { status: 400 }
      );
    }

    // Check file type
    const validMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/bmp',
      'image/tiff'
    ];

    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: `Unsupported file type: ${file.type}`
          }
        },
        { status: 400 }
      );
    }

    // Get resize options from form data
    const options: ResizeOptions = {
      width: parseInt(formData.get('width') as string) || undefined,
      height: parseInt(formData.get('height') as string) || undefined,
      maintainAspectRatio: formData.get('maintainAspectRatio') === 'true',
      fit: (formData.get('fit') as 'contain' | 'cover' | 'fill' | 'inside' | 'outside') || 'contain',
      quality: parseInt(formData.get('quality') as string) || 80,
    };

    // Dynamically import Sharp to ensure it's only loaded server-side
    const { default: sharp } = await import('sharp');

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process the image
    // 1. Strip metadata
    let processedImage = sharp(buffer)
      .withMetadata({
        exif: {},       // Empty exif data
        // icc: false,     // Remove ICC profile
        // iptc: false,    // Remove IPTC data
        // xmp: false      // Remove XMP data
      });

    // 2. Resize the image
    if (options.width || options.height) {
      const resizeOptions = {
        width: options.width,
        height: options.height,
        fit: options.fit,
      };

      // If maintainAspectRatio is false and both dimensions are provided, use fit: 'fill' to stretch
      if (!options.maintainAspectRatio && options.width && options.height) {
        resizeOptions.fit = 'fill';
      }

      processedImage = processedImage.resize(resizeOptions);
    }

    // 3. Convert to WebP
    const outputBuffer = await processedImage
      .webp({
        quality: options.quality,
        lossless: false
      })
      .toBuffer({ resolveWithObject: true });

    // Get metadata about the processed image
    const metadata = outputBuffer.info;

    // Respond with success and processed image data
    const response: ProcessImageResponse = {
      success: true,
      processedImage: {
        // Return a data URL
        url: `data:image/webp;base64,${outputBuffer.data.toString('base64')}`,
        metadata: {
          width: metadata.width,
          height: metadata.height,
          format: 'webp',
          size: outputBuffer.data.length,
          // hasAlpha: metadata.hasAlpha
        }
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing image:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'An unknown error occurred while processing the image'
        }
      },
      { status: 500 }
    );
  }
}

// Use the Node.js runtime instead of Edge for full Node.js API support
export const runtime = 'nodejs';
