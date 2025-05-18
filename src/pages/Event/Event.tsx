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
        return 'NFT 발급이 완료되었어요!\n발급한 NFT는 수이 블록체인에 기록되어 있어요. Slush Wallet이나 다음 주 오픈할 독팜희 페이지에서 팜희 NFT를 확인할 수 있으니 기대해주세요.';
    }
  };

  return (
    <div>
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
        `}
      </style>
      <div className='bg-[url(/background.png)] bg-cover bg-center flex flex-col items-center w-screen max-w-[600px] h-screen overflow-hidden relative'>
        {/* 상단 텍스트 */}
        <div className='absolute top-[5vh] sm:top-[4vh] md:top-[3vh] w-full flex justify-center px-4'>
          <div className='h-12 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] overflow-hidden flex items-center justify-center px-6'>
            <span className='text-black text-base sm:text-lg md:text-xl font-bold font-["Jua"] leading-none translate-y-[1px] whitespace-nowrap'>
              독팜희 X 몬스터 에너지
            </span>
          </div>
        </div>

        {/* 캐릭터 카드 슬라이더 */}
        <div className='absolute top-[15vh] xs:top-[18vh] sm:top-[18vh] md:top-[16vh] left-1/2 transform -translate-x-1/2 w-[85%] sm:w-[90%] max-w-[400px] sm:max-w-[450px] h-[65vh] xs:h-[60vh]'>
          <Slider {...settings}>
            {characters.map((character) => (
              <div key={character.id} className='px-2 xs:px-4 sm:px-6 h-full'>
                <div className='bg-white rounded-lg shadow-lg p-2 xs:p-3 sm:p-4 md:p-6 h-full flex flex-col'>
                  <div className='flex-grow flex flex-col justify-center gap-4 xs:gap-6 sm:gap-8 md:gap-10 py-4 xs:py-6 sm:py-8 md:py-10'>
                    <img
                      src={character.image}
                      alt={`${character.type} 캐릭터`}
                      className='w-full h-auto object-contain character-image'
                      onClick={() => window.open(character.image, '_blank')}
                    />
                    <img
                      src={character.nameImage}
                      alt={`${character.type} 이름`}
                      className='w-[70%] xs:w-[60%] h-auto object-contain mx-auto'
                    />
                  </div>
                  <div className='mt-2 xs:mt-4 sm:mt-6 md:mt-8 p-2 sm:p-3 bg-gray-50 rounded-lg'>
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
        <div className='absolute bottom-[5vh] sm:bottom-[4vh] md:bottom-[3vh] w-full flex justify-center px-4'>
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
