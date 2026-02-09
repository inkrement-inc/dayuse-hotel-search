import { HotelData } from '@/app/page';
import { MapPin, Star } from 'lucide-react';

interface MapViewProps {
  hotels: HotelData[];
}

export default function MapView({ hotels }: MapViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Map Placeholder */}
      <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg overflow-hidden mb-6" style={{ height: '500px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">地図表示エリア</p>
            <p className="text-sm text-gray-500 mt-2">
              ※ 実装時にGoogle Maps APIまたはMapbox等を統合
            </p>
          </div>
        </div>

        {/* Map Markers Simulation */}
        {hotels.slice(0, 3).map((hotel, index) => (
          <div
            key={hotel.id}
            className="absolute bg-white rounded-lg shadow-lg p-3 cursor-pointer hover:shadow-xl transition"
            style={{
              left: `${20 + index * 25}%`,
              top: `${30 + index * 15}%`,
              maxWidth: '200px'
            }}
          >
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-gray-800 mb-1">{hotel.name}</h4>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-gray-600">{hotel.rating}</span>
                </div>
                <p className="text-xs text-blue-600 font-semibold">¥{hotel.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hotel List */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-800 mb-3">地図上のホテル一覧</h3>
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg flex items-center justify-center text-2xl">
              🏨
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{hotel.name}</h4>
              <p className="text-sm text-gray-600">{hotel.area}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-gray-800">{hotel.rating}</span>
              </div>
              <p className="text-lg font-bold text-blue-600">¥{hotel.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
