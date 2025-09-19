// app/gallery/page.js
'use client';

import { useState, useEffect } from 'react';

export default function Gallery() {
  // Public folder se images
  const images = [
    { id: 1, src: '/t1.png', title: 'tiktok little goal' },
    { id: 2, src: '/t2.jpg', title: 'tiktok large goal' },
    { id: 3, src: '/t3.jpg', title: 'titok big goals' },
    { id: 4, src: '/moeen.jpg', title: 'I,m moeen' },
  ];

  const [showFirstAlert, setShowFirstAlert] = useState(false);
  const [showSecondAlert, setShowSecondAlert] = useState(false);
  const [showAdAfterDownload, setShowAdAfterDownload] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Direct image download function
  const downloadImage = (image) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = image.src;
    
    // Extract file extension from src
    const fileExtension = image.src.split('.').pop().toLowerCase();
    link.download = `${image.title.replace(/\s+/g, '_')}.${fileExtension}`;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Alerts band karo after download
    setShowFirstAlert(false);
    setShowSecondAlert(false);
    
    // Download ke baad ad show karo
    setShowAdAfterDownload(true);
    
    // 5 seconds baad ad hide ho jaye
    setTimeout(() => {
      setShowAdAfterDownload(false);
    }, 5000);
  };

  // Pehla alert show karne ka function
  const showFirstAlertDialog = (image) => {
    setSelectedImage(image);
    setShowFirstAlert(true);
  };

  // Dusra alert show karne ka function
  const showSecondAlertDialog = () => {
    setShowFirstAlert(false);
    setShowSecondAlert(true);
  };

  // Alert band karne ka function
  const closeAlerts = () => {
    setShowFirstAlert(false);
    setShowSecondAlert(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 relative">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        My Gallery
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <div className="h-48 overflow-hidden flex items-center justify-center p-1">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTVlNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZpbGw9IiM5OTk5OTkiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
                }}
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-800 dark:text-white text-center mb-3 text-sm truncate">
                {image.title}
              </h3>
              <button
                onClick={() => showFirstAlertDialog(image)}
                className="w-full py-2 px-3 rounded-md transition-all duration-200 flex items-center justify-center text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Adsterra Social Banner Ad - Always Visible */}
      <div className="mt-8 text-center">
        <div id="adsterra-social-banner" className="mx-auto" style={{ maxWidth: '728px', minHeight: '90px' }}>
          {/* Adsterra Social Banner Ad yahan load hoga */}
        </div>
      </div>

      {/* Download ke baad dikhne wala Ad */}
      {showAdAfterDownload && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-4">
            <h3 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-white">
              Thank you for downloading!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
              Please support us by viewing this ad
            </p>
            
            {/* Additional ad space yahan add kar sakte hain */}
            <div className="w-full h-60 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
              <p className="text-gray-500">Ad space for future use</p>
            </div>
            
            <button
              onClick={() => setShowAdAfterDownload(false)}
              className="w-full mt-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Pehla Alert - Welcome Message */}
      {showFirstAlert && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-1">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                Moeen Bhai
              </h3>
            </div>
            
            <div className="mb-5 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Aap Moeen Bhai ki official website par hain!
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Yeh website Moeen Bhai ne banayi hai aur yahan aap unki images download kar sakte hain.
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={closeAlerts}
                className="px-5 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-md transition-colors"
              >
                Back
              </button>
              
              <button
                onClick={showSecondAlertDialog}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dusra Alert - Download Confirmation */}
      {showSecondAlert && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-1">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Download Confirmation
              </h3>
            </div>
            
            <div className="mb-5 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Kya aap <span className="font-medium text-blue-600">{selectedImage.title}</span> download karna chahte hain?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Moeen Bhai ki website se download ho raha hai
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={closeAlerts}
                className="px-5 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-md transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={() => downloadImage(selectedImage)}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agar koi image nahi hai toh message dikhao */}
      {images.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">No images found in the public folder.</p>
          <p className="text-xs mt-1">Please add images to the public folder and update the code.</p>
        </div>
      )}

      {/* ✅ Adsterra Social Banner Ads Script */}
      <script 
        type='text/javascript' 
        src='//pl26853768.revenuecpmgate.com/d5/08/02/d508023ed9186569d65c5bd168ebd23a.js'
        strategy="afterInteractive"
        async
      />
    </div>
  );
}