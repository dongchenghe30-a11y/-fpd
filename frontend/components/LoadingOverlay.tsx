'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
  progress?: number;
}

export default function LoadingOverlay({ isLoading, progress }: LoadingOverlayProps) {
  const t = useTranslations('upload');

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4 shadow-2xl">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <Loader2 className="w-20 h-20 text-brand-600 animate-spin" />
          
          {/* Progress circle for file upload */}
          {progress !== undefined && (
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 36 36"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${progress} 100`}
                className="text-brand-600 transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        {/* Text */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {t('processing')}
        </h3>
        
        {progress !== undefined && (
          <p className="text-gray-600 dark:text-gray-400">
            {progress}% {t('processing')}
          </p>
        )}

        {/* Feature highlights while loading */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-left">
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">🔒 Secure</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">256-bit SSL</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">🗑️ Auto-clean</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">No storage</p>
          </div>
        </div>
      </div>
    </div>
  );
}
