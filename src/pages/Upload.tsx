import React, { useState } from 'react';
import { UploadCloudIcon, ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '../components/common/Button';
interface UploadProps {
  onNavigate: (page: string) => void;
}
export function Upload({
  onNavigate
}: UploadProps) {
  const [uploadStage, setUploadStage] = useState<'upload' | 'select' | 'processing'>('upload');
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const mockPages = Array.from({
    length: 12
  }, (_, i) => i + 1);
  const mockThumbnails = ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=600&fit=crop', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop'];
  const handlePageToggle = (pageNum: number) => {
    if (selectedPages.includes(pageNum)) {
      setSelectedPages(selectedPages.filter(p => p !== pageNum));
    } else {
      setSelectedPages([...selectedPages, pageNum]);
    }
  };
  const handleSelectAll = () => {
    if (selectedPages.length === mockPages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(mockPages);
    }
  };
  const handleContinue = () => {
    if (uploadStage === 'upload') {
      setUploadStage('select');
    } else if (uploadStage === 'select') {
      setUploadStage('processing');
      // Simulate processing time
      setTimeout(() => onNavigate('learn'), 3000);
    }
  };
  return <main className="flex flex-col w-full flex-1 p-5 pb-20">
      <header className="flex items-center mb-6">
        <button className="p-2 mr-2 rounded-full hover:bg-gray-100" onClick={() => onNavigate('home')}>
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          {uploadStage === 'upload' && 'Upload PDF'}
          {uploadStage === 'select' && 'Select Pages'}
          {uploadStage === 'processing' && 'Processing Content'}
        </h1>
      </header>
      {uploadStage === 'upload' && <div className="flex flex-col items-center justify-center flex-1">
          <div className="w-full max-w-md p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center">
            <UploadCloudIcon className="w-16 h-16 text-purple-500 mb-4" />
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Drag & Drop PDF here
            </h2>
            <p className="text-sm text-gray-500 text-center mb-4">
              or click to browse files
            </p>
            <Button onClick={handleContinue}>Browse Files</Button>
          </div>
          <div className="mt-8 w-full">
            <h3 className="text-md font-medium text-gray-700 mb-3">
              Recently Used PDFs
            </h3>
            <div className="space-y-3">
              {['Introduction to Psychology.pdf', 'Data Structures.pdf'].map((file, index) => <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center mr-3">
                      <span className="text-red-600 text-xs font-medium">
                        PDF
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {file}
                      </p>
                      <p className="text-xs text-gray-500">Added 2 days ago</p>
                    </div>
                  </div>)}
            </div>
          </div>
        </div>}
      {uploadStage === 'select' && <>
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700 mb-2">
              Introduction to Psychology.pdf
            </h2>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Select pages to convert to videos
              </p>
              <button onClick={handleSelectAll} className="text-purple-600 text-sm font-medium">
                {selectedPages.length === mockPages.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {mockPages.map((pageNum, index) => <div key={pageNum} className={`aspect-[3/4] border rounded-lg relative cursor-pointer overflow-hidden ${selectedPages.includes(pageNum) ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'}`} onClick={() => handlePageToggle(pageNum)}>
                <img src={mockThumbnails[index % mockThumbnails.length]} alt={`Page ${pageNum}`} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    Page {pageNum}
                  </span>
                </div>
                {selectedPages.includes(pageNum) && <div className="absolute top-2 right-2">
                    <CheckCircleIcon className="w-5 h-5 text-purple-500 bg-white rounded-full" />
                  </div>}
              </div>)}
          </div>
          <div className="mt-auto">
            <p className="text-sm text-gray-500 mb-4">
              {selectedPages.length} page{selectedPages.length !== 1 ? 's' : ''}{' '}
              selected
            </p>
            <Button onClick={handleContinue} disabled={selectedPages.length === 0} className="w-full">
              Convert to Videos
            </Button>
          </div>
        </>}
      {uploadStage === 'processing' && <div className="flex flex-col items-center justify-center flex-1 text-center">
          <div className="w-20 h-20 mb-6 relative">
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">
            Processing Content
          </h2>
          <p className="text-gray-500 mb-8 max-w-xs">
            We're turning your PDF pages into bite-sized videos with narration
            and subtitles
          </p>
          <div className="w-full max-w-md bg-gray-200 rounded-full h-1.5 mb-2">
            <div className="bg-purple-600 h-1.5 rounded-full w-3/4"></div>
          </div>
          <p className="text-sm text-gray-500">This may take a few minutes</p>
        </div>}
    </main>;
}