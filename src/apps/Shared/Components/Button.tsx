import { 
    useState,
    FC, 
    PropsWithChildren,
    MouseEvent,
  } from 'react';
  
  type ButtonProps = object & PropsWithChildren & {
    onClick?: (e: MouseEvent) => void;
    disabled?: boolean;
    loading?: boolean;
  }
  
  const Button: FC<ButtonProps> = ({
    children,
    onClick,
    disabled = false,
    loading = false,
  }) => {
    const [hover, setHover,] = useState<boolean>(false);
  
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`px-2 py-1 md:px-4 md:py-2 text-white rounded-lg text-center
                     ${hover ? 'bg-purple-700' : 'bg-purple-500'}`}
        style={{
          ...(disabled && {
            backgroundColor: 'gray',
          }),
        }}>
          <span className='text-sm md:text-lg md:leading-4'>
            {loading && (
              'Cargando...'
            )}
            {!loading && children}
          </span>
      </button>
    );
  };
  
  export default Button;