import { useState, useEffect } from "react";

export default function TaskModal({ isOpen, task, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "MEDIUM",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
      });
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      priority: "MEDIUM",
      dueDate: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 dark:bg-slate-950/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-950 dark:text-slate-100">
            {task ? "Vazifani Tahrirlash" : "Yangi Vazifa Yaratish"}
          </h2>
          <button
            onClick={handleClose}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-100"
          >
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-slate-200 font-semibold mb-2">
              Sarlavha
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-700 bg-slate-900 text-slate-100 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Vazifa sarlavhasi"
            />
          </div>

          <div>
            <label className="block text-slate-200 font-semibold mb-2">
              Tavsif
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-slate-700 bg-slate-900 text-slate-100 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Vazifa tavsifi"
            />
          </div>

          <div>
            <label className="block text-slate-200 font-semibold mb-2">
              Muhimlik Darajasi
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-700 bg-slate-900 text-slate-100 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="LOW">Kam Muhim</option>
              <option value="MEDIUM">O'rtacha</option>
              <option value="HIGH">Juda Muhim</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-200 font-semibold mb-2">
              Muddat
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-700 bg-slate-900 text-slate-100 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600
               text-slate-950 dark:text-slate-100 font-bold py-2 px-4 rounded-lg transition"
            >
              Bekor Qilish
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
