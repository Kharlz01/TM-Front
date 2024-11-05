import { FC, useCallback, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Task } from "../../Shared/domain/Task";
import TaskCard from "../sections/TaskCard";
import { useAuth } from "../../Auth/mode/AuthUser";

import NewButton from "../../Shared/Components/NewButton";
import CardInfo from "../../Shared/Components/CardInfo";

type HomeProps = object;

const Home: FC<HomeProps> = () => {
  const [Tasks, setTasks] = useState<Array<Task>>([]);
  const [Tags, setTags] = useState<string>("");
  const [Sort, setSort] = useState<string>("");

  const { token } = useAuth();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACK_URL;

  const getAllTasks = useCallback(async () => {
    const request = await fetch(
      `${url}/tasks/tags?value=${Tags}&status=${Sort}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const response = await request.json();
    return response.data as Array<Task>;
  }, [Tags, Sort]);

  const handleTags = (e: ChangeEvent<HTMLSelectElement>) => {
    setTags(e.target.value);
    console.log(e.target.value);
  };

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed)
      getAllTasks()
        .then(setTasks)
        .catch((err) => console.error(err))
        .finally();

    return () => {
      isSubscribed = false;
    };
  }, [getAllTasks]);

  return token ? (
    <section className="min-h-screen w-full bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <nav className="flex justify-between items-center bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4">
        <NewButton onClick={() => navigate("/newTask")}></NewButton>
        <div className="flex space-x-4">
          <div>
            <select
              className="bg-white text-black border border-black font-bold py-2 px-4 rounded"
              value={Sort}
              onChange={handleSort}
            >
              <option value={""}>Ordenar:</option>
              <option value={"status-asc"}>Estado ↑</option>
              <option value={"status-desc"}>Estado ↓</option>
              <option value={"priority-asc"}>Prioridad ↑</option>
              <option value={"priority-desc"}>Prioridad ↓</option>
              <option value={"endDate-asc"}>Vencimiento ↑</option>
              <option value={"endDate-desc"}>Vencimiento ↓</option>
              <option value={"tag-asc"}>Etiqueta ↑</option>
              <option value={"tag-desc"}>Etiqueta ↓</option>
            </select>
          </div>
          <div>
            <select
              className="bg-white text-black border border-black font-bold py-2 px-4 rounded"
              value={Tags}
              onChange={handleTags}
            >
              <option value={""}>Filtrar:</option>
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
      </nav>
      <div className="size-full max-w-screen-2xl mx-auto px-6 py-6">
      <div className="size-full flex flex-wrap gap-4">
        {/* <div className="size-full flex flex-wrap gap-4"> */}
          {Tasks && Tasks.length > 0 ? (
            Tasks.map((Task) => <TaskCard key={Task.id} task={Task} />)
          ) : (
            <div>
              {Tags === "" ? (
                <CardInfo>
                  Al parecer no tienes tareas creadas aun. | 
                  Dale en "Nueva tarea" para crear una.
                </CardInfo>
              ) : (
                <CardInfo>
                  Al parecer no existen tareas con el criterio de busqueda. | 
                  Revisa otra categoria para visualizar mas tareas.
                </CardInfo>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  ) : (
    <section
      className="h-screen w-full overflow-hidden 
    bg-gradient-to-r from-cyan-500 to-blue-500
    flex flex-col items-center justify-center"
    >
      <h1 className='text-2xl md:text-8xl font-["galada"]'>
        Bienvenido a Task<span className="text-purple-400">Master</span>
      </h1>
      <h2 className="text-xl md:text-4xl my-3">
        Tu aplicativo de gestion de tareas personales.
      </h2>
      <h3 className="text-xl md:text-3xl my-2">Aqui comienza tu aventura</h3>
      <p className="text-lg">
        {" "}
        <a className="text-violet-200" href="./signup">
          Crea una cuenta
        </a>{" "}
        y empieza la experiencia.
      </p>
    </section>
  );
};

export default Home;
