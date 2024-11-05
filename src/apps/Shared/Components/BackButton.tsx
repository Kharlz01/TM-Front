import { FC, PropsWithChildren, MouseEvent } from "react";

type ButtonProps = object &
  PropsWithChildren & {
    onClick?: (e: MouseEvent) => void;
  };

const BackButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      className="cursor-pointer duration-200 hover:scale-125 active:scale-100
      flex items-center"
      title="Regresar"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40px"
        height="40px"
        viewBox="0 0 24 24"
        className="stroke-gray-500 pr-1"
      >
        <path
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="1.5"
          d="M11 6L5 12M5 12L11 18M5 12H19"
        ></path>
      </svg>
      <p>Volver</p>
    </button>
  );
};

export default BackButton;
