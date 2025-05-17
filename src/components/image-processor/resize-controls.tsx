"use client";

import { useCallback } from 'react';
import { Dropdown } from '@/components/ui/dropdown';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, RotateCcw } from 'lucide-react';
import { ResizeOptions } from '@/lib/types';

interface ResizeControlsProps {
  options: ResizeOptions;
  originalWidth?: number;
  originalHeight?: number;
  onUpdateOptions: (options: Partial<ResizeOptions>) => void;
  onReset: () => void;
  className?: string;
  disabled?: boolean;
}

export const ResizeControls = ({
  options,
  originalWidth,
  originalHeight,
  onUpdateOptions,
  onReset,
  className,
  disabled = false
}: ResizeControlsProps) => {
  // Fit options for dropdown
  const fitOptions = [
    { value: 'contain', label: 'Contain (preserve aspect ratio)' },
    { value: 'cover', label: 'Cover (fill and crop if needed)' },
    { value: 'fill', label: 'Fill (stretch to fit)' },
    { value: 'inside', label: 'Inside (resize to fit inside)' },
    { value: 'outside', label: 'Outside (resize to cover)' }
  ];

  // Quality options for dropdown
  const qualityOptions = [
    { value: '100', label: '100% (Best quality)' },
    { value: '90', label: '90% (High quality)' },
    { value: '80', label: '80% (Good quality)' },
    { value: '70', label: '70% (Balanced)' },
    { value: '60', label: '60% (Medium quality)' },
    { value: '50', label: '50% (Smaller size)' },
    { value: '40', label: '40% (Small size)' },
    { value: '30', label: '30% (Very small)' }
  ];

  // Toggle aspect ratio lock
  const toggleAspectRatio = useCallback(() => {
    onUpdateOptions({ maintainAspectRatio: !options.maintainAspectRatio });
  }, [onUpdateOptions, options.maintainAspectRatio]);

  // Handle width change (with aspect ratio calculation if locked)
  const handleWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value ? parseInt(e.target.value, 10) : undefined;

    if (options.maintainAspectRatio && newWidth && originalWidth && originalHeight) {
      const aspectRatio = originalHeight / originalWidth;
      const newHeight = Math.round(newWidth * aspectRatio);
      onUpdateOptions({ width: newWidth, height: newHeight });
    } else {
      onUpdateOptions({ width: newWidth });
    }
  }, [onUpdateOptions, options.maintainAspectRatio, originalWidth, originalHeight]);

  // Handle height change (with aspect ratio calculation if locked)
  const handleHeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value ? parseInt(e.target.value, 10) : undefined;

    if (options.maintainAspectRatio && newHeight && originalWidth && originalHeight) {
      const aspectRatio = originalWidth / originalHeight;
      const newWidth = Math.round(newHeight * aspectRatio);
      onUpdateOptions({ height: newHeight, width: newWidth });
    } else {
      onUpdateOptions({ height: newHeight });
    }
  }, [onUpdateOptions, options.maintainAspectRatio, originalWidth, originalHeight]);

  // Handle fit option change
  const handleFitChange = useCallback((value: string) => {
    onUpdateOptions({
      fit: value as 'contain' | 'cover' | 'fill' | 'inside' | 'outside'
    });
  }, [onUpdateOptions]);

  // Handle quality change
  const handleQualityChange = useCallback((value: string) => {
    onUpdateOptions({ quality: parseInt(value, 10) });
  }, [onUpdateOptions]);

  // Handle percentage change
  const handlePercentageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!originalWidth || !originalHeight) return;

    const percentage = parseInt(e.target.value, 10);
    if (isNaN(percentage)) return;

    const scaleFactor = percentage / 100;
    const newWidth = Math.round(originalWidth * scaleFactor);
    const newHeight = Math.round(originalHeight * scaleFactor);

    onUpdateOptions({ width: newWidth, height: newHeight });
  }, [onUpdateOptions, originalWidth, originalHeight]);

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900">Resize Options</h3>

      {/* Percentage slider */}
      {originalWidth && originalHeight && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Resize by percentage
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={Math.round((options.width || originalWidth) / originalWidth * 100)}
              onChange={handlePercentageChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={disabled}
            />
            <span className="text-sm text-gray-600 min-w-[3.5rem]">
              {Math.round((options.width || originalWidth) / originalWidth * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Width and height inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="width" className="block text-sm font-medium text-gray-700">
            Width (px)
          </label>
          <div className="relative">
            <input
              type="number"
              id="width"
              min="1"
              max="10000"
              value={options.width || ''}
              onChange={handleWidthChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder={originalWidth?.toString() || 'Width'}
              disabled={disabled}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Height (px)
          </label>
          <div className="relative">
            <input
              type="number"
              id="height"
              min="1"
              max="10000"
              value={options.height || ''}
              onChange={handleHeightChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder={originalHeight?.toString() || 'Height'}
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      {/* Aspect ratio toggle */}
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={toggleAspectRatio}
          disabled={disabled}
          className="flex items-center"
        >
          {options.maintainAspectRatio ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Aspect ratio locked
            </>
          ) : (
            <>
              <Unlock className="w-4 h-4 mr-2" />
              Aspect ratio unlocked
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          disabled={disabled}
          className="ml-2"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      {/* Fit mode dropdown */}
      <div className="space-y-1">
        <Dropdown
          label="Resize Mode"
          options={fitOptions}
          value={options.fit || 'contain'}
          onChange={handleFitChange}
          disabled={disabled}
        />
        <p className="text-xs text-gray-500 mt-1">
          {options.fit === 'contain' && 'Keeps entire image visible without cropping'}
          {options.fit === 'cover' && 'Fills area completely, may crop parts of image'}
          {options.fit === 'fill' && 'Stretches image to fit exactly, may distort'}
          {options.fit === 'inside' && 'Resizes to be completely contained within dimensions'}
          {options.fit === 'outside' && 'Resizes to completely cover target dimensions'}
        </p>
      </div>

      {/* Quality dropdown */}
      <div className="space-y-1">
        <Dropdown
          label="WebP Quality"
          options={qualityOptions}
          value={options.quality?.toString() || '80'}
          onChange={handleQualityChange}
          disabled={disabled}
        />
        <p className="text-xs text-gray-500 mt-1">
          Lower quality = smaller file size. Higher quality = better image fidelity.
        </p>
      </div>
    </div>
  );
};
