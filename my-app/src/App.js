import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import {BsFillTrashFill,BsCheckCircleFill,BsXCircleFill,} from "react-icons/bs";
function App() {
  let copy = [];
  const [selected, setSelected] = useState("all");
  let [data, setData] = useState([]);
  const [todo, setTodo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    data.push({ id: nanoid(), todo: todo, completed: false });
    console.log(data);
    setTodo("");
  };
  const handleChangeCompleted = (id) => {
    const index = data.findIndex((item) => item.id === id);
    data[index].completed = !data[index].completed;
    setData([...data]);
  };
  const handleDelete = (id) => {
    const index = data.findIndex((item) => item.id === id);
    data.splice(index, 1);
    console.log(data);
    setData([...data]);
  };
  const handleClearCompleted = () => {
    data = data.filter((item) => item.completed === true);
    setData([...data]);
  };
  let counter = data.filter((item) => item.completed === false).length;
  if (selected === "all") {
    copy = data;
  }
  if (selected === "active") {
    copy = data.filter((item) => item.completed === false);
  }
  if (selected === "completed") {
    copy = data.filter((item) => item.completed === true);
  }
  console.log(selected);
  return (
    <div className="App">
      <div className="todoAllSection">
        <h1 className="projectTitle">React Todo List Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="formInput"
            placeholder="Add Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </form>
        <ul>
          <li style={{border: "0",fontSize: "28px",fontWeight: "600",margin: "0 300px",}}>
            Todo List
          </li>
          {copy.map((item) => {
            return (
              <li key={item.id}>
                <div className="textCompleted">
                  {item.completed === true ? (
                    <BsCheckCircleFill className="completedIcon" onClick={() => handleChangeCompleted(item.id)}/>) : (<BsXCircleFill className="waitIcon" onClick={() => handleChangeCompleted(item.id)}/>)}
                  <span className={item.completed === true ? "lineThrough" : ""} style={{ fontSize: "24px" }}>
                    {item.todo}
                  </span>
                </div>
                <BsFillTrashFill className="removeIcon" onClick={() => handleDelete(item.id)}/>
              </li>
            );
          })}
        </ul>
        <div className="todoInfo">
          <div className="leftTodo">{counter} items left</div>
          <div className="filterMenu">
            <button className="filterButton" onClick={() => setSelected("all")}>All</button>
            <button className="filterButton" onClick={() => setSelected("active")}>Active</button>
            <button className="filterButton" onClick={() => setSelected("completed")}>Completed</button>
          </div>
          <div className="clearMenu">
            <button className="clearButton" onClick={handleClearCompleted}>
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
