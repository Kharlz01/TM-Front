import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";

import { User } from "../../Shared/domain/User";

type EditUserProps = object;

const EditUser: FC<EditUserProps> = () => {
  const [error, setError] = useState<string>("");

  const [pass, setPass] = useState<string>("");
  const [conf, setConf] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<User>({
    id: "",
    email: "",
    password: "",
    givenName: "",
    lastName: "",
    image: ""
  });

  const url = import.meta.env.VITE_BACK_URL;

  const userInfo: () => Promise<User | null> = useCallback(async () => {
    const request = await fetch(`${url}/users/userinfo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!request.ok) {
      console.error("Algo salió mal: ", request.statusText);
      return null;
    }

    const response = await request.json();
    
    if (!conf) {
      setData(response.data);
      setConf(true);
    }

    return response.data;
  }, [conf]);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      userInfo()
      .catch((err) => console.error(err));
    }

    return () => {
      isSubscribed = false;
    };
  }, [userInfo]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  const onEdit: () => void = async () => {
    setLoading(true);

    Object.entries(data).forEach(([key, value]) => {
      if (!value || value === "") {
        setError("Hay campos requeridos vacios, complete la informacion.");
        throw new Error(`Valor ${value} invalido para la columna ${key}`);
      }
    });

    const endpoint = `${url}/users/settings/${data.id}`;
    const request = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if ("success" in response && response.success) {
      setPass(`${response.message}, sera redirigido al menu de inicio.`);
      setLoading(false);

      setTimeout(() => {
        setConf(true);
        // navigate("/.");
        window.location.href = "/.";
      }, 2000);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <section className="h-full w-full overflow-hidden">
      <div className="size-full max-w-screen-2xl mx-auto">
        <div className="size-full flex justify-center items-center">
          <article className="h-auto w-full max-w-screen-md p-12 shadow-md border border-black rounded-lg">
            <div className="size-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-center text-4xl font-bold">
                  Datos personales
                </h2>
                <p className="text-center pt-4 font-serif">
                  Te pedimos que rellenes la informacion mostrada a continuacion
                  y en lo posible siempre tengas tus datos actualizados
                </p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="givenName"
                >
                  Nombre:
                </label>
                <input
                  id="givenName"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.givenName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Apellido:
                </label>
                <input
                  id="lastName"
                  placeholder="..."
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Correo electronico:
                </label>
                <input
                  id="email"
                  type="email"
                  title="No es posible cambiar el correo ya que esta ligado a la cuenta."
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.email}
                  disabled
                  onChange={handleInputChange}
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              {pass && (
                <div className="text-green-500 text-sm mb-4">{pass}</div>
              )}

              <button
                className="bg-fuchsia-500 hover:bg-violet-700 text-white 
                font-bold py-2 px-4 rounded mt-2
                focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={onEdit}
              >
                {!loading ? "Confirmar" : "Cargando..."}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
