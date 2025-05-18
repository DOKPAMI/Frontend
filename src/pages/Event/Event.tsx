import { useState } from 'react';
import Slider from 'react-slick';

const Event = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(0);

  const characters = [
    { id: 1, name: '캐릭터 1', image: '/character1.png' },
    { id: 2, name: '캐릭터 2', image: '/character2.png' },
    { id: 3, name: '캐릭터 3', image: '/character3.png' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    beforeChange: (current: number, next: number) => setSelectedCharacter(next),
  };

  return (
    <div>
      <div className='bg-[url(/background.png)] bg-cover bg-center flex flex-col items-center w-screen max-w-[600px] h-screen overflow-hidden relative'>
        {/* 상단 텍스트 */}
        <div className='absolute top-[8vh] w-full flex justify-center'>
          <h1 className='text-2xl font-bold text-white'>독팜희 X 몬스터 에너지</h1>
        </div>

        {/* 캐릭터 카드 슬라이더 */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[400px]'>
          <Slider {...settings}>
            {characters.map((character) => (
              <div key={character.id} className='px-4'>
                <div className='bg-white rounded-lg shadow-lg p-4'>
                  <img
                    src={character.image}
                    alt={character.name}
                    className='w-full h-auto object-contain'
                  />
                  <h3 className='text-center mt-2 font-bold'>{character.name}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* 하단 버튼 */}
        <div className='absolute bottom-[8vh] w-full flex justify-center px-4'>
          <button className='w-full max-w-[320px] h-12 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-black overflow-hidden flex items-center justify-center'>
            <span className='text-black text-base sm:text-lg md:text-xl font-bold font-["Noto_Sans_KR"] leading-none translate-y-[1px] whitespace-nowrap px-2'>
              지갑 연결하고 NFT 받기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;
