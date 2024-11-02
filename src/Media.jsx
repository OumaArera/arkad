import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';  // Library to handle swipe gestures

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
      <br />
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
    trackMouse: true,  // Allow dragging on desktop
  });

  return (
    <div
      {...handlers}
      className="bg-white shadow-lg rounded-lg overflow-hidden relative"
      style={{ width: '100%', height: '300px' }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={item.media[imageIndex]}
          alt={`Media ${item.id}`}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 w-full px-4 py-3 text-center text-white text-lg bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="inline-flex items-center justify-center text-[#FFD700] animate-pulse">
            <span className="material-icons text-lg mr-2">balloon</span>
            {item.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
