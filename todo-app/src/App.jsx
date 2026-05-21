import TodoList from "./components/TodoList";

function App() {

    const tasks = [
        { id: 1, title: "Learn React" },
        { id: 2, title: "Build Todo App" },
        { id: 3, title: "Push project to GitHub" }
    ];

    return (
        <div className="app">
            <h1>Todo List</h1>

            <TodoList tasks={tasks} />
        </div>
    );
}

export default App;