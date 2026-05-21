import { useEffect, useState } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/tasks")
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    const addTask = async () => {
        if (!title.trim()) return;

        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title
            })
        });

        const newTask = await response.json();

        setTasks([...tasks, newTask]);
        setTitle("");
    };

    const deleteTask = async (id) => {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE"
        });

        setTasks(tasks.filter(task => task.id !== id));
    };

    const editTask = async (id) => {
        const newTitle = prompt("New task title:");

        if (!newTitle) return;

        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle
            })
        });

        const updatedTask = await response.json();

        setTasks(
            tasks.map(task =>
                task.id === id ? updatedTask : task
            )
        );
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Todo List</h1>

            <input
                type="text"
                placeholder="Enter task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={addTask}>
                Add
            </button>

            {tasks.map(task => (
                <div
                    key={task.id}
                    style={{
                        marginTop: "15px",
                        border: "1px solid gray",
                        padding: "10px",
                        width: "300px"
                    }}
                >
                    <p>{task.title}</p>

                    <button onClick={() => editTask(task.id)}>
                        Edit
                    </button>

                    <button
                        onClick={() => deleteTask(task.id)}
                        style={{ marginLeft: "10px" }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default App;