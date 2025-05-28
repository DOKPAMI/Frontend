import { BalanceGameResults } from '@/data/BalanceGameResult';
import { useEffect, useState, useRef } from 'react';
import { getTotalTypeCount, getTypePercentage, mintNFT, sendGameResult } from './api';
import { Link, useParams } from 'react-router-dom';
import { useDisconnectWallet, useWallets } from '@mysten/dapp-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useConnectWallet } from '@mysten/dapp-kit';
import { toast } from 'sonner';

export default function ResultPage() {
  const { id } = useParams();
  const [totalTypeCount, setTotalTypeCount] = useState(0);
  const [typePercentage, setTypePercentage] = useState('');
  const resultPageRef = useRef<HTMLDivElement | null>(null);
  // const [showDetail, setShowDetail] = useState(false);
  const wallets = useWallets();
  const account = useCurrentAccount();
  const [loading, setLoading] = useState(false);

  const { mutate: connect, isSuccess: isConnected } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();

  const resultInfo = BalanceGameResults[id as keyof typeof BalanceGameResults];

  if (!resultInfo) return <div>결과를 찾을 수 없습니다.</div>;

  useEffect(() => {
    const getResultData = async ({ finalResult }: { finalResult: string }) => {
      const { totalTypeCount } = await getTotalTypeCount();
      const { typePercentage } = await getTypePercentage({ finalResult });

      setTotalTypeCount(totalTypeCount);
      setTypePercentage(typePercentage);
    };
    getResultData({ finalResult: id as string });
  }, [id]);

  useEffect(() => {
    if (isConnected) {
      setLoading(false);
      toast.loading('구글 로그인 성공! NFT 발급 중입니다...');
      sendGameResult({ user: account?.address || 'unregistered', resultType: id as string });
      mintNFT({ user: account?.address || '', name: id });
      setTimeout(() => {
        toast.dismiss();
        toast.success('NFT 발급 완료!');
      }, 2000);
    }
  }, [isConnected]);

  return (
    <div className='bg-[url(/background.png)] bg-cover bg-center w-full min-h-screen flex flex-col items-center justify-center  py-8'>
      <div className='absolute top-[4vh] sm:top-[1vh] md:top-[1vh] w-full flex justify-center px-4'>
        <div className='relative bg-amber-200 rounded-[73px] overflow-hidden flex items-center justify-center px-6 py-2'>
          <Link
            to='/'
            className='text-black text-base sm:text-lg md:text-xl font-bold font-["Jua"] leading-none translate-y-[1px] whitespace-nowrap'
          >
            독팜희 밸런스게임
          </Link>
        </div>
      </div>
      <div
        id='result-page'
        ref={resultPageRef}
        className='w-3/4 flex flex-col items-center bg-white p-4 rounded-lg overflow-y-auto max-h-[90vh] mt-[5vh]'
      >
        <h1 className=' text-xl'>나의 캐릭터는</h1>
        <p className='text-2xl text-blue-500 font-bold'>{resultInfo.title}</p>
        <img
          src={resultInfo.imageURL}
          id='result-img'
          className='w-full max-w-[320px] max-h-[320px] object-contain mb-4'
        />
        <div className='flex flex-wrap gap-2 my-4'>
          {resultInfo.keywords.map((keyword) => (
            <span key={keyword} className='text-sm bg-blue-300 rounded-full px-2 py-1 text-black '>
              {keyword}
            </span>
          ))}
        </div>
        <div className='text-md my-2'>{resultInfo.subtitle}</div>
        {/* <button
          onClick={() => setShowDetail((prev) => !prev)}
          className='text-sm text-blue-500 font-["Jua"] hover:text-blue-700 '
        >
          상세보기
        </button> */}
        <div className='text-sm mb-2'>
          전체 {totalTypeCount}개의 결과 중 {typePercentage}%가 이 유형이에요!
        </div>
        {/* {showDetail && (
          <div className='detail-modal' onClick={() => setShowDetail(false)}>
            <div className='detail-content' onClick={(e) => e.stopPropagation()}>
              <div className='mb-10 whitespace-pre-line text-sm'>{resultInfo.content}</div>
            </div>
          </div>
        )} */}
        {!account && (
          <button
            onClick={() => {
              setLoading(true);
              const wallet = wallets.find((w) => w.name.includes('Slush'))
                ? wallets.find((w) => w.name.includes('Slush'))
                : wallets[0];
              // setIsClaiming(true);
              if (wallet) {
                connect({ wallet });
              } else {
                window.alert('구글 로그인 실패. 관리자에게 문의해주세요!');
              }
            }}
            className='w-full max-w-[320px] h-10 xs:h-12 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-black overflow-hidden flex items-center justify-center
             disabled:cursor-not-allowed cursor-pointer disabled:bg-gray-300'
            disabled={loading}
          >
            <span className='text-sm xs:text-base sm:text-lg md:text-xl font-bold font-["Jua"] leading-none translate-y-[1px] whitespace-nowrap px-2'>
              구글 로그인하고 NFT 받기
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
              로그아웃 하기
            </span>
          </button>
        )}
        <img src='/logo.png' alt='logo' className='w-[100px] my-4' />
      </div>
      {/* {imgLoaded && <BalanceGameResultCapture resultPageRef={resultPageRef} />} */}
    </div>
  );
}
