'use client';

import { useTranslations } from 'next-intl';
import { Upload, CloudUpload, File } from 'lucide-react';
import { useCallback, useState } from 'react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // MB
}

export default function FileUploader({
  onFilesSelected,
  accept = '.pdf',
  multiple = false,
  maxSize = 100,
}: FileUploaderProps) {
  const t = useTranslations('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter(
        (file) => file.size <= maxSize * 1024 * 1024
      );

      if (validFiles.length > 0) {
        setSelectedFiles(multiple ? validFiles : [validFiles[0]]);
        onFilesSelected(multiple ? validFiles : [validFiles[0]]);
      }
    },
    [maxSize, multiple, onFilesSelected]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const validFiles = files.filter(
        (file) => file.size <= maxSize * 1024 * 1024
      );

      if (validFiles.length > 0) {
        setSelectedFiles(multiple ? validFiles : [validFiles[0]]);
        onFilesSelected(multiple ? validFiles : [validFiles[0]]);
      }
    },
    [maxSize, multiple, onFilesSelected]
  );

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        className={`
          upload-zone cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleFileSelect}
        />

        <CloudUpload
          className={`
            w-16 h-16 mx-auto mb-4 transition-colors
            ${isDragging ? 'text-blue-600' : 'text-gray-400'}
          `}
        />

        <p className="text-lg font-medium text-gray-700 mb-2">
          {t('dragDrop')}
        </p>

        <p className="text-gray-500 mb-4">{t('or')}</p>

        <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Upload className="w-4 h-4 mr-2 inline" />
          {t('browse')}
        </button>

        <p className="mt-4 text-sm text-gray-500">
          {t('maxSize')}
        </p>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
