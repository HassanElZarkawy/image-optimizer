"use client";

import { useMemo } from 'react';
import { Dices, Download, FileWarning, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ImageMetadata, ProcessingStatus } from '@/lib/types';
import { formatFileSize } from '@/lib/image-utils';

interface ImagePreviewProps {
  previewUrl: string | null;
  originalMetadata: ImageMetadata | null;
  processedMetadata: ImageMetadata | null;
  status: ProcessingStatus;
  onDownload: () => void;
  onReprocess: () => void;
  className?: string;
}

export const ImagePreview = ({
  previewUrl,
  originalMetadata,
  processedMetadata,
  status,
  onDownload,
  onReprocess,
  className
}: ImagePreviewProps) => {
  const isLoading = status === 'processing' || status === 'uploading' || status === 'stripping-metadata' || status === 'resizing' || status === 'converting';
  const isCompleted = status === 'completed';
  const isError = status === 'error';

  // Calculate compression savings
  const compressionStats = useMemo(() => {
    if (!originalMetadata || !processedMetadata) return null;

    const originalSize = originalMetadata.size;
    const processedSize = processedMetadata.size;
    const savings = originalSize - processedSize;
    const percentReduction = (savings / originalSize) * 100;

    return {
      savings,
      percentReduction: Math.round(percentReduction)
    };
  }, [originalMetadata, processedMetadata]);

  if (!previewUrl) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center border border-gray-300 rounded-lg bg-gray-50 p-6",
        "min-h-[300px] w-full",
        className
      )}>
        <FileWarning className="w-12 h-12 text-gray-400 mb-3" />
        <p className="text-gray-500">No image to preview</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "relative border border-gray-300 rounded-lg overflow-hidden bg-gray-50",
      "flex flex-col",
      className
    )}>
      {/* Image preview */}
      <div className="relative w-full aspect-auto flex items-center justify-center overflow-hidden bg-[#f0f0f0] bg-checkerboard">
        <img
          src={previewUrl}
          alt="Preview"
          className={cn(
            "max-w-full max-h-[500px] object-contain transition-opacity duration-200",
            isLoading && "opacity-50"
          )}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <Spinner size="lg" color="primary" />
          </div>
        )}
      </div>

      {/* Metadata and actions */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex flex-wrap gap-4 justify-between">
          {/* Left side: Image metadata */}
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-900">
              {isCompleted ? 'Processed Image' : 'Original Image'}
            </h3>
            {originalMetadata && (
              <div className="text-xs text-gray-500 space-y-1">
                <p>
                  Dimensions: {isCompleted && processedMetadata
                    ? `${processedMetadata.width} × ${processedMetadata.height} (WebP)`
                    : `${originalMetadata.width} × ${originalMetadata.height} (${originalMetadata.format.toUpperCase()})`}
                </p>
                <p>
                  Size: {isCompleted && processedMetadata
                    ? formatFileSize(processedMetadata.size)
                    : formatFileSize(originalMetadata.size)}
                </p>

                {isCompleted && compressionStats && (
                  <p className="text-green-600 font-medium">
                    {compressionStats.percentReduction}% smaller ({formatFileSize(compressionStats.savings)} saved)
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right side: Actions */}
          <div className="flex space-x-2">
            {isCompleted && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onReprocess}
                  disabled={isLoading}
                >
                  <Dices className="w-4 h-4 mr-1" />
                  Reprocess
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={onDownload}
                  disabled={isLoading}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </>
            )}

            {!isCompleted && !isError && status !== 'idle' && (
              <div className="flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin text-gray-500" />
                <span className="text-sm text-gray-500">
                  {status === 'uploading' && 'Uploading...'}
                  {status === 'stripping-metadata' && 'Stripping metadata...'}
                  {status === 'resizing' && 'Resizing...'}
                  {status === 'converting' && 'Converting to WebP...'}
                  {status === 'processing' && 'Processing...'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add image background grid styling */}
      <style jsx global>{`
        .bg-checkerboard {
          background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                            linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                            linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
      `}</style>
    </div>
  );
};
