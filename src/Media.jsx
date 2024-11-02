import React, { useState, useEffect } from 'react';

const MEDIA_URL = "https://arkad-server.onrender.com/users/media";

const Media = () => {
  const [mediaData, setMediaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = window.innerWidth >= 768 ? 3 : 1;
  const totalPages = Math.ceil(mediaData.length / itemsPerPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndexes, setImageIndexes] = useState({});

  useEffect(() => {
    getMedia();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        mediaData.forEach((item) => {
          const currentIndex = newIndexes[item.id] || 0;
          newIndexes[item.id] = (currentIndex + 1) % item.media.length;
        });
        return newIndexes;
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [mediaData]);

  const getMedia = async () => {
    setLoading(true);

    try {
      const response = await fetch(MEDIA_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (result.success) {
        setMediaData(result.data);
        setImageIndexes(result.data.reduce((acc, item) => {
          acc[item.id] = 0; // Start each item's image index at 0
          return acc;
        }, {}));
      } else {
        setError(result.message);
        setTimeout(() => setError(""), 5000);
      }
    } catch (error) {
      setError('Error fetching media data');
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const currentItems = mediaData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (loading) {
    return (
      <div className="loading-bubble-wrapper">
        <div className="loading-bubble"></div>
        <p className="loading-text">Getting media data...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="p-6">
      <br />
      <h2 className="text-4xl font-bold text-[#006D5B] mb-8 text-center">Media Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden relative"
            style={{ width: '100%', height: '300px' }}  // Set a consistent card size
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={item.media[imageIndexes[item.id]]}  // Display the current image based on the index
                alt={`Media ${item.id}`}
                className="object-cover w-full h-full"  // Ensure full image display
              />
              <div
                className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white px-4 py-3 text-center transition-opacity duration-500"
                style={{ height: '50%' }}
              >
                <p className="text-lg font-semibold animate-pulse">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => goToPage(pageIndex)}
            className={`mx-2 px-4 py-2 rounded-full ${currentPage === pageIndex ? 'bg-[#FFD700] text-white' : 'bg-gray-300 text-gray-700'} transition-colors`}
          >
            {pageIndex + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Media;
