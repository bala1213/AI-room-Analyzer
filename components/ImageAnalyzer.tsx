
import React, { useState, useCallback } from 'react';
import { analyzeImage } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import { LoadingSpinner, UploadIcon, SparklesIcon } from './ui';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    // A simple parser for basic markdown formatting.
    const renderContent = () => {
        return content
            .split('\n')
            .map((line, index) => {
                if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-teal-300">{line.substring(4)}</h3>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-teal-400">{line.substring(3)}</h2>;
                }
                if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold mt-8 mb-4 text-teal-400">{line.substring(2)}</h1>;
                }
                if (line.startsWith('* ')) {
                    return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
                }
                 if (line.trim() === '') {
                    return <br key={index} />;
                }
                return <p key={index} className="mb-2 leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>;
            });
    };

    return <div className="prose prose-invert max-w-none text-slate-300">{renderContent()}</div>;
};

const ImageAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
      setError(null);
    } else {
      setError('Please select a valid image file (JPEG, PNG, etc.).');
      setSelectedFile(null);
      setPreviewUrl(null);
    }
    event.target.value = ''; // Reset file input
  };

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const base64Data = await fileToBase64(selectedFile);
      const result = await analyzeImage(base64Data, selectedFile.type);
      setAnalysisResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to get suggestions. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  const Uploader: React.FC = () => (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        className="relative block w-full border-2 border-dashed border-slate-600 rounded-lg p-12 text-center cursor-pointer hover:border-teal-500 transition-colors bg-slate-800/50"
      >
        <UploadIcon className="mx-auto h-12 w-12 text-slate-500" />
        <span className="mt-2 block text-sm font-semibold text-slate-300">
          Upload a photo of your room
        </span>
        <span className="mt-1 block text-xs text-slate-500">
          PNG, JPG, GIF
        </span>
        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
      </label>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-6 p-6 bg-slate-800/50 rounded-xl shadow-lg border border-slate-700 h-full">
            <h2 className="text-2xl font-bold text-slate-100">1. Upload Your Photo</h2>
            <p className="text-slate-400 text-sm">Choose a clear photo of the room you'd like to organize. The better the quality, the better the suggestions!</p>
            
            {!previewUrl ? <Uploader /> : (
                <div className="mt-4 flex-grow flex flex-col">
                    <img src={previewUrl} alt="Room preview" className="rounded-lg max-h-96 w-full object-contain" />
                    <button onClick={() => { setPreviewUrl(null); setSelectedFile(null); }} className="w-full mt-4 text-sm text-center text-slate-400 hover:text-white">Choose a different photo</button>
                </div>
            )}
            
            <button
                onClick={handleAnalyze}
                disabled={!selectedFile || isLoading}
                className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-all hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 mt-auto"
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner />
                        <span>Analyzing...</span>
                    </>
                ) : (
                    <>
                        <SparklesIcon className="h-5 w-5" />
                        Get Organizing Suggestions
                    </>
                )}
            </button>
        </div>

        <div className="flex flex-col gap-4 p-6 bg-slate-800/50 rounded-xl shadow-lg border border-slate-700 min-h-[500px] lg:min-h-full">
            <h2 className="text-2xl font-bold text-slate-100">2. Your AI-Powered Plan</h2>
            <div className="flex-grow p-1">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                        <LoadingSpinner />
                        <p className="mt-4">Our AI is tidying up some ideas for you...</p>
                        <p className="text-sm">This may take a moment.</p>
                    </div>
                )}
                {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
                {analysisResult && (
                    <div className="bg-slate-900 rounded-lg max-h-[70vh] overflow-y-auto p-4 custom-scrollbar">
                        <MarkdownRenderer content={analysisResult} />
                    </div>
                )}
                {!isLoading && !analysisResult && !error && (
                     <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 border-2 border-dashed border-slate-700 rounded-lg">
                        <p>Your decluttering suggestions will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ImageAnalyzer;