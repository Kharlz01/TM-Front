import { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    FC, 
    ReactNode, 
} from 'react';

// Validador del Token generado desde el Backend
interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Realiza lectura del token
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // Verifica cambios dentro del elemento token
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    window.location.href = '/.';
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

