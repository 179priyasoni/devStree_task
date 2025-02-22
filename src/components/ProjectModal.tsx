import React, { useState, useEffect } from "react";
import { ProjectType, TaskType } from "../pages/projects";

interface ProjectModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onCreateProject: (project: ProjectType) => void;
  editingProject?: ProjectType | null;
}
const taskStatusOptions = ["Pending", "In-Progress", "Completed"] as const;
type TaskStatusType = (typeof taskStatusOptions)[number];

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  setIsOpen,
  onCreateProject,
  editingProject,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setDescription(editingProject.description);
      setDueDate(
        editingProject.tasks.find((task) => task.id === task.id)?.dueDate || ""
      );
      setTasks(editingProject.tasks);
      setStatus(
        editingProject.tasks.find((task) => task.id === task.id)?.status || ""
      );
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("");
      setTasks([]);
    }
  }, [editingProject]);

  const handleAddTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: prevTasks.length > 0 ? prevTasks[prevTasks.length - 1].id + 1 : 1,
        title: "",
        description: "",
        dueDate: "",
        status: "Pending",
        subtasks: [],
      },
    ]);
  };

  const handleAddSubtask = (taskIndex: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === taskIndex
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                { id: Date.now(), title: "", status: "Pending" },
              ],
            }
          : task
      )
    );
  };

  const handleTaskChange = (
    index: number,
    field: keyof TaskType,
    value: any
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, [field]: value } : task
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Project title cannot be empty.");
      return;
    }

    if (tasks.some((task) => task.title.trim() === "")) {
      alert("Task title cannot be empty.");
      return;
    }

    const newProject = {
      id: editingProject?.id || Date.now(),
      title,
      description,
      dueDate,
      tasks,
    };
    onCreateProject(newProject);
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center !bg-gray-800 !bg-opacity-50">
        <div className="!bg-white p-6 rounded shadow-lg w-1/2 max-h-4/5 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">
            {editingProject ? "Update Project" : "Create Project"}
          </h2>
          <input
            type="text"
            placeholder="Project Title"
            className="w-full p-2 border rounded mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Project Description"
            className="w-full p-2 border rounded mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h3 className="text-lg font-semibold">Tasks</h3>
          {tasks.map((task, index) => (
            <div key={task.id} className="border p-2 rounded mb-2">
              <input
                type="text"
                placeholder="Task Title"
                className="w-full p-1 border rounded mb-1"
                value={task.title}
                onChange={(e) =>
                  handleTaskChange(index, "title", e.target.value)
                }
              />
              <textarea
                placeholder="Task Description"
                className="w-full p-1 border rounded"
                value={task.description}
                onChange={(e) =>
                  handleTaskChange(index, "description", e.target.value)
                }
              />
              <input
                type="date"
                placeholder="Due date"
                className="w-full p-1 border rounded mb-1"
                value={task.dueDate}
                onChange={(e) =>
                  handleTaskChange(index, "dueDate", e.target.value)
                }
              />
              <select
                className="w-full p-1 border rounded mb-2"
                value={task.status}
                onChange={(e) =>
                  handleTaskChange(
                    index,
                    "status",
                    e.target.value as TaskStatusType
                  )
                }
              >
                {taskStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                className="mt-1 px-2 py-1 !bg-blue-500 text-white rounded"
                onClick={() => handleAddSubtask(index)}
              >
                Add Subtask
              </button>

              {task.subtasks.map((subtask, subIndex) => (
                <div
                  key={subtask.id}
                  className="ml-4 mt-1 p-2 border rounded !bg-gray-100"
                >
                  <input
                    type="text"
                    placeholder="Subtask Title"
                    className="w-full p-1 border rounded"
                    value={subtask.title}
                    onChange={(e) => {
                      setTasks((prevTasks) =>
                        prevTasks.map((t, i) =>
                          i === index
                            ? {
                                ...t,
                                subtasks: t.subtasks.map((s, si) =>
                                  si === subIndex
                                    ? { ...s, title: e.target.value }
                                    : s
                                ),
                              }
                            : t
                        )
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          ))}

          <button
            className="mt-2 px-3 py-1 !bg-green-500 text-white rounded"
            onClick={handleAddTask}
          >
            Add Task
          </button>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="px-4 py-2 !bg-gray-400 text-white rounded"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 !bg-blue-500 text-white rounded"
              onClick={handleSubmit}
            >
              {editingProject ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProjectModal;
