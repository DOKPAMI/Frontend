import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { characters } from './characters';
import {
  useConnectWallet,
  useWallets,
  useCurrentAccount,
  useDisconnectWallet,
} from '@mysten/dapp-kit';
// import { ZkSendLink } from '@mysten/zksend';
// import { claimAssets } from '@/lib/zksend';
// import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
// import { useBuyProduct } from '@/hooks/useBuyProduct';
import { toast } from 'sonner';
const Event = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');
  const [isNFTMinted, setIsNFTMinted] = useState(false);
  // const [isClaimed, setIsClaimed] = useState(false);

  const wallets = useWallets();
  const account = useCurrentAccount();

  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  // const { buyEventProduct } = useBuyProduct();

  // useEffect(() => {
  //   if (localStorage.getItem('isClaimed')) {
  //     setIsClaimed(true);
  //   }
  // }, [isClaimed]);

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

  const downloadImage = () => {
    const selectedChar = characters[selectedCharacter];
    const link = document.createElement('a');
    link.href = selectedChar.image;
    link.download = `팜희_${selectedChar.type}_NFT.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDescriptionText = () => {
    if (language === 'en') {
      if (account && !isNFTMinted) {
        return 'Choose your favorite Pamhee NFT\nand get a free Monster Energy!';
      } else if (account && isNFTMinted) {
        return 'Congratulations — your Pamhee NFT has been successfully minted!\nIt’s now live on the Sui blockchain.\nView it in your Slush Wallet or on the Dokpamhee page.';
      }
    } else {
      if (account && !isNFTMinted) {
        return '원하는 타입의 팜희 NFT를 발급받으면\n 몬스터 에너지를 받을 수 있어요.';
      } else if (account && isNFTMinted) {
        return 'NFT 발급이 완료되었어요!\n발급한 NFT는 수이 블록체인에 기록되어 있어요. Slush Wallet이나 독팜희 페이지에서 NFT를 확인할 수 있어요.';
      }
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
          .detail-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .detail-content {
            background: white;
            padding: 20px;
            border-radius: 20px;
            max-width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
          }
        `}
      </style>
      <div className='bg-[url(/background.png)] bg-cover bg-center flex flex-col items-center w-screen max-w-[600px] h-screen overflow-hidden relative event-container'>
        {/* 상단 텍스트 */}
        <div className='absolute top-[4vh] sm:top-[1vh] md:top-[1vh] w-full flex justify-center px-4'>
          <div className='relative bg-amber-200 rounded-[73px] overflow-hidden flex items-center justify-center px-6 py-2'>
            <span className='text-black text-base sm:text-lg md:text-xl font-bold font-["Jua"] leading-none translate-y-[1px] whitespace-nowrap'>
              {language === 'en' ? 'Dokpamhee X Monster Energy' : '독팜희 X 몬스터 에너지'}
            </span>
          </div>
        </div>

        {/* 언어 전환 버튼 */}
        <div className='absolute top-[4vh] right-4'>
          <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className='bg-white rounded-full px-3 py-1 text-sm font-["Jua"] shadow-md'
          >
            {language === 'ko' ? 'EN' : '한글'}
          </button>
        </div>

        {/* 캐릭터 카드 슬라이더 */}
        <div className='absolute top-[12vh] xs:top-[15vh] sm:top-[15vh] md:top-[13vh] left-1/2 transform -translate-x-1/2 w-[85%] sm:w-[90%] max-w-[400px] sm:max-w-[450px] h-[45vh] xs:h-[40vh]'>
          <Slider {...settings}>
            {characters.map((character) => (
              <div key={character.id} className='px-2 xs:px-3 sm:px-4 h-full'>
                <div className='bg-white rounded-lg shadow-lg p-2 xs:p-2 sm:p-3 md:p-4 h-full flex flex-col'>
                  <div className='flex-grow flex flex-col justify-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 py-1 xs:py-2 sm:py-3 md:py-4'>
                    <img
                      src={character.image}
                      alt={`${character.type} 캐릭터`}
                      className='w-[75%] xs:w-[80%] h-auto object-contain character-image mx-auto'
                      onClick={() => window.open(character.image, '_blank')}
                    />
                    <img
                      src={character.nameImage}
                      alt={`${character.type} 이름`}
                      className='w-[45%] xs:w-[50%] h-auto object-contain mx-auto'
                    />
                    <p className='text-center text-xs xs:text-sm font-["Jua"] text-gray-700'>
                      {character.tagline}
                    </p>
                    <button
                      onClick={() => setShowDetail(true)}
                      className='text-xs xs:text-sm text-blue-500 font-["Jua"] hover:text-blue-700 mt-1'
                    >
                      상세보기
                    </button>
                  </div>
                  <div className='mt-1 xs:mt-2 sm:mt-3 md:mt-4 p-1 xs:p-2 bg-gray-50 rounded-lg'>
                    <p className='text-xs xs:text-sm sm:text-base md:text-lg text-center font-["Jua"] text-gray-700 whitespace-pre-line'>
                      {getDescriptionText()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* 하단 버튼 */}

        <div className='absolute bottom-[20vh] xs:bottom-[10vh] sm:bottom-[4vh] md:bottom-[3vh] w-full flex justify-center px-4'>
          {!account && (
            <button
              onClick={() => {
                const wallet = wallets.find((w) => w.name.includes('Slush'))
                  ? wallets.find((w) => w.name.includes('Slush'))
                  : wallets[0];
                // setIsClaiming(true);
                if (wallet) {
                  connect({ wallet });
                }
              }}
              className='w-full max-w-[320px] h-10 xs:h-12 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-black overflow-hidden flex items-center justify-center
             disabled:cursor-not-allowed cursor-pointer disabled:bg-gray-300'
            >
              <span className='text-sm xs:text-base sm:text-lg md:text-xl font-bold font-["Jua"] leading-none translate-y-[1px] whitespace-nowrap px-2'>
                {language === 'en' ? 'Login with Google' : '구글 로그인하기'}
              </span>
            </button>
          )}
          {account && (
            <button
              onClick={() => {
                const wallet = wallets.find((w) => w.name.includes('Slush'))
                  ? wallets.find((w) => w.name.includes('Slush'))
                  : wallets[0];

                if (wallet) {
                  disconnect();
                }
              }}
              className='w-full max-w-[320px] h-10 xs:h-12 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-black overflow-hidden flex items-center justify-center
             disabled:cursor-not-allowed cursor-pointer disabled:bg-gray-300'
            >
              <span className='text-sm xs:text-base sm:text-lg md:text-xl font-bold font-["Jua"] leading-none translate-y-[1px] whitespace-nowrap px-2'>
                {language === 'en' ? 'Logout' : '로그아웃 하기'}
              </span>
            </button>
          )}
          {/* {account && !localStorage.getItem('isClaimed') && (
            <button
              onClick={async () => {
                toast.dismiss();
                toast.loading('Processing... Please Wait..');

                const claimLink = await fetch(
                  `${import.meta.env.VITE_BACKEND_URL}/zk/zk-send/mintPami`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      recipient: account?.address || '',
                    }),
                  },
                );
                const claimLinkData = await claimLink.json();

                toast.dismiss();
                toast.loading(`Getting claim link data...`);

                const link = await ZkSendLink.fromUrl(claimLinkData);
                const tx = link.createClaimTransaction(account?.address!);
                await claimAssets(tx, account?.address!, link.keypair as Ed25519Keypair);

                localStorage.setItem('isClaimed', 'true');
                setIsClaimed(true);

                toast.dismiss();
                toast.success('Claim Successful');
              }}
              className='cursor-pointer w-full max-w-[320px] h-10 xs:h-12 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-black overflow-hidden flex items-center justify-center
             disabled:cursor-not-allowed disabled:bg-gray-300'
            >
              <span className='text-sm xs:text-base sm:text-lg md:text-xl font-bold font-["Jua"] leading-none translate-y-[1px] whitespace-nowrap px-2'>
                {language === 'en' ? 'Claim Testnet SUI' : 'Testnet SUI 받기'}
              </span>
            </button>
          )} */}

          {account && !isNFTMinted && (
            <button
              onClick={() => {
                // buyEventProduct({
                //   storeId: characters[selectedCharacter].storeId,
                //   slotNumber: characters[selectedCharacter].slotNumber,
                //   setStatus: () => setIsNFTMinted(true),
                // });
                toast.dismiss();
                toast.loading('Loading...');
                setTimeout(() => {
                  toast.dismiss();
                  toast.success('Mint Successful');
                  setIsNFTMinted(true);
                }, 1000);
              }}
              className='cursor-pointer w-full max-w-[320px] h-10 xs:h-12 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-black overflow-hidden flex items-center justify-center
             disabled:cursor-not-allowed disabled:bg-gray-300'
            >
              <span className='text-sm xs:text-base sm:text-lg md:text-xl font-bold font-["Jua"] leading-none translate-y-[1px] whitespace-nowrap px-2'>
                {language === 'en' ? 'Get NFT' : 'NFT 발급하기'}
              </span>
            </button>
          )}

          {account && isNFTMinted && (
            <button
              onClick={() => {
                downloadImage();

                setIsNFTMinted(false);
              }}
              className='cursor-pointer w-full max-w-[320px] h-10 xs:h-12 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-black overflow-hidden flex items-center justify-center
             disabled:cursor-not-allowed disabled:bg-gray-300'
            >
              <span className='text-sm xs:text-base sm:text-lg md:text-xl font-bold font-["Jua"] leading-none translate-y-[1px] whitespace-nowrap px-2'>
                {language === 'en' ? 'Download Image' : '이미지 다운받기'}
              </span>
            </button>
          )}
        </div>

        {/* 상세보기 모달 */}
        {showDetail && (
          <div className='detail-modal' onClick={() => setShowDetail(false)}>
            <div className='detail-content' onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowDetail(false)}
                className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
              >
                ✕
              </button>
              <div className='mt-4'>
                <h2 className='text-xl font-bold font-["Jua"] mb-4'>
                  {characters[selectedCharacter].type}
                </h2>
                <p className='text-base font-["Jua"] whitespace-pre-line'>
                  {characters[selectedCharacter].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
