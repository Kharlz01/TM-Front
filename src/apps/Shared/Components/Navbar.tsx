import { forwardRef, ComponentPropsWithRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Menu from './Menu';
import { useAuth } from '../../Auth/mode/AuthUser';

type NavbarProps = ComponentPropsWithRef<'header'>;

const Navbar = forwardRef<HTMLElement, NavbarProps>((props, ref) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      ref={ref}
      className={`fixed w-full h-20 
        bg-white z-10 ${props.className}`}
      {...props}
    >
      <div className='size-full px-4 max-w mx-auto flex items-center justify-between'>
        <a className='text-xl md:text-4xl font-["galada"]' href='/.'>
          Task<span className='text-purple-400'>Master</span>
        </a>
        <div className='flex items-center gap-x-2'>
          {!token ? (
            <Button onClick={() => navigate('/login')}>Ingreso</Button>
          ) : (
            <Menu />
          )}
          {!token && (
            <Button onClick={() => navigate('/signup')}>Registrate</Button>
          )}
        </div>
      </div>
    </header>
  );
});

export default Navbar;

