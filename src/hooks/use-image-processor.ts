"use client";

import { useState, useCallback, useEffect } from 'react';
import {
  ImageMetadata,
  ImageProcessorState,
  ProcessedImageResult,
  ProcessingError,
  ProcessingStatus,
  ResizeOptions,
  ProcessImageResponse
} from '@/lib/types';
import {
  isSupportedImageType,
  formatFileSize
} from '@/lib/image-utils';

/**
 * Initial state for the image processor
 */
const initialState: ImageProcessorState = {
  originalImage: null,
  originalMetadata: null,
  processedImage: null,
  previewUrl: null,
  status: 'idle',
  error: null,
  resizeOptions: {
    width: undefined,
    height: undefined,
    maintainAspectRatio: true,
    fit: 'contain',
    quality: 80
  }
};

/**
 * Custom hook for managing the image processing workflow
 * @returns Hook state and methods for image processing
 */
export const useImageProcessor = () => {
  const [state, setState] = useState<ImageProcessorState>(initialState);

  /**
   * Reset the processor state
   */
  const reset = useCallback(() => {
    // Revoke object URLs to prevent memory leaks
    if (state.previewUrl) {
      URL.revokeObjectURL(state.previewUrl);
    }
    setState(initialState);
  }, [state.previewUrl]);

  /**
   * Extract basic metadata from File object
   */
  const extractBasicMetadata = useCallback(async (file: File): Promise<ImageMetadata> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          format: file.type.split('/')[1] || 'unknown',
          size: file.size,
          originalName: file.name
        });
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    });
  }, []);

  /**
   * Handle file selection
   */
  const handleFileSelect = useCallback(async (file: File) => {
    try {
      // Check if the file is a supported image type
      if (!isSupportedImageType(file.type)) {
        throw new Error(`Unsupported file type: ${file.type}`);
      }

      // Clean up previous state
      if (state.previewUrl) {
        URL.revokeObjectURL(state.previewUrl);
      }

      // Update state to uploading
      setState(prev => ({
        ...prev,
        status: 'uploading',
        originalImage: file,
        processedImage: null,
        error: null
      }));

      // Create a preview URL for the original image
      const previewUrl = URL.createObjectURL(file);

      // Extract basic metadata client-side
      const metadata = await extractBasicMetadata(file);

      // Update state with metadata and preview
      setState(prev => ({
        ...prev,
        originalMetadata: metadata,
        previewUrl,
        status: 'idle',
        resizeOptions: {
          ...prev.resizeOptions,
          width: metadata.width,
          height: metadata.height
        }
      }));
    } catch (error) {
      console.error('Error selecting file:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: {
          message: error instanceof Error ? error.message : 'Failed to process the image',
          details: error
        }
      }));
    }
  }, [state.previewUrl, extractBasicMetadata]);

  /**
   * Update resize options
   */
  const updateResizeOptions = useCallback((options: Partial<ResizeOptions>) => {
    setState(prev => ({
      ...prev,
      resizeOptions: {
        ...prev.resizeOptions,
        ...options
      }
    }));
  }, []);

  /**
   * Process the image using the API route
   */
  const processSelectedImage = useCallback(async () => {
    const { originalImage, resizeOptions } = state;

    if (!originalImage) {
      return;
    }

    try {
      setState(prev => ({
        ...prev,
        status: 'processing'
      }));

      // Create form data to send to the API
      const formData = new FormData();
      formData.append('file', originalImage);

      // Add resize options to form data
      if (resizeOptions.width) {
        formData.append('width', resizeOptions.width.toString());
      }
      if (resizeOptions.height) {
        formData.append('height', resizeOptions.height.toString());
      }
      formData.append('maintainAspectRatio', resizeOptions.maintainAspectRatio.toString());
      formData.append('fit', resizeOptions.fit || 'contain');
      formData.append('quality', (resizeOptions.quality || 80).toString());

      // Send the request to the API
      const response = await fetch('/api/process-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to process the image');
      }

      const data: ProcessImageResponse = await response.json();

      if (!data.success || !data.processedImage) {
        throw new Error(data.error?.message || 'Failed to process the image');
      }

      // Create a blob from the data URL
      const dataUrl = data.processedImage.url;
      const base64Response = await fetch(dataUrl);
      const processedBlob = await base64Response.blob();

      // Create a URL for the processed image
      const processedUrl = URL.createObjectURL(processedBlob);

      // If we had a previous preview URL, revoke it to prevent memory leaks
      if (state.previewUrl && state.previewUrl !== processedUrl) {
        URL.revokeObjectURL(state.previewUrl);
      }

      // Update state with the processed image
      setState(prev => ({
        ...prev,
        processedImage: {
          data: processedBlob,
          metadata: data.processedImage!.metadata,
          dataUrl: processedUrl
        },
        previewUrl: processedUrl,
        status: 'completed'
      }));

      return data.processedImage;
    } catch (error) {
      console.error('Error processing image:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: {
          message: error instanceof Error ? error.message : 'Failed to process the image',
          details: error
        }
      }));
    }
  }, [state]);

  /**
   * Download the processed image
   */
  const downloadProcessedImage = useCallback(() => {
    const { processedImage, originalImage } = state;

    if (!processedImage || !originalImage) {
      return;
    }

    try {
      // Create a download URL for the processed image
      const blob = processedImage.data as Blob;
      const url = URL.createObjectURL(blob);

      // Create a link element and trigger the download
      const a = document.createElement('a');
      a.href = url;

      // Generate a filename with dimensions
      const originalName = originalImage.name.split('.')[0] || 'image';
      const dimensions = `${processedImage.metadata.width}x${processedImage.metadata.height}`;
      a.download = `${originalName}-${dimensions}.webp`;

      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading processed image:', error);
      setState(prev => ({
        ...prev,
        error: {
          message: 'Failed to download the image',
          details: error
        }
      }));
    }
  }, [state]);

  /**
   * Get compression statistics
   */
  const getCompressionStats = useCallback(() => {
    const { originalImage, processedImage } = state;

    if (!originalImage || !processedImage) {
      return null;
    }

    const originalSize = originalImage.size;
    const processedSize = processedImage.metadata.size;
    const savings = originalSize - processedSize;
    const percentReduction = (savings / originalSize) * 100;

    return {
      originalSize,
      processedSize,
      savings,
      percentReduction,
      originalSizeFormatted: formatFileSize(originalSize),
      processedSizeFormatted: formatFileSize(processedSize),
      savingsFormatted: formatFileSize(savings)
    };
  }, [state]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (state.previewUrl) {
        URL.revokeObjectURL(state.previewUrl);
      }
    };
  }, [state.previewUrl]);

  return {
    ...state,
    reset,
    handleFileSelect,
    updateResizeOptions,
    processSelectedImage,
    downloadProcessedImage,
    getCompressionStats
  };
};
