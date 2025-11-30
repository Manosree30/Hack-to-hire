import React, { useState, useRef, ChangeEvent } from 'react';
import { X, Send, Image as ImageIcon, Loader2, ScanSearch } from 'lucide-react';

interface InputAreaProps {
  onAnalyze: (text: string, image?: { base64: string; mimeType: string }) => void;
  isAnalyzing: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onAnalyze, isAnalyzing }) => {
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          file,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!text.trim() && !selectedImage) return;

    if (selectedImage) {
        const base64Data = selectedImage.preview.split(',')[1];
        const mimeType = selectedImage.file.type;
        onAnalyze(text, { base64: base64Data, mimeType });
    } else {
        onAnalyze(text);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-2xl shadow-2xl overflow-hidden relative group">
      {/* Decorative gradient blob */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative p-6 md:p-8 bg-[#130f25] rounded-2xl">
        <label className="flex items-center space-x-2 text-sm font-semibold text-indigo-300 mb-4 uppercase tracking-wider">
          <ScanSearch size={16} />
          <span>Input Data for Analysis</span>
        </label>
        
        <div className="relative">
          <textarea
            className="w-full h-32 p-4 text-slate-200 bg-[#0f0a1e] border border-indigo-900/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none placeholder-slate-600"
            placeholder="Paste suspicious text, email content, or describe the call here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isAnalyzing}
          />
          
          {selectedImage && (
            <div className="mt-4 relative inline-block group/img">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-lg blur-sm"></div>
              <img 
                src={selectedImage.preview} 
                alt="Upload preview" 
                className="relative h-28 w-auto rounded-lg border border-indigo-500/30 object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors shadow-lg z-10"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-medium text-indigo-200 bg-indigo-950/50 hover:bg-indigo-900/70 border border-indigo-800 rounded-lg transition-all hover:border-indigo-600"
            >
              <ImageIcon size={18} />
              <span>Upload Screenshot</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isAnalyzing || (!text.trim() && !selectedImage)}
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 rounded-lg font-bold text-white transition-all transform active:scale-95 shadow-lg ${
              isAnalyzing || (!text.trim() && !selectedImage)
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-900/30 hover:shadow-purple-900/50'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Run Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};