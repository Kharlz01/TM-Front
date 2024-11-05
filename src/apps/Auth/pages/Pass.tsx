import { ChangeEvent, FC, useState, FormEvent } from "react";

import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
}

type LoginProps = object;

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();

  const [pass, setPass] = useState<string>("");

  // Se obtiene datos de usuario

  const [data, setData] = useState<User>({
    email: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = import.meta.env.VITE_BACK_URL;
    setLoading(true);

    const endpoint = `${url}/auth/email`;

    const request = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if ('success' in response && response.success) {
      setPass(`${response.message}, sera redirigido al menu de inicio.`);
      setLoading(false);

      setTimeout(() => {
        // navigate("/.");
        window.location.href = "/.";
      }, 2000);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };

  return (
    <section className="h-screen w-full overflow-hidden">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Recuperacion de contraseña
            </h2>
            <p className="text-gray-500 mt-4">
              Ingresa tu correo para el proceso de recuperacion
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleEmail}>
            <div>
              <label className="block text-sm text-gray-600">
                Correo Electronico
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500"
                value={data?.email}
                onChange={handleInputChange}
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {pass && <div className="text-green-500 text-sm mb-4">{pass}</div>}
            
            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className={
                    `px-4 py-2 bg-purple-600 text-white rounded-lg 
                    hover:bg-purple-800 
                    ${loading && ("animate-bounce mt-2")}`}
              >
                {!loading ? "Confirmar" : "Cargando..."}
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
                onClick={() => navigate("/")}
              >
                Cancelar
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <a href="./signup" className="text-purple-600 hover:underline">
              Registrate
            </a>
          </p>
          <p className="mt-4 text-center text-sm text-gray-600">
            ¿Se trata de un error?{" "}
            <a href="./login" className="text-purple-600 hover:underline">
              Vuelve al inicio de sesion
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
