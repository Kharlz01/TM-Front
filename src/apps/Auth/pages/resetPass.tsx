import {
    ChangeEvent,
    FC,
    useState,
    useRef,
    useEffect,
  } from "react";

  import { useAuth } from "../mode/AuthUser";
  
  import { useLocation } from "react-router-dom";
  
  type ResetPassProps = object;
  
  const ResetPass: FC<ResetPassProps> = () => {
    const { logout } = useAuth();
  
  // Variables para cambios de contraseña
  
    const [error2, setError2] = useState<string>("");
    const [pass2, setPass2] = useState<string>("");
    const [loading2, setLoading2] = useState<boolean>(false);
    const [pss, setPss] = useState<string>("");
    const pss2 = useRef<HTMLInputElement>(null);

  
    const url = import.meta.env.VITE_BACK_URL;

    // Almaceno la token que envio en el enlace
    const { search } = useLocation(); 
    const params = new URLSearchParams(search); 
    const token = params.get("token");

    // Almaceno token temporal en local
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
    }, [token]);
    
    const handlePassword: (event: ChangeEvent<HTMLInputElement>) => void = (
      e
    ) => {
      const value = e.target.value;
      setPss(value);
    };
  
    const changePassword: () => void = async () => {
      setLoading2(true);
      console.log(token);
      
  
      if (!pss || pss === "" || !pss2) {
        setLoading2(false);
        setError2("Hay campos requeridos vacios, complete la informacion.");
        throw new Error(`Valor de constraseña vacio`);
      }
  
      if (pss !== pss2?.current?.value) {
        setLoading2(false);
        setError2("Las contraseñas no coinciden");
        throw new Error(error2);
      }
  
      const passwordData = {
        newPassword: pss,
      }

      const endpoint = `${url}/auth/resetPassword`;
  
      const request = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });
  
      const response = await request.json();
  
      if ("success" in response && response.success) {
        setPass2(
          `Contraseña cambiada con exito, sera redirigido al inicio.`
        );
        setLoading2(false);
        setTimeout(() => {
            logout();
        }, 2000);
      } else {
        console.log("Error: ",response);
        
        setError2(response.message);
      }
  
      setLoading2(false);
    };
  
    return (
      <section className="h-screen w-full overflow-hidden">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="size-full flex justify-center items-center">
            <article className="h-auto w-full max-w-screen-md p-12 shadow-md border border-black rounded-lg">
              <div>
                  <h2 className="text-center text-4xl font-bold pt-4">
                    Reinicio de contraseña
                  </h2>
                  <p className="text-center pt-4 font-serif">
                    Aqui puedes restablecer tu contraseña:
                  </p>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Contraseña nueva:
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={pss}
                      onChange={handlePassword}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Confirma la contraseña:
                    </label>
                    <input
                      type="password"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      ref={pss2}
                    />
                  </div>
                  {error2 && (
                    <div className="text-red-500 text-sm mb-4">{error2}</div>
                  )}
                  {pass2 && (
                    <div className="text-green-500 text-sm mb-4">{pass2}</div>
                  )}
                  <button
                    className="bg-green-400 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={changePassword}
                  >
                    {!loading2 ? "Confirmar" : "Cargando..."}
                  </button>
               </div>
            </article>
          </div>
        </div>
      </section>
    );
  };
  
  export default ResetPass;
  