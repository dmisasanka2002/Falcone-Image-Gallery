import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import galleryData from './data.json';

const GalleryApp = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;

  // Dynamically generate categories from galleryData
  const categories = [
    { 
      id: 'all', 
      name: 'All', 
      count: Object.values(galleryData).flat().length 
    },
    ...Object.keys(galleryData).map(categoryKey => ({
      id: categoryKey,
      name: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
      count: galleryData[categoryKey].length
    }))
  ];

  const getFilteredImages = () => {
    if (selectedCategory === 'all') {
      return Object.values(galleryData).flat();
    }
    return galleryData[selectedCategory] || [];
  };

  const filteredImages = getFilteredImages();
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = filteredImages.slice(startIndex, endIndex);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const navigateImage = (direction) => {
    const allImages = filteredImages;
    const currentIndex = allImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % allImages.length;
    } else {
      newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    }
    
    setSelectedImage(allImages[newIndex]);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getHeightClass = (height) => {
    switch(height) {
      case 'short': return 'h-48 sm:h-56';
      case 'medium': return 'h-64 sm:h-80';
      case 'tall': return 'h-80 sm:h-96';
      default: return 'h-64 sm:h-80';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}
      </style>

      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
              Falcon Image Gallery
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Discover our journey through stunning visuals and memorable moments
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-3 justify-start sm:justify-center min-w-max sm:min-w-0 sm:flex-wrap">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap border-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-cyan-500/50'
                    : 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800/80 backdrop-blur-sm'
                }`}
              >
                {category.name}
                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id 
                    ? 'bg-white/20' 
                    : 'bg-gray-700'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Gallery Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {currentImages.map((image, index) => (
            <div
              key={image.id}
              className="break-inside-avoid animate-fade-in-up group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20"
              onClick={() => openModal(image)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`relative ${getHeightClass(image.height)} overflow-hidden bg-gray-800`}>
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-4">
                  <div className="transform transition-all duration-300 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mb-3 rounded-full"></div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transform transition-all duration-300">
                    {image.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed transform transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 line-clamp-3">
                    {image.description}
                  </p>
                </div>

                {/* Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                currentPage === 1
                  ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="flex gap-2 flex-wrap justify-center">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                    currentPage === index + 1
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 scale-110'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white border-2 border-gray-700 hover:border-cyan-500/50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                currentPage === totalPages
                  ? 'bg-gray-800/30 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105'
              }`}
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
              <div className="text-6xl">📷</div>
            </div>
            <p className="text-gray-400 text-xl">No images found in this category</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          onClick={closeModal}
        >
          <div
            className="relative max-w-6xl w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden border border-cyan-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:bg-cyan-500 transition-all duration-300 hover:rotate-90 border border-gray-700 hover:border-cyan-400"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:bg-cyan-500 transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-cyan-400"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:bg-cyan-500 transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-cyan-400"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image */}
            <div className="w-full bg-black">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="p-8 bg-gradient-to-t from-gray-900 to-gray-900/50">
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mb-4 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedImage.title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryApp;