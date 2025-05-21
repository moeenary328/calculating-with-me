// app/layout.jsx
import './globals.css'

// ✅ Import all components correctly
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Calculating with Me',
  description: 'Responsive Layout',
  verification: {
    google: '1RtcwMibRWFeU7erFruYLbMAT4fYlLwP0lRJx29i6sk', // ✅ Google Search Console meta tag
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-950 text-black dark:text-white">
        
        {/* Navbar */}
        <Navbar />

        {/* Page Structure */}
        <div className="flex min-h-screen">
          
          {/* Sidebar */}
          <Sidebar />

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
