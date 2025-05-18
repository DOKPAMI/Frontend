export default function Intro() {
  return (
    <div className='w-full h-screen bg-[#EBF3FE] flex flex-col overflow-hidden'>
      {/* 상단: 제목, 부제목, 소개 */}
      <div className='px-6 pt-2 pb-1 flex-shrink-0'>
        <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-2'>DOKPAMI</h1>
        <h2 className='font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 whitespace-normal break-keep'>
          독팜희와 함께 하는 대학생활, 너는 어떤 타입이야?
        </h2>
        <div className='text-xs sm:text-sm md:text-base text-left leading-relaxed'>
          나 독팜희. 드디어 2학년이 되었어! 신나게 1학년을 마치고 선배 독수리가 되었는데, 아직도
          어떻게 해야 할지 모르겠는 거 있지🥲
          <br />
          그래서 말인데, 너희들은 어떻게 대학생활을 하고 있는지 궁금해.
          <br />
          열심히 갓생 사는 중이야? 혹시 연애하느라 바빠? 아니면 역시 집에 있는 게 최고일까나? 너는
          어떤 타입이야⁉️
        </div>
      </div>

      {/* 캐릭터 이미지: 중앙 정렬 */}
      <div className='h-[45vh] sm:h-[50vh] md:flex-1 flex items-center justify-center bg-[#C9DDFB] relative'>
        <img
          src='/pami_blue.png'
          className='
            w-[240px]
            sm:w-[320px]
            md:w-[380px]
            lg:w-[440px]
            xl:w-[480px]
            object-contain drop-shadow-lg
            translate-x-16
            translate-y-4
          '
          alt='독팜희 캐릭터'
        />
      </div>

      {/* 하단: 프로필 정보 */}
      <div className='w-full bg-[#C9DDFB] px-6 py-2 flex-shrink-0'>
        <div className="text-black text-xs sm:text-sm md:text-base font-['Noto_Sans_KR'] leading-tight text-left">
          이름: 독팜희(禿팜喜)
          <br />
          학력: 연세대학교 싱크로나이즈드비행학과
          <br />
          MBTI: ENFP(가끔씩 T)
          <br />
          키: 29.8cm(팜피셜 30cm)
          <br />
          날개 길이: 10cm
          <br />
          생일: 2024년 3월 2일
          <br />
          취미: 릴스 & 숏츠 보기
        </div>
      </div>

      {/* 맨 아래: 로고 */}
      <div className='flex justify-center py-2 flex-shrink-0'>
        <img
          src='blocklogo.png'
          className='w-[40px] sm:w-[50px] md:w-[60px] object-cover'
          alt='BLOCK 로고'
        />
      </div>
    </div>
  );
}
