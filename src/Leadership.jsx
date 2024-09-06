import React, { useState, useEffect } from 'react';
import image from './images/test1.jpg'; 
import image1 from './images/test.jpg';

const Leadership = () => {
  const [leaders, setLeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = window.innerWidth >= 768 ? 3 : 1; // Adjust number of items per page
  const totalPages = Math.ceil(leaders.length / itemsPerPage);

  useEffect(() => {
    const fetchLeaders = async () => {
      const data = [
        { id: 1, image: image, name: "John Doe", role: "Founder and CEO" },
        { id: 2, image: image, name: "Jane Doe", role: "Co-Founder and Strategic Partnerships Director" },
        { id: 3, image: image, name: "Kanda Bondoman", role: "Co-Founder and Organizing Director" },
        { id: 4, image: image, name: "John Doe", role: "Founder and CEO" },
        { id: 5, image: image, name: "Jane Doe", role: "Co-Founder and Strategic Partnerships Director" },
        { id: 6, image: image, name: "Kanda Bondoman", role: "Co-Founder and Organizing Director" },
      ];
      setLeaders(data);
    };

    fetchLeaders();
  }, []);

  const currentLeaders = leaders.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="bg-white p-6">
      <h2 className="text-4xl flex justify-center font-bold text-[#006D5B] mb-8">
        Meet Our Team
      </h2>
      <div className="relative w-full max-w-screen-lg mx-auto gap-6"> 
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
            {currentLeaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex-col transform hover:scale-105 transition-transform duration-300"
              >
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="object-cover w-full h-full" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#006D5B]">{leader.name}</h3>
                  <p className="text-md font-medium text-black">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
    </div>
  );
};

export default Leadership;
