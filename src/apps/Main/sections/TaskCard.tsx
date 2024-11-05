import { FC, useCallback, ComponentProps } from "react";
import { useNavigate } from "react-router-dom";

import { Task } from "../../Shared/domain/Task";
import EditButton from "../../Shared/Components/EditButton";

type TaskCardProps = object &
  ComponentProps<"article"> & {
    task: Task;
  };

function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Formatear la fecha
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();

  // Valida si la tarea ya se venció
  const currentDate = new Date();
  const endDate = new Date(task.endDate);
  const dateValidator = currentDate < endDate;

  const handleLimitDescription = useCallback(
    (limit: number) => {
      if (task?.description?.length > limit) {
        return `${task?.description?.slice(0, limit)}...`;
      }
      return task.description;
    },
    [task.description]
  );

  type TaskStatus = "completed" | "ongoing" | "pending";

  const statusBg: Record<TaskStatus, string> = {
    completed: "bg-green-500",
    ongoing: "bg-blue-400",
    pending: "bg-orange-400",
  };

  const statusTexts: Record<TaskStatus, string> = {
    completed: "Completada",
    ongoing: "En curso...",
    pending: "Pendiente",
  };

  type TaskPriority = "low" | "medium" | "high";

  const priorityBg: Record<TaskPriority, string> = {
    low: "bg-gray-500",
    medium: "bg-yellow-500",
    high: "bg-red-600",
  };

  const priorityTexts: Record<TaskPriority, string> = {
    low: "Opcional",
    medium: "Importante",
    high: "Urgente",
  };

  type TaskTag =
    | "not"
    | "personal"
    | "work"
    | "home"
    | "projects"
    | "relative"
    | "education"
    | "health"
    | "money"
    | "creative";

  const tagText: Record<TaskTag, string> = {
    not: "Sin categoria",
    personal: "Personal",
    work: "Trabajo",
    home: "Hogar",
    projects: "Proyectos",
    relative: "Familiar",
    education: "Educacion",
    health: "Salud",
    money: "Finanzas",
    creative: "Creativas",
  };

  const taskStatus: TaskStatus = task.status as TaskStatus;
  const taskTag: TaskTag = task.tag as TaskTag;
  const taskPriority: TaskPriority = task.priority as TaskPriority;

  return (
    <article className="grow min-h-[370px] min-w-[250px] h-full ml-4 w-full max-h-[370px] max-w-[310px] bg-white rounded-xl border border-gray-300 shadow-md flex flex-col justify-between">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <button
            className={`${statusBg[taskStatus]} 
      text-white font-bold text-xs md:text-base py-2 px-4 rounded m-2 cursor-default`}
          >
            {statusTexts[taskStatus]}
          </button>
          <button className="bg-gray-400 text-white text-xs md:text-base font-bold py-2 px-4 rounded m-2 cursor-default">
            {tagText[taskTag]}
          </button>
        </div>

        <h3 className="font-primary-alt font-bold text-2xl mt-4">
          {task?.name}
        </h3>
        <div className="font-bold mt-4 mb-2">
          {dateValidator ? (
            <div>
              Vence:{" "}
              <span className="font-normal">{formatDate(task.endDate)}</span>
            </div>
          ) : (
            <div className="text-red-500">
              Vencida:{" "}
              <span className="font-normal">{formatDate(task.endDate)}</span>
            </div>
          )}
        </div>

        <span className="mt-3 text-sm text-gray-700 flex-grow">
          {handleLimitDescription(100)}
        </span>
      </div>

      <div className="flex items-center justify-between p-4">
        <button
          className={`${priorityBg[taskPriority]} 
      text-white font-bold text-xs md:text-base py-2 px-4 rounded m-2 cursor-default`}
        >
          {priorityTexts[taskPriority]}
        </button>
        <EditButton
          onClick={() =>
            navigate({
              pathname: `/updateTask/${task?.id}`,
            })
          }
        />
      </div>
    </article>
  );
};

export default TaskCard;
