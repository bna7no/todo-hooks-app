function TodoItem({ task, onDelete }) {
    return (
        <div className="todo-item">
            <p>{task.title}</p>

            <button onClick={() => onDelete(task.id)}>
                Delete
            </button>
        </div>
    );
}

export default TodoItem;