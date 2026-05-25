
export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const priorityColors = {
    HIGH: "bg-red-600 text-red-100",
    MEDIUM: "bg-amber-600 text-amber-100",
    LOW: "bg-emerald-600 text-emerald-100",
  };

  const statusOptions = ["TODO", "IN_PROGRESS", "DONE"];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 hover:shadow-lg
     transition border border-slate-200 dark:border-slate-700">
      <div className="mb-3">
        <h3 className="font-bold text-slate-950 dark:text-slate-100 text-lg">{task.title}</h3>
        {task.description && (
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{task.description}</p>
        )}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.dueDate && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          {new Date(task.dueDate).toLocaleDateString("uz-UZ")}
        </p>
      )}

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600
           text-white px-3 py-2 rounded-xl transition text-sm"
        >
          Tahrirlash
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600
           text-white px-3 py-2 rounded-xl transition text-sm"
        >
          O'chirish
        </button>
      </div>

      <div className="flex gap-2">
        {statusOptions.map((status) => (
          status !== task.status && (
            <button
              key={status}
              onClick={() => onStatusChange(task._id, status)}
              className="flex-1 flex items-center justify-center gap-1 bg-slate-200 dark:bg-slate-700
               hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-950 dark:text-slate-100
                px-2 py-1 rounded-xl transition text-xs"
            >
              {status}
            </button>
          )
        ))}
      </div>
    </div>
  );
}
