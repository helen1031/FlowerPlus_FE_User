import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import CreatePost from "./routes/CreatePost";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="/create-post" element={<CreatePost></CreatePost>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
