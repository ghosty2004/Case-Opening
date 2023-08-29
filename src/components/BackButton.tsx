import { AiOutlineArrowLeft } from "react-icons/ai";

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-start">
      <button
        className="flex justify-center items-center bg-gray-600 p-2 rounded drop-shadow-[0_0_0.2rem_gray] hover:drop-shadow-[0_0_0.4rem_gray]"
        onClick={onClick}
      >
        <AiOutlineArrowLeft />
        <div className="font-inter">GO BACK</div>
      </button>
    </div>
  );
}
