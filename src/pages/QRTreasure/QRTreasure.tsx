import { useState, useEffect } from 'react';
import KakaoMap from './_KakaoMap';
import QRHeader from './_QRHeader';
import { LocationData, QRLocations } from '@/data/QRMapData';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function QRTreasure() {
  const [locations, setLocations] = useState<(LocationData & { checked: boolean })[]>(
    QRLocations.map((loc) => ({ ...loc, checked: false })),
  );

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [, setFoundCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // const totalMarkers = locations.length - 1; // "전체 보기" 제외

  // 로컬 스토리지에서 발견한 마커 정보 로딩
  useEffect(() => {
    const loadFoundMarkers = () => {
      try {
        const foundMarkersData = localStorage.getItem('qrFoundMarkers') || '[]';
        const foundList = JSON.parse(foundMarkersData) as string[];

        // 발견한 마커 표시
        const updatedLocations = locations.map((location) => {
          if (location.id && location.hash) {
            const markerKey = `${location.id}_${location.hash}`;
            return {
              ...location,
              checked: foundList.includes(markerKey),
            };
          }
          return location;
        });

        setLocations(updatedLocations);

        // 발견한 마커 수 계산
        const foundCount = foundList.length;
        setFoundCount(foundCount);
      } catch (error) {
        console.error('마커 정보 로딩 오류:', error);
      }
    };

    loadFoundMarkers();
  }, []);

  // 마커 클릭 시 해당 장소 정보 표시
  const handleMarkerClick = (title: string) => {
    const location = locations.find((loc) => loc.title === title);
    if (location) {
      setSelectedLocation(location);
    }
  };

  return (
    <div className='flex flex-col max-w-4xl mx-auto '>
      {/* 공통 헤더 - 뒤로가기 버튼 활성화 */}
      <QRHeader showBackButton={true} backTo='/qrtreasure' />

      <div className='pt-12'>
        <div className='mb-4'>
          <div className='flex flex-wrap gap-2'>
            {locations.map((location, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded flex items-center font-semibold cursor-pointer ${
                  selectedLocation.title === location.title ? 'bg-blue-500 text-white' : 'bg-white'
                } ${location.checked ? 'border-2 border-red-500' : ''}`}
                onClick={() => setSelectedLocation(location)}
              >
                {location.title}
                {location.checked && <span className='ml-2 text-red-500'>✓</span>}
              </button>
            ))}
          </div>
        </div>

        <div className='rounded-lg overflow-hidden border border-gray-300'>
          <KakaoMap
            width='100%'
            height='350px'
            latitude={selectedLocation.lat}
            longitude={selectedLocation.lng}
            level={3}
            locations={locations}
            showAll={selectedLocation.title === '전체 보기'}
            onMarkerClick={handleMarkerClick}
          />
        </div>

        <div className='mt-4 flex rounded-lg'>
          <img src='/profile.png' alt='profile' className='w-1/5 h-fit' />
          <div className='w-full bg-white ml-3 p-2 rounded-xl'>
            {selectedLocation.title !== '전체 보기' ? (
              <>
                <p className='text-xl font-bold mb-2'>{selectedLocation.title}</p>
                <p className='mb-3'>{selectedLocation.description || '설명이 없습니다.'}</p>
              </>
            ) : (
              <p>지도에서 위치를 선택하거나 마커를 클릭하면 해당 장소의 정보가 표시됩니다.</p>
            )}
          </div>
        </div>

        <div className='mt-4 border-2 p-4 rounded-xl w-full bg-[#FFFDF2]'>
          <button
            className='w-full cursor-pointer flex justify-between text-[18px] '
            onClick={() => setIsOpen(!isOpen)}
          >
            <h3 className='font-bold'>이벤트 참여 방법 알아보기</h3>
            {isOpen ? (
              <HiOutlineChevronUp className='my-auto text-center' />
            ) : (
              <HiOutlineChevronDown className='my-auto text-center' />
            )}
          </button>
          {isOpen ? (
            <>
              <br />
              <div className='text-[16px] text-[#191F28] font-regular'>
                <p className='text-[18px] font-bold underline'>이벤트 참여 방법</p>
                <p>1. 📍 지도에서 위치 마크 보고 QR코드 찾기</p>
                <p>2. 📸 카메라로 QR코드 스캔하기</p>
                <p>3. 📲 공유하기 버튼을 통해 인스타에 공유하고 @dokpami.nft 태그하기</p>
                <p>4. 🔍 다음 QR코드를 찾아 더 나은 선물 받기</p>
              </div>
              <br />
              <div className='text-[16px] text-[#191F28] font-regula'>
                <p className='text-[18px] font-bold underline'>상품 안내</p>
                <p>· 6개 QR코드 중 1개 이상 스캔 시 🥛바나나우유 10명 (추첨)</p>
                <p>· 6개 QR코드 중 3개 이상 스캔 시 ☕스타벅스 커피 3명 (추첨)</p>
                <p>· 6개 QR코드 모두 스캔 시 🏆1명에게 스탠리 텀블러 지급 (추첨)</p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
