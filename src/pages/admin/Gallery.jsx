import React, { useState } from 'react';

const Gallery = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(''); // success, error, or empty

  // Sample data
  const stats = [
    { label: "Total Images", value: 50 },
    { label: "Albums", value: 10 },
  ];

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus(''); // Clear previous status
    }
  };

  // Handle upload (you can replace this with your API call)
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    setUploading(true);
    setUploadStatus('');

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would normally send the file to your backend
      // Example:
      // const formData = new FormData();
      // formData.append('image', selectedFile);
      // const res = await fetch('/api/upload', { method: 'POST', body: formData });

      setUploadStatus('Upload successful!');
      setSelectedFile(null); // Clear file input
    } catch (error) {
      setUploadStatus('Upload failed. Please try again.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-8">
      {/* Header */}
      <header className="mb-8 animate__animated animate__fadeIn">
        <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
        <p className="text-gray-400 mt-2">
          Upload and manage church gallery images here.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#CE1F2F] to-[#541616] rounded-xl p-6 shadow-lg animate__animated animate__fadeInUp"
          >
            <h2 className="text-lg font-semibold">{stat.label}</h2>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Upload Section */}
      <section className="bg-gray-900 rounded-xl p-6 shadow-lg animate__animated animate__fadeInUp">
        <h2 className="text-2xl font-semibold mb-4">Upload New Image</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a82031]"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`px-6 py-3 rounded-lg font-semibold transition-opacity ${
              uploading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#CE1F2F] to-[#541616] hover:opacity-90'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

        {/* Status Message */}
        {uploadStatus && (
          <p
            className={`mt-4 text-sm ${
              uploadStatus.includes('successful')
                ? 'text-green-400'
                : 'text-red-400'
            }`}
          >
            {uploadStatus}
          </p>
        )}
      </section>

      {/* Optional: Recent Uploads Preview */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Recent Uploads</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Placeholder images */}
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-800 aspect-square rounded-lg overflow-hidden animate__animated animate__fadeIn"
            >
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Image {item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;