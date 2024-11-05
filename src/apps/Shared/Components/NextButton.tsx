import { FC, PropsWithChildren, MouseEvent } from "react";

type ButtonProps = object & PropsWithChildren & {
    onClick?: (e: MouseEvent) => void;
    disabled?: boolean;
    loading?: boolean;
  }

const NextButton: FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className="inline-block p-3 md:px-6 md:py-3 md:mr-3 font-bold text-center 
      text-white align-middle transition-all rounded-lg 
      cursor-pointer bg-gradient-to-tl from-violet-700 to-pink-500 
      leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md 
      bg-150 bg-x-25 hover:scale-110 hover:rotate-2 hover:bg-pink-200 
      hover:text-pink-200 hover:shadow-lg active:opacity-85"
    >
      <span className="text-base leading-4">
        {loading && "Cargando..."}
        {!loading && children}
      </span>
    </button>
  );
};

export default NextButton;
