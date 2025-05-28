import { BalanceGameResults } from '@/data/BalanceGameResult';
import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';

interface ResultPageProps {
  finalResult: string;
}

export default function ResultQR({ finalResult }: ResultPageProps) {
  const resultPageRef = useRef<HTMLDivElement | null>(null);

  const resultInfo = BalanceGameResults[finalResult];

  if (!resultInfo) return <div>결과를 찾을 수 없습니다.</div>;

  return (
    <div className='bg-[url(/background.png)] bg-cover bg-center w-full h-full flex flex-col items-center justify-center'>
      <div
        id='result-page'
        ref={resultPageRef}
        className='w-3/4 flex flex-col items-center bg-white p-4 rounded-lg my-[1vh]'
      >
        <h1 className='mb-8 text-xl'>
          나의 캐릭터는...{' '}
          <span className='text-2xl text-blue-500 font-bold'>{resultInfo.title}</span>야!
        </h1>
        <div className='w-full flex justify-center py-4'>
          <QRCodeSVG
            className='w-full h-full max-w-[320px] max-h-[320px]'
            value={`https://dokpami.onrender.com/balancegame/result/${finalResult}`}
          />
        </div>

        <Link to={`/balancegame/result/${finalResult}`} className='font-bold text-xl mb-5'>
          결과 확인하러 가기
        </Link>

        <img src='/logo.png' alt='logo' className='w-[100px] my-4' />
      </div>
    </div>
  );
}
