// app/gallery/page.js
'use client';

export default function Gallery() {
  // Public folder se images
  const images = [
    { id: 1, src: '/moeenqfr.jpg', title: 'Moeen QFR' },
    // Yahan aur images add kar sakte hain
    { id: 2, src: '/mnq.jpg', title: 'Dusri Image' },
    { id: 3, src: '/mn1.jpg', title: 'Dusri Image' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">My Gallery</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 dark:text-white text-center">{image.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}