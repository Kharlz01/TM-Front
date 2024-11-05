import { FC, PropsWithChildren, MouseEvent } from "react";

type ButtonProps = object &
  PropsWithChildren & {
    onClick?: (e: MouseEvent) => void;
  };

const EditButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex overflow-hidden ring-[5px] ring-gray-300 w-[5.1rem] 
    hover:w-[7rem] items-center gap-2 cursor-pointer bg-gradient-to-r 
    from-violet-500 to-fuchsia-500 text-white px-5 py-2 rounded-full 
    transition-all ease-in-out hover:scale hover:scale-105 font-[revert] 
    active:scale-100 shadow-lg"
      onClick={onClick}
    >
      Editar
      <svg
        className="size-6 mt-0.5"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
    </button>
  );
};

export default EditButton;
