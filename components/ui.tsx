
import React from 'react';

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-7.19c0-.861.394-1.665.955-2.186a.75.75 0 011.32.083c.114.55.322 1.073.588 1.569.836 1.523 2.023 2.822 3.515 3.815-1.428.328-2.88.42-4.346.22-1.465-.2-2.883-.647-4.22-1.32a.75.75 0 01-.28-.217 6.721 6.721 0 01-1.319-3.182.75.75 0 01.217-.679 6.741 6.741 0 012.088-2.565.75.75 0 01.884-.018 5.253 5.253 0 003.703 1.125.75.75 0 01.57.034Z" clipRule="evenodd" /><path d="M3 8.625a1.125 1.125 0 011.125-1.125h.001c.621 0 1.125.504 1.125 1.125v.001c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 8.625zM6.75 12a1.125 1.125 0 011.125-1.125h.001c.621 0 1.125.504 1.125 1.125v.001c0 .621-.504 1.125-1.125 1.125H7.875A1.125 1.125 0 016.75 12zM11.625 15.375a1.125 1.125 0 011.125-1.125h.001c.621 0 1.125.504 1.125 1.125v.001c0 .621-.504 1.125-1.125 1.125h-.001a1.125 1.125 0 01-1.125-1.125z" /></svg>
);

export const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" /></svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
);

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
  </div>
);
