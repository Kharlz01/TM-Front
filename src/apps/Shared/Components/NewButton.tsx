import { 
    FC, 
    PropsWithChildren,
    MouseEvent,
  } from 'react';
  
  type ButtonProps = object & PropsWithChildren & {
    onClick?: (e: MouseEvent) => void;
  }
  
  const NewButton: FC<ButtonProps> = ({
    onClick,
  }) => {
  
    return (
        <button 
        className="rounded-lg relative w-10 md:w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
        onClick={onClick}>
          <span className="text-white font-semibold ml-3 group-hover:text-green-500 transition-all duration-300 hidden md:block">
            Nueva Tarea
          </span>
          <span className="absolute md:right-0 h-full w-10 rounded-lg bg-green-500 
          flex items-center justify-center transform group-hover:translate-x-0 
          group-hover:w-full transition-all duration-300">
            <svg
              className="svg w-8 text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
          </span>
        </button>
    );
  };
  
  export default NewButton;