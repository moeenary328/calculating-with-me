// app/layout.jsx
'use client';

import './globals.css'
import Script from 'next/script'
import { useEffect } from 'react'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  // Smart popunder implementation
  useEffect(() => {
    let clickCount = 0;
    let lastPopupTime = 0;
    let popunderShown = false;

    const handleSmartClick = (e) => {
      // Important elements par popunder nahi dikhayen
      const isImportantElement = 
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('form') ||
        e.target.closest('[role="button"]');

      if (isImportantElement) return;

      clickCount++;
      const currentTime = Date.now();

      // Conditions for showing popunder (user-friendly)
      const shouldShowPopunder = 
        // At least 3 clicks
        clickCount >= 3 &&
        // At least 30 seconds since last popup
        (currentTime - lastPopupTime) > 30000 &&
        // Only show once per session
        !popunderShown &&
        // Don't show immediately
        currentTime > 10000; // Wait 10 seconds after page load

      if (shouldShowPopunder) {
        try {
          // Load popunder script
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = '//pl26853851.revenuecpmgate.com/87/f4/b3/87f4b34e287b3ba0887080f8e99affa3.js';
          script.async = true;
          
          // Add to document
          document.body.appendChild(script);
          
          // Update flags
          lastPopupTime = currentTime;
          popunderShown = true;
          clickCount = 0;

          console.log('Popunder shown intelligently');

          // Reset after 1 hour (optional)
          setTimeout(() => {
            popunderShown = false;
          }, 3600000);

        } catch (error) {
          console.log('Popunder loading error:', error);
        }
      }
    };

    // Add event listener with delay
    const timer = setTimeout(() => {
      document.addEventListener('click', handleSmartClick);
    }, 5000); // Start listening after 5 seconds

    // Cleanup
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleSmartClick);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        {/* ✅ Title and metadata manually set */}
        <title>Calculating with Me</title>
        <meta name="description" content="Responsive Layout" />
        <meta name="google-site-verification" content="1RtcwMibRWFeU7erFruYLbMAT4fYlLwP0lRJx29i6sk" />
        
        {/* ✅ Google Analytics Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B9ZHZ1K4J5"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B9ZHZ1K4J5');
          `}
        </Script>
      </head>
      <body className={`${isHomePage ? 'bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white' : 'bg-white dark:bg-gray-950 text-black dark:text-white'}`}>
        
        {/* Navbar - Show on all pages including home page */}
        <Navbar />

        {/* Page Structure */}
        <div className={`${isHomePage ? '' : 'flex min-h-screen'}`}>
          
          {/* Sidebar - Hide on home page, show on other pages */}
          {!isHomePage && (
            <div className="hidden md:block">
              <Sidebar />
            </div>
          )}

          {/* Main Content */}
          <main className={`${isHomePage ? '' : 'flex-1 bg-gray-100 dark:bg-gray-900'}`}>
            {isHomePage ? (
              // Home page - full screen with no containers
              <div className="min-h-screen">
                {children}
              </div>
            ) : (
              // Other pages - with centered content
              <div className="flex items-center justify-center min-h-screen p-6">
                <div className="w-full max-w-4xl text-center">
                  {children}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Footer - Show on all pages */}
        <Footer />

      </body>
    </html>
  )
}






// // app/layout.jsx
// 'use client';

// import './globals.css'
// import Script from 'next/script'
// import { useEffect } from 'react'

// import Navbar from '../components/Navbar'
// import Sidebar from '../components/Sidebar'
// import Footer from '../components/Footer'

// export default function RootLayout({ children }) {
//   // Smart popunder implementation
//   useEffect(() => {
//     let clickCount = 0;
//     let lastPopupTime = 0;
//     let popunderShown = false;

//     const handleSmartClick = (e) => {
//       // Important elements par popunder nahi dikhayen
//       const isImportantElement = 
//         e.target.tagName === 'A' ||
//         e.target.tagName === 'BUTTON' ||
//         e.target.closest('a') ||
//         e.target.closest('button') ||
//         e.target.closest('form') ||
//         e.target.closest('[role="button"]');

//       if (isImportantElement) return;

//       clickCount++;
//       const currentTime = Date.now();

//       // Conditions for showing popunder (user-friendly)
//       const shouldShowPopunder = 
//         // At least 3 clicks
//         clickCount >= 3 &&
//         // At least 30 seconds since last popup
//         (currentTime - lastPopupTime) > 30000 &&
//         // Only show once per session
//         !popunderShown &&
//         // Don't show immediately
//         currentTime > 10000; // Wait 10 seconds after page load

