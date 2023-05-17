import { useEffect, useState } from "react";

export default function App() {
  const [value, setValue] = useState();
  const [editValue, setEditValue] = useState();
  const [editId, setEditId] = useState();
  let [arrTasks, setArrTasks] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      setArrTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  let submit = () => {
    if (value) {
      let data = {
        task: value,
        id: Date.now(),
        done: false,
      };
      let arr = arrTasks;
      arr = [...arr, data];
      window.localStorage.setItem("tasks", JSON.stringify(arr));
      setArrTasks(arr);
    }
  };

  let edit = (id, task) => {
    setEditValue(task);
    setEditId(id);
    document.querySelector(".edit").classList.add("onn");
    document.querySelector(".add").classList.add("off");
  };
  let update = () => {
    let arr = arrTasks;
    arr = arr.map((ele) => {
      if (ele.id === editId) {
        return { ...ele, task: editValue };
      }
      return ele;
    });
    window.localStorage.setItem("tasks", JSON.stringify(arr));
    setArrTasks(arr);
    document.querySelector(".edit").classList.remove("onn");
    document.querySelector(".add").classList.remove("off");
  };

  let cancel = () => {
    document.querySelector(".edit").classList.remove("onn");
    document.querySelector(".add").classList.remove("off");
  };

  let handelDelete = (id) => {
    let arr = arrTasks;
    arr = arr.filter((ele) => ele.id !== id);
    window.localStorage.setItem("tasks", JSON.stringify(arr));
    setArrTasks(arr);
  };

  let handelDone = (id) => {
    let arr = arrTasks;

    arr = arr.map((ele) => {
      if (ele.id === id) {
        return { ...ele, done: !ele.done };
      }
      return ele;
    });
    window.localStorage.setItem("tasks", JSON.stringify(arr));
    setArrTasks(arr);
  };

  let showData = arrTasks.map((ele, index) => {
    let div;
    if (ele.done) {
      div =
        "task flex justify-between py-3 bg-gray-600 px-2 rounded-lg my-3 task-done";
    } else {
      div = "task flex justify-between py-3 bg-gray-600 px-2 rounded-lg my-3";
    }
    return (
      <div className={div} key={ele.id}>
        <div className="flex items-center gap-4">
          <span className=" border-white border text-white flex items-center justify-center  w-10 h-10  rounded-full text-lg">
            {index + 1}
          </span>
          <p className="text-white text-lg">{ele.task}</p>
        </div>
        <div className="flex justify-center items-center cursor-pointer">
          <i
            className="bg-white fa-solid fa-check text-xl p-1 mx-2 rounded-full  cursor-pointer"
            onClick={(e) => handelDone(ele.id)}
          ></i>
          <i
            className="fa-solid fa-pen text-xl text-white mx-2 cursor-pointer"
            onClick={(e) => edit(ele.id, ele.task)}
          ></i>
          <i
            className="fa-solid fa-trash text-xl text-white mx-2"
            onClick={(e) => handelDelete(ele.id)}
          ></i>
        </div>
      </div>
    );
  });
  return (
    <div className="bg-gradient-to-r from-[#3c424a] to-[#212529] h-full flex justify-center items-center ">
      <div className="container bg-[#3c424a]  p-5 rounded-lg">
        <h1 className="text-4xl font-semibold text-white text-center pb-5">
          Todo List App (React.js)
        </h1>
        <div className="tasks bg-[#212529] p-5 rounded-lg">
          <div className="flex gap-5 justify-center mb-5 add">
            <div className="flex-1">
              <input
                type="text"
                className="w-full p-3  rounded-md focus:border-none focus:outline-none"
                placeholder="Add a Task"
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={(e) => submit()}
                className="bg-green-500 p-3 rounded-md w-20 text-center cursor-pointer  text-white font-semibold "
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex gap-5 justify-center mb-5 edit">
            <div className="flex-1">
              <input
                type="text"
                className="w-full p-3  rounded-md focus:border-none focus:outline-none"
                placeholder="Add a Task"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={(e) => update()}
                className="bg-green-500 p-3 rounded-md w-20 text-center cursor-pointer  text-white font-semibold "
              >
                Update
              </button>
              <button
                onClick={(e) => cancel()}
                className="bg-yellow-500 p-3 rounded-md w-20 text-center cursor-pointer  text-white font-semibold mx-2"
              >
                cancel
              </button>
            </div>
          </div>
          <div className="tasks-container bg-[#3c424a] p-3 rounded-lg">
            {showData}
          </div>
        </div>
      </div>
    </div>
  );
}
