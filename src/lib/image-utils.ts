// src/lib/image-utils.ts

import type { ImageMetadata, ProcessedImageResult, ResizeOptions, SupportedImageType } from './types';

/**
 * Check if the provided MIME type is a supported image format
 * @param mimeType - The MIME type to check
 * @returns boolean indicating if the type is supported
 */
export const isSupportedImageType = (mimeType: string): mimeType is SupportedImageType => {
  const supportedTypes: SupportedImageType[] = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/bmp',
    'image/tiff'
  ];

  return supportedTypes.includes(mimeType as SupportedImageType);
};

/**
 * Formats byte size to human-readable string
 * @param bytes - The file size in bytes
 * @returns A formatted string representation
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Convert buffer to base64 data URL (safe for client-side)
 * @param buffer - The image buffer
 * @param mimeType - The MIME type of the image
 * @returns A data URL string
 */
export const bufferToDataUrl = (buffer: Buffer, mimeType: string): string => {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
};

// Server-side only functions can be added to a separate file if needed
