// 버튼 컴포넌트 분리
interface BalanceChoiceButtonProps {
  label: string;
  onClick: () => void;
  color: 'blue' | 'yellow';
}
export default function BalanceChoiceButton({ label, onClick, color }: BalanceChoiceButtonProps) {
  return (
    <button
      className={`cursor-pointer py-2 w-full border-2 border-black ${
        color === 'yellow' ? 'bg-yellow-300 ' : 'bg-blue-300'
      } rounded-lg text-center px-2 text-sm sm:text-base md:text-lg`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
