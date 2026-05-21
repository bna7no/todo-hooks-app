import { useState } from "react";
import TodoList from "./components/TodoList";

function App() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Learn React" },
        { id: 2, title: "Build Todo App" },
        { id: 3, title: "Push project to GitHub" }
    ]);

    const [newTask, setNewTask] = useState("");

    function addTask() {
        if (newTask.trim() === "") {
            return;
        }

        const task = {
            id: Date.now(),
            title: newTask
        };

        setTasks([...tasks, task]);
        setNewTask("");
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <div className="app">
            <h1>Todo List</h1>

            <div className="form">
                <input
                    type="text"
                    value={newTask}
                    onChange={(event) => setNewTask(event.target.value)}
                    placeholder="Enter task"
                />

                <button onClick={addTask}>Add</button>
            </div>

            <TodoList tasks={tasks} onDelete={deleteTask} />
        </div>
    );
}

export default App;