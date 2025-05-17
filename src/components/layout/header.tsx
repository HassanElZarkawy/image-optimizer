"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ImagePlus, Menu, X, Github, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Close menu if clicking outside
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={cn(
      "bg-white border-b border-gray-200",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center" onClick={closeMenu}>
                <ImagePlus className="h-8 w-8 text-primary-500" aria-hidden="true" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Image Optimizer
                </span>
              </Link>
            </div>
          </div>

          {/* Secondary navigation and mobile menu button */}
          <div className="flex items-center">
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <a
                href="https://github.com/yourusername/image-processor-app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header >
  );
};