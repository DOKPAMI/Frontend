import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Event = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [status, setStatus] = useState<'default' | 'loggedIn' | 'downloaded'>('default');

  const characters = [
    {
      id: 1,
      image: '/characters/images/char1.png',
      nameImage: '/characters/names/name1.svg',
      type: '연애',
    },
    {
      id: 2,
      image: '/characters/images/char2.png',
      nameImage: '/characters/names/name2.svg',
      type: '집순',
    },
    {
      id: 3,
      image: '/characters/images/char3.png',
      nameImage: '/characters/names/name3.svg',
      type: '갓생',
    },
    {
      id: 4,
      image: '/characters/images/char4.png',
      nameImage: '/characters/names/name4.svg',
      type: '리더',
    },
    {
      id: 5,
      image: '/characters/images/char5.png',
      nameImage: '/characters/names/name5.svg',
      type: '욜로',
    },
    {
      id: 6,
      image: '/characters/images/char6.png',
      nameImage: '/characters/names/name6.svg',
      type: 'N잡',
    },
    {
      id: 7,
      image: '/characters/images/char7.png',
      nameImage: '/characters/names/name7.svg',
      type: '인싸',
    },
    {
      id: 8,
      image: '/characters/images/char8.png',
      nameImage: '/characters/names/name8.svg',
      type: '열공',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    beforeChange: (_: number, next: number) => setSelectedCharacter(next),
  };

  const handleButtonClick = () => {
    if (status === 'default') {
      setStatus('loggedIn');
    } else if (status === 'loggedIn') {
      setStatus('downloaded');
    } else if (status === 'downloaded') {
      downloadImage();
    }
  };

  const downloadImage = () => {
    const selectedChar = characters[selectedCharacter];
    const link = document.createElement('a');
    link.href = selectedChar.image;
    link.download = `팜희_${selectedChar.type}_NFT.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getButtonText = () => {
    switch (status) {
      case 'default':
        return '지갑 연결하고 NFT 받기';
      case 'loggedIn':
        return 'NFT 발급하기';
      case 'downloaded':
        return '이미지 다운받기';
    }
  };

  const getDescriptionText = () => {
    switch (status) {
      case 'default':
      case 'loggedIn':
        return '원하는 타입의 팜희 NFT를 발급받으면\n 몬스터 에너지를 받을 수 있어요.';
      case 'downloaded':
        return 'NFT 발급이 완료되었어요!\n발급한 NFT는 수이 블록체인에 기록되어 있어요. Slush Wallet이나 독팜희 페이지에서 팜희 NFT를 확인할 수 있어요.';
    }
  };

  return (
    <div className='overflow-hidden overscroll-none touch-none'>
      <style>
        {`
          .slick-prev {
            left: -15px !important;
          }
          .slick-next {
            right: -15px !important;
          }
          .slick-prev, .slick-next {
            z-index: 1;
          }
          .character-image {
            -webkit-user-select: none;
            user-select: none;
            -webkit-touch-callout: default;
          }
          .event-container {
            overscroll-behavior: none;
            touch-action: none;
            -webkit-overflow-scrolling: none;
            overflow: hidden;
          }
        `}
      </style>
      <div className='bg-[url(/background.png)] bg-cover bg-center flex flex-col items-center w-screen max-w-[600px] h-screen overflow-hidden relative event-container'>
        {/* 상단 텍스트 */}
        <div className='absolute top-[4vh] sm:top-[1vh] md:top-[1vh] w-full flex justify-center px-4'>
          <div className='relative bg-amber-200 rounded-[73px] overflow-hidden flex items-center justify-center px-6 py-2'>
            <span className='text-black text-base sm:text-lg md:text-xl font-bold font-["Jua"] leading-none translate-y-[1px] whitespace-nowrap'>
              독팜희 X 몬스터 에너지
            </span>
          </div>
        </div>

        {/* 캐릭터 카드 슬라이더 */}
        <div className='absolute top-[12vh] xs:top-[15vh] sm:top-[15vh] md:top-[13vh] left-1/2 transform -translate-x-1/2 w-[75%] sm:w-[80%] max-w-[350px] sm:max-w-[400px] h-[55vh] xs:h-[50vh]'>
          <Slider {...settings}>
            {characters.map((character) => (
              <div key={character.id} className='px-2 xs:px-3 sm:px-4 h-full'>
                <div className='bg-white rounded-lg shadow-lg p-2 xs:p-2 sm:p-3 md:p-4 h-full flex flex-col'>
                  <div className='flex-grow flex flex-col justify-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 py-3 xs:py-4 sm:py-5 md:py-6'>
                    <img
                      src={character.image}
                      alt={`${character.type} 캐릭터`}
                      className='w-[90%] h-auto object-contain character-image mx-auto'
                      onClick={() => window.open(character.image, '_blank')}
                    />
                    <img
                      src={character.nameImage}
                      alt={`${character.type} 이름`}
                      className='w-[60%] xs:w-[50%] h-auto object-contain mx-auto'
                    />
                  </div>
                  <div className='mt-2 xs:mt-3 sm:mt-4 md:mt-5 p-2 sm:p-2 bg-gray-50 rounded-lg'>
                    <p className='text-sm xs:text-base sm:text-lg md:text-xl text-center font-["Jua"] text-gray-700 whitespace-pre-line'>
                      {getDescriptionText()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* 하단 버튼 */}
        <div className='absolute bottom-[20vh] sm:bottom-[4vh] md:bottom-[3vh] w-full flex justify-center px-4'>
          <button
            onClick={handleButtonClick}
            className='w-full max-w-[320px] h-12 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-black overflow-hidden flex items-center justify-center'
          >
            <span className='text-black text-base sm:text-lg md:text-xl font-bold font-["Jua"] leading-none translate-y-[1px] whitespace-nowrap px-2'>
              {getButtonText()}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;
