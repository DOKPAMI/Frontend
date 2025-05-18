import { Link } from 'react-router-dom';
import Intro from '../Landing/Intro';

const Home = () => {
  return (
    <div>
      <div className='bg-[url(/background.png)] bg-cover bg-center flex flex-col items-center w-screen max-w-[600px] h-screen overflow-hidden relative'>
        {/* 로고 */}
        <div className='absolute top-[8vh] w-full flex justify-center'>
          <img src='/logo.png' alt='로고' className='w-[80%] max-w-[400px] h-auto object-contain' />
        </div>

        {/* 파미 이미지 */}
        <div className='absolute top-[40vh] w-full flex justify-center sm:top-[35vh]'>
          <img
            src='/pami_monster.png'
            alt='파미'
            className='w-[90%] max-w-[500px] h-auto object-contain'
          />
        </div>

        {/* 버튼 */}
        <div className='absolute bottom-[5vh] w-full flex justify-center px-4 sm:bottom-[8vh]'>
          <Link
            to='/event'
            className='w-full max-w-[384px] h-14 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-black overflow-hidden flex items-center justify-center'
          >
            <span className='text-black text-lg sm:text-xl md:text-2xl font-bold font-["Noto_Sans_KR"] leading-none translate-y-[1px] whitespace-nowrap px-2'>
              독팜희 X 몬스터 이벤트 참여하기
            </span>
          </Link>
        </div>
      </div>
      <Intro />
    </div>
  );
};

export default Home;
