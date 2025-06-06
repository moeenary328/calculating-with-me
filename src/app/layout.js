// app/layout.jsx
import './globals.css'
import Script from 'next/script'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Calculating with Me',
  description: 'Responsive Layout',
  verification: {
    google: '1RtcwMibRWFeU7erFruYLbMAT4fYlLwP0lRJx29i6sk',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
      <body className="bg-white dark:bg-gray-950 text-black dark:text-white">
        
        {/* Navbar */}
        <Navbar />

        {/* Page Structure */}
        <div className="flex min-h-screen">
          
          {/* Sidebar - Hidden on mobile, shown on md screens and above */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 bg-gray-100 dark:bg-gray-900">
            <div className="flex items-center justify-center min-h-screen p-6">
              <div className="w-full max-w-4xl text-center">
                {children}
              </div>
            </div>
          </main>

        </div>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  )
}



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
//         {/* ✅ Google Site Verification */}
//         <meta
//           name="google-site-verification"
//           content="1RtcwMibRWFeU7erFruYLbMAT4fYlLwP0lRJx29i6sk"
//         />

//         {/* ✅ Google AdSense Publisher Account */}
//         <meta
//           name="google-adsense-account"
//           content="ca-pub-4303081538687883"
//         />

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
//         {/* ✅ Navbar */}
//         <Navbar />

//         {/* ✅ Layout Structure */}
//         <div className="flex min-h-screen">
//           {/* Sidebar */}
//           <div className="hidden md:block">
//             <Sidebar />
//           </div>

//           {/* Main Content */}
//           <main className="flex-1 bg-gray-100 dark:bg-gray-900">
//             <div className="flex items-center justify-center min-h-screen p-6">
//               <div className="w-full max-w-4xl text-center">{children}</div>
//             </div>
//           </main>
//         </div>

//         {/* ✅ Footer */}
//         <Footer />
//       </body>
//     </html>
//   )
// }
