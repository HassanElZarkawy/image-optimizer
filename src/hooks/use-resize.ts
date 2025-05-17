"use client";

import { useState, useCallback } from 'react';
import { ResizeOptions } from '@/lib/types';

/**
 * Custom hook for managing image resize options and constraints
 * @param initialOptions - Initial resize options
 * @param originalWidth - Original image width (optional)
 * @param originalHeight - Original image height (optional)
 * @returns Resize state and handlers
 */
export const useResize = (
  initialOptions: ResizeOptions = {
    width: undefined,
    height: undefined,
    maintainAspectRatio: true,
    fit: 'contain',
    quality: 80
  },
  originalWidth?: number,
  originalHeight?: number
) => {
  const [options, setOptions] = useState<ResizeOptions>(initialOptions);
  const [constraintMode, setConstraintMode] = useState<'percentage' | 'dimensions'>('dimensions');
  const [percentage, setPercentage] = useState(100);

  /**
   * Update a specific option
   */
  const updateOption = useCallback(<K extends keyof ResizeOptions>(
    key: K,
    value: ResizeOptions[K]
  ) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  /**
   * Set the resize dimensions
   */
  const setDimensions = useCallback((width?: number, height?: number) => {
    setOptions(prev => ({
      ...prev,
      width,
      height
    }));
  }, []);

  /**
   * Toggle aspect ratio lock
   */
  const toggleAspectRatio = useCallback(() => {
    setOptions(prev => ({
      ...prev,
      maintainAspectRatio: !prev.maintainAspectRatio
    }));
  }, []);

  /**
   * Set quality level (1-100)
   */
  const setQuality = useCallback((quality: number) => {
    const normalizedQuality = Math.max(1, Math.min(100, quality));
    setOptions(prev => ({
      ...prev,
      quality: normalizedQuality
    }));
  }, []);

  /**
   * Calculate and set dimensions based on percentage of original size
   */
  const setByPercentage = useCallback((percent: number) => {
    if (!originalWidth || !originalHeight) return;

    const normalizedPercent = Math.max(1, Math.min(100, percent));
    setPercentage(normalizedPercent);

    const scaleFactor = normalizedPercent / 100;
    const newWidth = Math.round(originalWidth * scaleFactor);
    const newHeight = Math.round(originalHeight * scaleFactor);

    setOptions(prev => ({
      ...prev,
      width: newWidth,
      height: newHeight
    }));
  }, [originalWidth, originalHeight]);

  /**
   * Switch between percentage and direct dimension modes
   */
  const toggleConstraintMode = useCallback(() => {
    setConstraintMode(prev => {
      const newMode = prev === 'percentage' ? 'dimensions' : 'percentage';

      // Update dimensions when switching modes
      if (newMode === 'percentage' && originalWidth && originalHeight) {
        const widthPercent = options.width ? (options.width / originalWidth) * 100 : 100;
        const heightPercent = options.height ? (options.height / originalHeight) * 100 : 100;
        const avgPercent = (widthPercent + heightPercent) / 2;
        setPercentage(Math.round(avgPercent));
      }

      return newMode;
    });
  }, [options.width, options.height, originalWidth, originalHeight]);

  /**
   * Reset options to defaults
   */
  const resetOptions = useCallback(() => {
    setOptions({
      width: undefined,
      height: undefined,
      maintainAspectRatio: true,
      fit: 'contain',
      quality: 80
    });
    setPercentage(100);
    setConstraintMode('dimensions');
  }, []);

  /**
   * Set width while maintaining aspect ratio if enabled
   */
  const setWidth = useCallback((width?: number) => {
    if (!width) {
      setOptions(prev => ({ ...prev, width: undefined }));
      return;
    }

    if (options.maintainAspectRatio && originalWidth && originalHeight && width) {
      const aspectRatio = originalHeight / originalWidth;
      const height = Math.round(width * aspectRatio);
      setOptions(prev => ({
        ...prev,
        width,
        height
      }));
    } else {
      setOptions(prev => ({
        ...prev,
        width
      }));
    }
  }, [options.maintainAspectRatio, originalWidth, originalHeight]);

  /**
   * Set height while maintaining aspect ratio if enabled
   */
  const setHeight = useCallback((height?: number) => {
    if (!height) {
      setOptions(prev => ({ ...prev, height: undefined }));
      return;
    }

    if (options.maintainAspectRatio && originalWidth && originalHeight && height) {
      const aspectRatio = originalWidth / originalHeight;
      const width = Math.round(height * aspectRatio);
      setOptions(prev => ({
        ...prev,
        width,
        height
      }));
    } else {
      setOptions(prev => ({
        ...prev,
        height
      }));
    }
  }, [options.maintainAspectRatio, originalWidth, originalHeight]);

  return {
    options,
    constraintMode,
    percentage,
    updateOption,
    setDimensions,
    toggleAspectRatio,
    setQuality,
    setByPercentage,
    toggleConstraintMode,
    resetOptions,
    setWidth,
    setHeight
  };
};
