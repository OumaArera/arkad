import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

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
    }, 5000);

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
          acc[item.id] = 0;
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

  const handleSwipe = (item) => {
    setImageIndexes((prevIndexes) => {
      const newIndexes = { ...prevIndexes };
      newIndexes[item.id] = (newIndexes[item.id] + 1) % item.media.length;
      return newIndexes;
    });
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
      <h2 className="text-4xl font-bold text-[#006D5B] mb-8 text-center">Media Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item) => (
          <SwipeableMediaItem
            key={item.id}
            item={item}
            imageIndex={imageIndexes[item.id]}
            onSwipe={() => handleSwipe(item)}
          />
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

const SwipeableMediaItem = ({ item, imageIndex, onSwipe }) => {
  const handlers = useSwipeable({
    onSwipedLeft: onSwipe,
    onSwipedRight: onSwipe,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="bg-white shadow-lg rounded-lg overflow-hidden relative"
      style={{ width: '100%', height: '350px' }}
    >
      {/* Image with swipe icons and transition effect */}
      <div className="relative w-full h-4/5 flex items-center justify-center transition-transform duration-500 ease-in-out">
        <img
          src={item.media[imageIndex]}
          alt={`Media ${item.id}`}
          className="object-cover w-full h-full"
          style={{
            transition: 'transform 0.5s ease-in-out',
            transform: `translateX(-${imageIndex * 100}%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <span className="material-icons text-white opacity-60">arrow_back_ios</span>
          <span className="material-icons text-white opacity-60">arrow_forward_ios</span>
        </div>
      </div>

      {/* Static description below the image */}
      <div className="p-4 text-center text-[#006D5B] text-lg font-semibold">
        {item.description}
      </div>
    </div>
  );
};

export default Media;
