"use client";

import { useCallback } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { isSupportedImageType } from '@/lib/image-utils';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  onClear?: () => void;
  hasFile: boolean;
  className?: string;
  disabled?: boolean;
}

export const Dropzone = ({
  onFileSelect,
  onClear,
  hasFile,
  className,
  disabled = false
}: DropzoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]; // Take only the first file
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  // Define the dropzone options with correct types
  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    maxFiles: 1,
    multiple: false,
    disabled: disabled || hasFile,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
      'image/svg+xml': ['.svg'],
      'image/bmp': ['.bmp'],
      'image/tiff': ['.tiff', '.tif']
    },
    onDragEnter: () => { },
    onDragLeave: () => { },
    onDragOver: () => { },
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone(dropzoneOptions);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClear) onClear();
  }, [onClear]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full min-h-44 p-4 border-2 border-dashed rounded-lg transition-colors",
        isDragActive && "border-primary-400 bg-primary-50",
        isDragAccept && "border-green-500 bg-green-50",
        isDragReject && "border-red-500 bg-red-50",
        !isDragActive && !hasFile && "border-gray-300 hover:border-primary-300 bg-gray-50 hover:bg-gray-100",
        hasFile && "border-primary-500 bg-primary-50",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      {...getRootProps()}
    >
      <input ref={undefined} {...getInputProps()} />

      <div className="flex flex-col items-center justify-center text-center p-6">
        {!hasFile ? (
          <>
            <Upload
              className={cn(
                "w-14 h-14 mb-4",
                isDragActive ? "text-primary-500" : "text-gray-400"
              )}
            />
            <p className="mb-2 text-lg font-medium text-gray-700">
              {isDragActive ? "Drop the image here" : "Drag & drop your image here"}
            </p>
            <p className="mb-4 text-sm text-gray-500">
              or click to browse your files
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: JPEG, PNG, GIF, WEBP, SVG
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Max file size: 10MB
            </p>
          </>
        ) : (
          <div className="flex items-center">
            <p className="text-sm text-gray-700 font-medium">Image selected</p>
            {onClear && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 text-gray-500 hover:text-red-500"
                onClick={handleClear}
                aria-label="Clear selected image"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