//       if (shouldShowPopunder) {
//         try {
//           // Load popunder script
//           const script = document.createElement('script');
//           script.type = 'text/javascript';
//           script.src = '//pl26853851.revenuecpmgate.com/87/f4/b3/87f4b34e287b3ba0887080f8e99affa3.js';
//           script.async = true;
          
//           // Add to document
//           document.body.appendChild(script);
          
//           // Update flags
//           lastPopupTime = currentTime;
//           popunderShown = true;
//           clickCount = 0;

//           console.log('Popunder shown intelligently');

//           // Reset after 1 hour (optional)
//           setTimeout(() => {
//             popunderShown = false;
//           }, 3600000);

//         } catch (error) {
//           console.log('Popunder loading error:', error);
//         }
//       }
//     };

//     // Add event listener with delay
//     const timer = setTimeout(() => {
//       document.addEventListener('click', handleSmartClick);
//     }, 5000); // Start listening after 5 seconds

//     // Cleanup
//     return () => {
//       clearTimeout(timer);
//       document.removeEventListener('click', handleSmartClick);
//     };
//   }, []);

//   return (
//     <html lang="en">
//       <head>
//         {/* ✅ Title and metadata manually set */}
//         <title>Calculating with Me</title>
//         <meta name="description" content="Responsive Layout" />
//         <meta name="google-site-verification" content="1RtcwMibRWFeU7erFruYLbMAT4fYlLwP0lRJx29i6sk" />
        
//         {/* ✅ Google Analytics Script */}
//         <Script
//           async
//           src="https://www.googletagmanager.com/gtag/js?id=G-B9ZHZ1K4J5"
//         />
//         <Script id="google-analytics">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-B9ZHZ1K4J5');
//           `}
//         </Script>
//       </head>
//       <body className="bg-white dark:bg-gray-950 text-black dark:text-white">
        
//         {/* Navbar */}
//         <Navbar />

//         {/* Page Structure */}
//         <div className="flex min-h-screen">
          
//           {/* Sidebar */}
//           <div className="hidden md:block">
//             <Sidebar />
//           </div>

//           {/* Main Content */}
//           <main className="flex-1 bg-gray-100 dark:bg-gray-900">
//             <div className="flex items-center justify-center min-h-screen p-6">
//               <div className="w-full max-w-4xl text-center">
//                 {children}
//               </div>
//             </div>
//           </main>
//         </div>

//         {/* Footer */}
//         <Footer />

//       </body>
//     </html>
//   )
// }










// // app/layout.jsx
// import './globals.css'
// import Script from 'next/script'

// import Navbar from '../components/Navbar'
// import Sidebar from '../components/Sidebar'
// import Footer from '../components/Footer'

// export const metadata = {
//   title: 'Calculating with Me',
//   description: 'Responsive Layout',
//   verification: {
//     google: '1RtcwMibRWFeU7erFruYLbMAT4fYlLwP0lRJx29i6sk',
//   },
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* ✅ Google Analytics Script */}
//         <Script
//           async
//           src="https://www.googletagmanager.com/gtag/js?id=G-B9ZHZ1K4J5"
//         />
//         <Script id="google-analytics">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-B9ZHZ1K4J5');
//           `}
//         </Script>
//       </head>
//       <body className="bg-white dark:bg-gray-950 text-black dark:text-white">
        
//         {/* Navbar */}
//         <Navbar />

//         {/* Page Structure */}
//         <div className="flex min-h-screen">
          
//           {/* Sidebar */}
//           <div className="hidden md:block">
//             <Sidebar />
//           </div>

//           {/* Main Content */}
//           <main className="flex-1 bg-gray-100 dark:bg-gray-900">
//             <div className="flex items-center justify-center min-h-screen p-6">
//               <div className="w-full max-w-4xl text-center">
//                 {children}
//               </div>
//             </div>
//           </main>
//         </div>

//         {/* ✅ Native Banner Ad */}
//         <div className="w-full text-center my-4">
//           <div id="container-b186b4d93f13ebc324bc5c223d241aee" />
//           <Script
//             strategy="afterInteractive"
//             id="native-banner-ad"
//             async
//             data-cfasync="false"
//             src="//pl26853831.profitableratecpm.com/b186b4d93f13ebc324bc5c223d241aee/invoke.js"
//           />
//         </div>

//         {/* Footer */}
//         <Footer />

//       </body>
//     </html>
//   )
// }
