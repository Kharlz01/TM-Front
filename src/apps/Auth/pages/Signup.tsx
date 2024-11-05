import { ChangeEvent, FC, useRef, useState } from "react";
// import { useAuth } from "../../Auth/mode/AuthUser";
import { useNavigate } from "react-router-dom";

interface Signup {
  givenName: string;
  lastName: string;
  email: string;
  password: string;
}

type SignupProps = object;

const Signup: FC<SignupProps> = () => {
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // const { setToken } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<Signup>({
    givenName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleGivenName: (event: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      givenName: value,
    }));
  };

  const handleLastname: (event: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      lastName: value,
    }));
  };

  const handleEmail: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      email: value,
    }));
  };

  const handlePassword: (event: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      password: value,
    }));
  };

  const onSubmit: () => void = async () => {
    setLoading(true);

    Object.entries(data).forEach(([key, value]) => {
      if (!value || value === "") {
        setError("Hay campos requeridos vacios, complete la informacion.");
        throw new Error(`Valor ${value} invalido para la columna ${key}`);
      }
    });

    if (data?.password?.length < 8) {
      setError("La contraseña tiene menos de 8 caracteres");
      throw new Error(error);
    }

    if (data?.password !== confirmPasswordRef?.current?.value) {
      setError("Las contraseñas no coinciden");
      throw new Error(error);
    }

    const url = import.meta.env.VITE_BACK_URL;

    const endpoint = `${url}/auth/signup`;
    const request = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.success) {
      setPass(`${response.message} Sera redirigido al login.`);
      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <section className="h-screen w-full overflow-hidden">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Registrate ahora
            </h2>
            <p className="text-gray-500">
              Unete y crea tu propia coleccion de tareas.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">
                Correo Electronico
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500"
                value={data?.email}
                onChange={handleEmail}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Nombre</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500"
                value={data?.givenName}
                onChange={handleGivenName}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Apellido</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500"
                value={data?.lastName}
                onChange={handleLastname}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="***"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500"
                  value={data?.password}
                  onChange={handlePassword}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">
                  Confirma Contraseña
                </label>
                <input
                  ref={confirmPasswordRef}
                  type="password"
                  placeholder="***"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {pass && <div className="text-green-500 text-sm mb-4">{pass}</div>}
            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
                onClick={() => navigate("/")}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                onClick={() => onSubmit()}
              >
                {!loading ? "Confirmar" : "Cargando..."}
              </button>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            ¿Tienes ya una cuenta?{" "}
            <a href="./login" className="text-purple-600 hover:underline">
              Inicia Sesion
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
