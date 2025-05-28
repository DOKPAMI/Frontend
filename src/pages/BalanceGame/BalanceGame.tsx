import { useEffect, useState } from 'react';
import { BalanceGameQuestions } from '@/data/BalanceGameQuestions';
import BalanceChoiceButton from './_BalanceChoiceButton';
import ResultQR from './_ResultQR';
import { Link } from 'react-router-dom';

export default function BalanceGame() {
  const gameQuestions = BalanceGameQuestions;
  const [results, setResults] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState('');

  const handleChoiceButton = (choiceType: string) => {
    setResults((prev) => [...prev, choiceType]);
  };

  useEffect(() => {
    // 모든 질문에 답변 완료 시, 최종 유형 계산
    if (results.length === gameQuestions.length) {
      const resultCount: Record<string, number> = {};
      results.forEach((type) => {
        resultCount[type] = (resultCount[type] || 0) + 1;
      });

      // 가장 많이 뽑인 결과들 추출
      const maxResultCount = Math.max(...Object.values(resultCount));
      const resultsWithMaxCount = Object.keys(resultCount).filter(
        (key) => resultCount[key] === maxResultCount,
      );
      // 동점인 결과들 중에서 랜덤으로 하나 선택
      const randomIndex = Math.floor(Math.random() * resultsWithMaxCount.length);
      const selectedResult = resultsWithMaxCount[randomIndex];

      setFinalResult(selectedResult);

      console.log('보냈음!', selectedResult);
    }
  }, [results]);

  return (
    <div className='bg-[url(/background.png)] bg-cover bg-center w-full h-full flex flex-col items-center justify-center font-["Jua"]'>
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
      {results.length === gameQuestions.length ? (
        finalResult ? (
          /* 모든 질문에 답변을 마쳤다면 결과 표시 */
          <ResultQR finalResult={finalResult} />
        ) : (
          /* 모든 질문 답변 ~ finalResult 나오는데 걸리는 사이 (React Hook 고려)*/
          <div className='bg-white p-4 rounded-lg'>너의 유형을 계산중이야! 잠시만 기다려줘!</div>
        )
      ) : (
        /* 모든 질문에 아직 답변을 못 했다면 다음 질문 */
        <div className='flex flex-col items-center bg-white p-8 rounded-lg w-5/6 h-1/3'>
          <div className='flex flex-col items-center'>
            <h2 className='text-md'>
              {results.length + 1}/{gameQuestions.length}
            </h2>
            <h2 className='text-xl sm:text-xl md:text-2xl my-8'>
              {gameQuestions[results.length].topic}
            </h2>
            <div className='w-full flex flex-col space-y-8'>
              <BalanceChoiceButton
                color='blue'
                label={gameQuestions[results.length].selects.top.select}
                onClick={() => {
                  handleChoiceButton(gameQuestions[results.length].selects.top.type);
                }}
              />
              <BalanceChoiceButton
                color='yellow'
                label={gameQuestions[results.length].selects.bottom.select}
                onClick={() => {
                  handleChoiceButton(gameQuestions[results.length].selects.bottom.type);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
