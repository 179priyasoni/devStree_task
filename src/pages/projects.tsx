import React, { useState, useEffect } from "react";
import ProjectModal from "../components/ProjectModal";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../components/SortableItem";

export type SubTaskType = {
  id: number;
  title: string;
  status: string;
};

export type TaskType = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  subtasks: SubTaskType[];
};

export type ProjectType = {
  id: number;
  title: string;
  description: string;
  tasks: TaskType[];
};

function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectType | null>(
    null
  );

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  const handleCreateOrUpdateProject = (project: ProjectType) => {
    setProjects((prevProjects) => {
      let updatedProjects;
      const existingIndex = prevProjects.findIndex((p) => p.id === project.id);
      if (existingIndex !== -1) {
        updatedProjects = prevProjects.map((p) =>
          p.id === project.id ? project : p
        );
      } else {
        updatedProjects = [...prevProjects, { ...project, id: Date.now() }];
      }
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return updatedProjects;
    });

    setIsOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setProjects((prevProjects) => {
      const oldIndex = prevProjects.findIndex(
        (project) => project.id === active.id
      );
      const newIndex = prevProjects.findIndex(
        (project) => project.id === over.id
      );

      if (oldIndex === -1 || newIndex === -1) return prevProjects;

      const updatedProjects = arrayMove(prevProjects, oldIndex, newIndex);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return updatedProjects;
    });
  };

  const handleTaskDragEnd = (event: any, projectId: number) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id !== projectId) return project;

        const oldIndex = project.tasks.findIndex(
          (task) => task.id === active.id
        );
        const newIndex = project.tasks.findIndex((task) => task.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return project;

        const updatedTasks = arrayMove(project.tasks, oldIndex, newIndex);
        return { ...project, tasks: updatedTasks };
      })
    );
  };

  const handleUpdateProject = (e: React.MouseEvent, project: ProjectType) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingProject(project);
    setIsOpen(true);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tasks.some((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="container mx-auto p-6 overflow-hidden w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-semibold">Projects</h1>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <button
          className="px-4 py-2 !bg-blue-500 text-white rounded"
          onClick={() => {
            setEditingProject(null);
            setIsOpen(true);
          }}
        >
          Create Project
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={projects.map((project) => project.id)}
          strategy={verticalListSortingStrategy}
        >
          {filteredProjects.map((project) => {
            const totalTasks = project.tasks.length;
            const completedTasks = project.tasks.filter(
              (task) => task.status === "Completed"
            ).length;
            const progress =
              totalTasks > 0
                ? Math.round((completedTasks / totalTasks) * 100)
                : 0;

            return (
              <SortableItem key={project.id} id={project.id}>
                <div className="p-4 mb-2 !bg-gray-100 rounded shadow-md">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-3">
                      <h2 className="text-lg font-bold">
                        Project Name: {project.title}
                      </h2>
                      {project.description && (
                        <h2 className="text-lg font-semibold">
                          Project Description: {project.description}
                        </h2>
                      )}
                      <h2 className="text-lg font-semibold">Tasks:</h2>

                      <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={(event) =>
                          handleTaskDragEnd(event, project.id)
                        }
                      >
                        <SortableContext
                          items={project.tasks.map((task) => task.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <ul className="list-disc ml-5">
                            {project.tasks.length > 0 ? (
                              project.tasks.map((task) => (
                                <SortableItem key={task.id} id={task.id}>
                                  <li className="text-lg font-semibold ml-12 mb-8">
                                    {task.title} - {task.status}
                                    {task.subtasks.length > 0 && (
                                      <ul className="list-circle mx-4 mt-1">
                                        {task.subtasks.map((subtask) => (
                                          <li
                                            key={subtask.id}
                                            className="text-md font-medium"
                                          >
                                            Subtask: {subtask.title}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                </SortableItem>
                              ))
                            ) : (
                              <li className="text-lg font-semibold">
                                No Tasks
                              </li>
                            )}
                          </ul>
                        </SortableContext>
                      </DndContext>

                      <h2
                        className={`text-lg font-semibold ${
                          progress === 100
                            ? "text-green-500"
                            : progress === 0
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                      >
                        Project Progress: {progress}%
                      </h2>
                    </div>

                    {/* Update & Delete Buttons */}
                    <div className="space-x-2">
                      <button
                        className="px-3 py-1 !bg-green-500 text-white rounded"
                        onClick={(e) => handleUpdateProject(e, project)}
                      >
                        Update
                      </button>
                      <button
                        className="px-3 py-1 !bg-red-500 text-white rounded"
                        onClick={(e) => handleDeleteProject(e, project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>

      {isOpen && (
        <ProjectModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onCreateProject={handleCreateOrUpdateProject}
          editingProject={editingProject}
        />
      )}
    </div>
  );
}

export default Projects;
