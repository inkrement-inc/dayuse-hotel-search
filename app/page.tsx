'use client';

import { useState } from 'react';
import HotelCard from '@/components/HotelCard';
import SearchFilter from '@/components/SearchFilter';
import MapView from '@/components/MapView';
import { Hotel, MapPin, Clock, DollarSign } from 'lucide-react';

export interface HotelData {
  id: string;
  name: string;
  description: string;
  area: string;
  price: number;
  rating: number;
  amenities: string[];
  image: string;
  checkInTime: string;
  checkOutTime: string;
  coordinates: { lat: number; lng: number };
}

const sampleHotels: HotelData[] = [
  {
    id: '1',
    name: 'ホテルメトロポリタン東京',
    description: 'JR池袋駅直結の好立地。日帰りでも快適に過ごせる上質な空間',
    area: '東京・池袋',
    price: 8000,
    rating: 4.5,
    amenities: ['Wi-Fi', 'デスク', 'バスタブ', 'テレビ'],
    image: '/placeholder.jpg',
    checkInTime: '10:00',
    checkOutTime: '18:00',
    coordinates: { lat: 35.7295, lng: 139.7109 }
  },
  {
    id: '2',
    name: '東急ステイ渋谷',
    description: '渋谷駅徒歩5分。リモートワークにも最適なデイユースプラン',
    area: '東京・渋谷',
    price: 6500,
    rating: 4.3,
    amenities: ['Wi-Fi', 'デスク', 'シャワー', '冷蔵庫'],
    image: '/placeholder.jpg',
    checkInTime: '09:00',
    checkOutTime: '17:00',
    coordinates: { lat: 35.6595, lng: 139.7004 }
  },
  {
    id: '3',
    name: 'ヒルトン東京ベイ',
    description: '舞浜エリアのリゾートホテル。ゆったりとした時間を過ごせる',
    area: '千葉・舞浜',
    price: 12000,
    rating: 4.7,
    amenities: ['Wi-Fi', 'デスク', 'バスタブ', 'ミニバー', 'テレビ'],
    image: '/placeholder.jpg',
    checkInTime: '11:00',
    checkOutTime: '19:00',
    coordinates: { lat: 35.6342, lng: 139.8835 }
  },
  {
    id: '4',
    name: 'アパホテル新宿歌舞伎町',
    description: '新宿駅近くのビジネスホテル。コスパ抜群のデイユース',
    area: '東京・新宿',
    price: 4500,
    rating: 4.0,
    amenities: ['Wi-Fi', 'デスク', 'シャワー'],
    image: '/placeholder.jpg',
    checkInTime: '10:00',
    checkOutTime: '16:00',
    coordinates: { lat: 35.6938, lng: 139.7036 }
  },
  {
    id: '5',
    name: 'パークハイアット東京',
    description: '新宿の最上階で優雅なひととき。贅沢なデイユース体験',
    area: '東京・新宿',
    price: 18000,
    rating: 4.9,
    amenities: ['Wi-Fi', 'デスク', 'バスタブ', 'ミニバー', 'テレビ', 'ラウンジ利用'],
    image: '/placeholder.jpg',
    checkInTime: '12:00',
    checkOutTime: '20:00',
    coordinates: { lat: 35.6856, lng: 139.6917 }
  },
  {
    id: '6',
    name: 'コンフォートホテル横浜',
    description: '横浜駅徒歩圏内。ビジネスにも観光にも便利',
    area: '神奈川・横浜',
    price: 5500,
    rating: 4.2,
    amenities: ['Wi-Fi', 'デスク', 'シャワー', 'テレビ'],
    image: '/placeholder.jpg',
    checkInTime: '09:00',
    checkOutTime: '18:00',
    coordinates: { lat: 35.4657, lng: 139.6220 }
  }
];

export default function Home() {
  const [hotels, setHotels] = useState<HotelData[]>(sampleHotels);
  const [filteredHotels, setFilteredHotels] = useState<HotelData[]>(sampleHotels);
  const [showMap, setShowMap] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Hotel className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-blue-900">デイユースホテル検索</h1>
          </div>
          <p className="text-gray-600">日帰りで利用できるホテルを簡単検索</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">日帰りホテルをもっと便利に</h2>
          <p className="text-xl mb-2">テレワーク、休憩、リフレッシュに最適な空間を見つけよう</p>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Hotel className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800">{hotels.length}</div>
            <p className="text-gray-600">掲載ホテル</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <MapPin className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800">15</div>
            <p className="text-gray-600">対応エリア</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Clock className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800">24h</div>
            <p className="text-gray-600">即時予約</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <DollarSign className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800">¥4,500~</div>
            <p className="text-gray-600">最安料金</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Search Filter Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilter hotels={hotels} onFilterChange={setFilteredHotels} />
          </div>

          {/* Hotels List */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  検索結果 <span className="text-blue-600">({filteredHotels.length}件)</span>
                </h2>
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  {showMap ? 'リスト表示' : '地図表示'}
                </button>
              </div>
            </div>

            {showMap ? (
              <MapView hotels={filteredHotels} />
            ) : (
              <div className="space-y-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
                {filteredHotels.length === 0 && (
                  <div className="bg-white p-12 rounded-lg shadow-md text-center text-gray-600">
                    <p>該当するホテルが見つかりませんでした</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white mt-16 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3">About</h3>
              <p className="text-sm text-gray-600">
                デイユースホテル検索は、日帰り利用可能なホテルを簡単に見つけられるサービスです。
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">エリア</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>東京都</li>
                <li>神奈川県</li>
                <li>千葉県</li>
                <li>埼玉県</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">用途</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>テレワーク</li>
                <li>休憩・仮眠</li>
                <li>待ち合わせ</li>
                <li>リフレッシュ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">サポート</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>よくある質問</li>
                <li>お問い合わせ</li>
                <li>利用規約</li>
                <li>プライバシーポリシー</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-600 text-sm pt-6 border-t">
            <p>&copy; 2024 デイユースホテル検索. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
