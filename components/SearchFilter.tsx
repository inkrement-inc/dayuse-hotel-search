'use client';

import { useState, useEffect } from 'react';
import { HotelData } from '@/app/page';
import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchFilterProps {
  hotels: HotelData[];
  onFilterChange: (filtered: HotelData[]) => void;
}

export default function SearchFilter({ hotels, onFilterChange }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('すべて');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [minRating, setMinRating] = useState(0);

  const areas = ['すべて', ...Array.from(new Set(hotels.map(h => h.area)))];

  useEffect(() => {
    const filtered = hotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesArea = selectedArea === 'すべて' || hotel.area === selectedArea;
      const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const matchesRating = hotel.rating >= minRating;
      
      return matchesSearch && matchesArea && matchesPrice && matchesRating;
    });
    
    onFilterChange(filtered);
  }, [searchQuery, selectedArea, priceRange, minRating, hotels, onFilterChange]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">絞り込み検索</h2>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          キーワード検索
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="ホテル名、エリア..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Area Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          エリア
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          {areas.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          料金範囲: ¥{priceRange[0].toLocaleString()} - ¥{priceRange[1].toLocaleString()}
        </label>
        <input
          type="range"
          min="0"
          max="20000"
          step="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>¥0</span>
          <span>¥20,000</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          評価
        </label>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">
                {rating === 0 ? 'すべて' : `${rating}以上`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          設備
        </label>
        <div className="space-y-2">
          {['Wi-Fi', 'デスク', 'バスタブ', 'テレビ'].map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="text-blue-600" />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setSearchQuery('');
          setSelectedArea('すべて');
          setPriceRange([0, 20000]);
          setMinRating(0);
        }}
        className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        フィルターをリセット
      </button>
    </div>
  );
}
