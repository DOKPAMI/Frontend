import { Link } from 'react-router-dom';
import Intro from './Intro';

const Home = () => {
  return (
    <div>
      <div className='bg-[url(/background.png)] bg-cover bg-center flex flex-col items-center w-screen max-w-[600px] h-screen overflow-hidden relative'>
        {/* 로고 */}
        <div className='absolute top-[4vh] sm:top-[2vh] w-full flex justify-center'>
          <img src='/logo.png' alt='로고' className='w-[80%] max-w-[350px] h-auto object-contain' />
        </div>

        {/* 파미 이미지 */}
        <div className='absolute top-[20vh] w-full flex justify-center'>
          <img
            src='/pami_monster.png'
            alt='파미'
            className='w-[90%] max-w-[450px] h-auto object-contain'
          />
        </div>

        {/* 버튼 */}
        <div className='absolute bottom-[23vh] w-full flex justify-center px-4'>
          <Link
            to='/event'
            className='w-full max-w-[320px] h-12 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-black overflow-hidden flex items-center justify-center'
          >
            <span className='text-black text-base font-["Jua"] sm:text-lg md:text-xl font-bold leading-none translate-y-[1px] whitespace-nowrap px-2'>
              독팜희 X 몬스터 이벤트 참여하기
            </span>
          </Link>
        </div>
        {/* 버튼 */}
        <div className='absolute bottom-[16vh] w-full flex justify-center px-4'>
          <Link
            to='/balancegame'
            className='w-full max-w-[320px] h-12 relative bg-amber-200 rounded-[73px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] outline-2 outline-offset-[-2px] outline-black overflow-hidden flex items-center justify-center'
          >
            <span className='text-black text-base font-["Jua"] sm:text-lg md:text-xl font-bold leading-none translate-y-[1px] whitespace-nowrap px-2'>
              독팜희 밸런스게임 하러가기
            </span>
          </Link>
        </div>
      </div>
      <Intro />
    </div>
  );
};

export default Home;
