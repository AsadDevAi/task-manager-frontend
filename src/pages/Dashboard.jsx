import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import axiosInstance from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/tasks");
      setTasks(response.data.data);
    } catch (err) {
      setError("Vazifalarni yuklashda xatolik");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Siz rostdan bu vazifani o'chirmoqchimisiz?")) {
      try {
        await axiosInstance.delete(`/tasks/${taskId}`);
        setTasks(tasks.filter((t) => t._id !== taskId));
      } catch (err) {
        setError("Vazifani o'chirishda xatolik");
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axiosInstance.patch(`/tasks/${taskId}/status`, {
        status: newStatus,
      });
      setTasks(
        tasks.map((t) =>
          t._id === taskId ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      setError("Vazifa holatini o'zgartirishda xatolik");
    }
  };

  const handleSaveTask = async (formData) => {
    try {
      if (selectedTask) {
        const response = await axiosInstance.put(
          `/tasks/${selectedTask._id}`,
          formData
        );
        setTasks(
          tasks.map((t) =>
            t._id === selectedTask._id ? response.data.data : t
          )
        );
      } else {
        const response = await axiosInstance.post("/tasks", formData);
        setTasks([...tasks, response.data.data]);
      }
      setIsModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      setError("Vazifani saqlashda xatolik");
    }
  };

  const todoTasks = tasks.filter((t) => t.status === "TODO");
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");
  const doneTasks = tasks.filter((t) => t.status === "DONE");

  if (!user) {
    return <div className="text-center p-8 text-slate-100">Yuklanmoqda</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-100">Mening Vazifalarim</h2>
          <button
            onClick={handleAddTask}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white
             px-6 py-3 rounded-lg font-semibold transition"
          >
            Yangi Vazifa
          </button>
        </div>

        {error && (
          <div className="bg-red-950 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Vazifalar yuklanmoqda</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-950 dark:text-slate-400 mb-4">
                TODO ({todoTasks.length})
              </h3>
              <div className="space-y-3">
                {todoTasks.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">Bo'sh</p>
                ) : (
                  todoTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-cyan-800 dark:text-cyan-400 mb-4">
                IN_PROGRESS ({inProgressTasks.length})
              </h3>
              <div className="space-y-3">
                {inProgressTasks.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">Bo'sh</p>
                ) : (
                  inProgressTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-4">
                DONE ({doneTasks.length})
              </h3>
              <div className="space-y-3">
                {doneTasks.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">Bo'sh</p>
                ) : (
                  doneTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
      />
    </div>
  );
}
