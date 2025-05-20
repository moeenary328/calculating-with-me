export const metadata = {
  title: 'Privacy Policy | Calculating with Me',
  description: 'Read our privacy policy to understand how we collect, use, and protect your information on Calculating with Me.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4">
          At <strong>Calculating with Me</strong>, your privacy is extremely important to us. This Privacy Policy outlines what information we collect, how we use it, and how we protect it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p className="mb-4">
          We do <strong>not</strong> collect any personal information. All text entered into our tools is processed only in your browser. We don’t store or transmit any data to our servers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          Since we don’t collect any personal data, there’s nothing to use or share. Your usage remains completely anonymous and secure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Tools</h2>
        <p className="mb-4">
          Our site may include links to third-party services (e.g., PDF downloaders). We are not responsible for their content or privacy practices. We recommend reviewing their privacy policies separately.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
        <p className="mb-4">
          We do not use cookies for tracking or analytics. Your activity is not monitored.
        </p>

      </div>
    </div>
  );
}
