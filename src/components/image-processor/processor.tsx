"use client";

import { useCallback, useState, useEffect } from 'react';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import { useImageProcessor } from '@/hooks/use-image-processor';
import { useResize } from '@/hooks/use-resize';
import { Dropzone } from './dropzone';
import { ImagePreview } from './image-preview';
import { ResizeControls } from './resize-controls';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageProcessorProps {
  className?: string;
}

export const ImageProcessor = ({ className }: ImageProcessorProps) => {
  const {
    originalImage,
    originalMetadata,
    processedImage,
    previewUrl,
    status,
    error,
    resizeOptions,
    handleFileSelect,
    updateResizeOptions,
    processSelectedImage,
    downloadProcessedImage,
    reset,
  } = useImageProcessor();

  // Initialize resize hook with options from the image processor
  const {
    options: resizeState,
    setDimensions,
    resetOptions,
    setWidth,
    setHeight
  } = useResize(
    resizeOptions,
    originalMetadata?.width,
    originalMetadata?.height
  );

  // Sync resize options between hooks
  useEffect(() => {
    if (originalMetadata && !processedImage) {
      setDimensions(originalMetadata.width, originalMetadata.height);
    }
  }, [originalMetadata, processedImage, setDimensions]);

  // Sync resize state to image processor options
  useEffect(() => {
    updateResizeOptions(resizeState);
  }, [resizeState, updateResizeOptions]);

  // Handle reset button click
  const handleReset = useCallback(() => {
    resetOptions();
    if (originalMetadata) {
      setDimensions(originalMetadata.width, originalMetadata.height);
    }
  }, [resetOptions, setDimensions, originalMetadata]);

  // Handle process button click
  const handleProcess = useCallback(async () => {
    await processSelectedImage();
  }, [processSelectedImage]);

  // Handle reprocess
  const handleReprocess = useCallback(() => {
    processSelectedImage();
  }, [processSelectedImage]);

  // Handle clear button
  const handleClear = useCallback(() => {
    reset();
    resetOptions();
  }, [reset, resetOptions]);

  const isProcessing = status === 'processing' || status === 'uploading' || status === 'stripping-metadata' || status === 'resizing' || status === 'converting';
  const canProcess = originalImage && !isProcessing && status !== 'completed';

  return (
    <div className={cn("max-w-6xl mx-auto", className)}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Image Processor</h2>
              <p className="text-gray-500">
                Upload an image to strip metadata, resize, and convert to WebP format
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error.message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column: Upload and preview */}
            <div className="space-y-6">
              <Dropzone
                onFileSelect={handleFileSelect}
                onClear={handleClear}
                hasFile={!!originalImage}
                disabled={isProcessing}
              />

              {previewUrl && (
                <ImagePreview
                  previewUrl={previewUrl}
                  originalMetadata={originalMetadata}
                  processedMetadata={processedImage?.metadata || null}
                  status={status}
                  onDownload={downloadProcessedImage}
                  onReprocess={handleReprocess}
                />
              )}
            </div>

            {/* Right column: Resize controls */}
            <div>
              {originalImage && originalMetadata ? (
                <div className="space-y-6">
                  <ResizeControls
                    options={resizeOptions}
                    originalWidth={originalMetadata.width}
                    originalHeight={originalMetadata.height}
                    onUpdateOptions={updateResizeOptions}
                    onReset={handleReset}
                    disabled={isProcessing}
                  />

                  {canProcess && (
                    <Button
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className="w-full mt-4"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Process Image
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50 border border-gray-200 rounded-lg">
                  <ImageIcon className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-center">
                    Upload an image to access processing options
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
