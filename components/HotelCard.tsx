import { HotelData } from '@/app/page';
import { MapPin, Star, Clock, Wifi, Bath, Tv, Coffee } from 'lucide-react';

interface HotelCardProps {
  hotel: HotelData;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const amenityIcons: { [key: string]: React.ReactNode } = {
    'Wi-Fi': <Wifi className="w-4 h-4" />,
    'バスタブ': <Bath className="w-4 h-4" />,
    'テレビ': <Tv className="w-4 h-4" />,
    'ラウンジ利用': <Coffee className="w-4 h-4" />,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="md:flex">
        {/* Image */}
        <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-br from-blue-200 to-cyan-200 flex items-center justify-center">
          <div className="text-8xl">🏨</div>
        </div>

        {/* Content */}
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{hotel.area}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-gray-800">{hotel.rating}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{hotel.description}</p>

          {/* Check-in/out Times */}
          <div className="flex gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>チェックイン: <strong>{hotel.checkInTime}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>チェックアウト: <strong>{hotel.checkOutTime}</strong></span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {amenityIcons[amenity] || <span>•</span>}
                <span>{amenity}</span>
              </div>
            ))}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <div className="text-sm text-gray-600">1室あたり</div>
              <div className="text-3xl font-bold text-blue-600">¥{hotel.price.toLocaleString()}</div>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              予約する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
