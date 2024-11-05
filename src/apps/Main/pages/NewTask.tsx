import { ChangeEvent, FC, useState } from "react";
// import { useAuth } from "../../Auth/mode/AuthUser";
import { useNavigate } from "react-router-dom";

import BackButton from "../../Shared/Components/BackButton";
import NextButton from "../../Shared/Components/NextButton";

interface Task {
  name: string;
  description: string;
  endDate: string;
  priority: string;
  status: string;
  tag: string;
}

type NewTaskProps = object;

const Signup: FC<NewTaskProps> = () => {
  const [error, setError] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // const { setToken } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<Task>({
    name: "",
    description: "",
    endDate: "",
    priority: "low",
    status: "pending",
    tag: "not",
  });

  const handleName: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      name: value,
    }));
  };

  const handleDescription: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      description: value,
    }));
  };

  const handleEndDate: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      endDate: value,
    }));
  };

  const handlePriority: (event: ChangeEvent<HTMLSelectElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      priority: value,
    }));
  };

  const handleStatus: (event: ChangeEvent<HTMLSelectElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      status: value,
    }));
  };

  const handleTag: (event: ChangeEvent<HTMLSelectElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      tag: value,
    }));
  };

  const onSubmit: () => void = async () => {
    setLoading(true);

    Object.entries(data).forEach(([key, value]) => {
      if (!value || value === "") {
        setLoading(false);
        setError("Hay campos requeridos vacios, complete la informacion.");
        throw new Error(`Valor ${value} invalido para la columna ${key}`);
      }
    });

    const url = import.meta.env.VITE_BACK_URL;

    const endpoint = `${url}/tasks/newTask`;
    const request = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.success) {
      setPass(`${response.message} Sera redirigido al inicio.`);
      setError("");
      setLoading(false);

      setTimeout(() => {
        navigate("/");
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
              Nueva tarea
            </h2>
            <p className="text-gray-500">Crea tu nueva tarea aqui</p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Titulo:</label>
              <input
                type="text"
                placeholder="Nombre de la tarea"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500"
                value={data?.name}
                onChange={handleName}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">
                Descripcion:
              </label>
              <input
                type="text"
                placeholder="Detalles de la tarea"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500"
                value={data?.description}
                onChange={handleDescription}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600">
                  Fecha de vencimiento:
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500"
                  value={data?.endDate}
                  onChange={handleEndDate}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">
                  Prioridad:
                </label>
                <select 
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500 bg-gray-100"
                value={data?.priority}
                onChange={handlePriority}
                >
                  <option value={"low"}>Baja</option>
                  <option value={"medium"}>Media</option>
                  <option value={"high"}>Alta</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600">Estado:</label>
                <select 
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500 bg-gray-100"
                value={data?.status}
                onChange={handleStatus}>
                  <option value={"pending"}>Pendiente</option>
                  <option value={"ongoing"}>En curso</option>
                  <option value={"completed"}>Completado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Etiqueta:</label>
                <select 
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-purple-500 bg-gray-100"
                value={data?.tag}
                onChange={handleTag}
                >
                  <option value={"not"}>Sin categoria</option>
                  <option value={"personal"}>Personal</option>
                  <option value={"work"}>Trabajo</option>
                  <option value={"home"}>Hogar</option>
                  <option value={"projects"}>Proyectos</option>
                  <option value={"relative"}>Familiar</option>
                  <option value={"education"}>Educacion</option>
                  <option value={"health"}>Salud</option>
                  <option value={"money"}>Finanzas</option>
                  <option value={"creative"}>Creativas</option>
                </select>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {pass && <div className="text-green-500 text-sm mb-4">{pass}</div>}
            <div className="flex items-center justify-between pt-3">
              <BackButton
              onClick={() => navigate("/")}>
              </BackButton>
              <NextButton
              onClick={() => onSubmit()}
              loading={loading}>
                Crear
              </NextButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
