import { useEffect, useState } from 'react';
import { BalanceGameQuestions } from '@/data/BalanceGameQuestions';
import BalanceChoiceButton from './_BalanceChoiceButton';
import ResultQR from './_ResultQR';
import { sendGameResult } from './api';

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

      // indexOf()가 더 낮은(앞선) 쪽이 우선으로 순서 정렬
      // ex) '집순' 타입이 '공부' 타입과 동점일 경우 더 높은 우선 순위로 선택 됨.
      const typePriorityOrder = [
        'leader',
        'home',
        'yolo',
        'study',
        'njob',
        'love',
        'hardworking',
        'sociable',
      ];

      resultsWithMaxCount.sort((a, b) => {
        const aTypePriority = typePriorityOrder.indexOf(a);
        const bTypePriority = typePriorityOrder.indexOf(b);
        return aTypePriority - bTypePriority;
      });

      sendGameResult({ user: 'unregistered', resultType: resultsWithMaxCount[0] }).then(() => {
        setFinalResult(resultsWithMaxCount[0]);
      });
      console.log('보냈음!', finalResult);
    }
  }, [results]);

  return (
    <div className='bg-[url(/background.png)] bg-cover bg-center w-full h-full flex flex-col items-center justify-center font-["Jua"]'>
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
        <div className='flex flex-col items-center bg-white p-8 rounded-lg'>
          <div className='flex flex-col items-center'>
            <h2 className='text-md'>
              {results.length + 1}/{gameQuestions.length}
            </h2>
            <h2 className='text-2xl m-8'>{gameQuestions[results.length].topic}</h2>
            <div className='flex flex-col space-y-16'>
              <BalanceChoiceButton
                label={gameQuestions[results.length].selects.top.select}
                onClick={() => {
                  handleChoiceButton(gameQuestions[results.length].selects.top.type);
                }}
              />
              <BalanceChoiceButton
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
