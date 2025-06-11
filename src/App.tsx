import NavBar from "./components/navbar";
import Home from "./components/home";
import SignIn from "./components/signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./components/todolist";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/todo-list" element={<TodoList />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
