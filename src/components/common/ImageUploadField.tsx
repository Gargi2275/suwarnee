import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, Loader2, Link2, AlertCircle } from 'lucide-react';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  helpText?: string;
}

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || '';

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label = 'Upload Image',
  required = false,
  helpText = 'PNG, JPG, JPEG, WEBP up to 10MB'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size exceeds 10MB limit.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    // 1. Instant local preview via DataURL so user sees it without waiting
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
      }
    };
    reader.readAsDataURL(file);

    // 2. Upload to backend server
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const json = await res.json();
        if (json.url) {
          onChange(json.url);
        }
      }
    } catch (err) {
      console.warn('Upload to server failed, retained high-res local image:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#5C5348]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-[#C85413] hover:underline flex items-center gap-1 cursor-pointer font-medium"
        >
          <Link2 className="w-3 h-3" />
          <span>{showUrlInput ? 'Switch to File Upload' : 'Or paste Image URL'}</span>
        </button>
      </div>

      {showUrlInput ? (
        <div>
          <input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            required={required}
            className="w-full px-3 py-2 rounded-xl border border-[#E3D9C4] bg-white text-xs text-[#221D18] focus:outline-none focus:ring-2 focus:ring-[#C85413]"
          />
        </div>
      ) : (
        <div>
          {value ? (
            /* Image Preview Card */
            <div className="relative rounded-xl border border-[#E3D9C4] bg-[#F7F3EB] p-3 flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-white border border-[#EFE8DA] shrink-0 flex items-center justify-center">
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/Photos/Surawanee_new_location-updraft-pre-smush-original.png';
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Image Selected</span>
                </div>
                <p className="text-[11px] text-[#8A7E70] truncate font-mono">
                  {value.startsWith('data:') ? 'Local file attached (Ready)' : value}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#E3D9C4] text-xs font-semibold text-[#651728] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    {isUploading ? 'Uploading...' : 'Change Image'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('')}
                    className="px-2 py-1 rounded-lg text-xs text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove image"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {isUploading && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-2xs rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-[#651728]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#C85413]" />
                  <span>Saving image to server...</span>
                </div>
              )}
            </div>
          ) : (
            /* Drag and Drop Zone */
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#C85413] bg-[#FFF8F1] scale-[1.01]'
                  : 'border-[#E3D9C4] hover:border-[#C85413] bg-white hover:bg-[#FFFDF9]'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8F1] text-[#C85413] mx-auto flex items-center justify-center mb-2 border border-[#EFE8DA]">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Upload className="w-6 h-6" />
                )}
              </div>

              <div className="text-xs font-bold text-[#221D18]">
                {isUploading ? 'Processing upload...' : 'Click to browse or drag & drop image'}
              </div>
              <p className="text-[11px] text-[#8A7E70] mt-1">{helpText}</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="hidden"
          />
        </div>
      )}

      {uploadError && (
        <div className="text-xs text-red-600 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  );
};
