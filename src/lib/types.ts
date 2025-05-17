/**
 * Image processing related types
 */

/**
 * Supported image file types for processing
 */
export type SupportedImageType =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "image/svg+xml"
  | "image/bmp"
  | "image/tiff";

/**
 * Metadata for an uploaded image
 */
export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  hasAlpha?: boolean;
  originalName?: string;
}

/**
 * Options for resizing an image
 */
export interface ResizeOptions {
  width?: number;
  height?: number;
  maintainAspectRatio: boolean;
  fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside';
  quality?: number; // 1-100
}

/**
 * Result of an image processing operation
 */
export interface ProcessedImageResult {
  data: Blob | Buffer;
  metadata: ImageMetadata;
  dataUrl?: string;
}

/**
 * Status for an image processing operation
 */
export type ProcessingStatus =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'stripping-metadata'
  | 'resizing'
  | 'converting'
  | 'completed'
  | 'error';

/**
 * Error information for image processing
 */
export interface ProcessingError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * State for the image processing flow
 */
export interface ImageProcessorState {
  originalImage: File | null;
  originalMetadata: ImageMetadata | null;
  processedImage: ProcessedImageResult | null;
  previewUrl: string | null;
  status: ProcessingStatus;
  error: ProcessingError | null;
  resizeOptions: ResizeOptions;
}

/**
 * API response format for image processing
 */
export interface ProcessImageResponse {
  success: boolean;
  processedImage?: {
    url: string;
    metadata: ImageMetadata;
  };
  error?: ProcessingError;
}

/**
 * API request format for image processing
 */
export interface ProcessImageRequest {
  file: File;
  options: ResizeOptions;
}
