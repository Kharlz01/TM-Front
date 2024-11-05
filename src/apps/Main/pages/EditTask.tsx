import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../../Shared/domain/Task";

import BackButton from "../../Shared/Components/BackButton";
import DeleteButton from "../../Shared/Components/DeleteButton";
import NextButton from "../../Shared/Components/NextButton";

type EditTaskProps = object;

const EditTask: FC<EditTaskProps> = () => {
  const [error, setError] = useState<string>("");

  const [pass, setPass] = useState<string>("");
  const [conf, setConf] = useState<boolean>(false);
  const [formatDate, setformatDate] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<Task>({
    id: "",
    name: "",
    description: "",
    endDate: "",
    priority: "",
    status: "",
    tag: "",
  });

  const { id } = useParams();

  const url = import.meta.env.VITE_BACK_URL;
  const navigate = useNavigate();

  const taskInfo: () => Promise<Task | null> = useCallback(async () => {
    const request = await fetch(`${url}/tasks/${id}`, {
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

    if (data.endDate) {
      setformatDate(data.endDate.split("T")[0]);
    }

    return response.data;
  }, [conf]);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      taskInfo().catch((err) => console.error(err));
    }

    return () => {
      isSubscribed = false;
    };
  }, [taskInfo]);

  const handleName: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      name: value,
    }));
  };

  const handleDescription: (event: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const value = e.target.value;
    setData((previousState) => ({
      ...previousState,
      description: value,
    }));
  };

  const handleEndDate: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setformatDate(value.split("T")[0]);
    setData((previousState) => ({
      ...previousState,
      endDate: value,
    }));
  };

  const handlePriority: (event: ChangeEvent<HTMLSelectElement>) => void = (
    e
  ) => {
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

    const currentDate = new Date();
    const endDate = new Date(data.endDate);
    const dateValidator = currentDate < endDate;

    if (!dateValidator) {
      setLoading(false);
      setError(
        "La fecha de vencimiento ya caduco, actualizala para continuar."
      );
      throw new Error(`Valor ${endDate} debe ser posterior a ${currentDate}`);
    }

    const url = import.meta.env.VITE_BACK_URL;

    const endpoint = `${url}/tasks/${data.id}`;
    const request = await fetch(endpoint, {
      method: "PUT",
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

  const onDelete: () => void = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer."
    );

    if (confirmDelete) {
      setLoading(true);

      const endpoint = `${url}/tasks/${data.id}`;

      const request = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      const response = await request.json();

      if (response.success) {
        setPass(
          `${response.message}, sera redirigido al menu de configuracion.`
        );
        setLoading(false);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(response.message);
      }

      setLoading(false);
    }
  };

  return (
    <section className="h-screen w-full overflow-hidden">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white px-8 pb-8 pt-3 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Actualizar tarea:
            </h2>
            <p className="text-gray-500">Renueva la informacion de tu tarea:</p>
          </div>
          <div className="space-y-4">
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
                  value={formatDate}
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
                  onChange={handleStatus}
                >
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
            <div className="flex items-center justify-between pt-4">
              <BackButton
              onClick={() => navigate("/")}></BackButton>
              <DeleteButton onClick={() => onDelete()}></DeleteButton>
              <NextButton
                onClick={() => onSubmit()}
                loading={loading}
              >Guardar</NextButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditTask;
