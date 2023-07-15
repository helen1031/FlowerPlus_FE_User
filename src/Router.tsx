import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import CreatePost from "./routes/CreatePost";
import PostDetail from "./routes/PostDetail";
import MyPost from "./routes/MyPost";
import AllPost from "./routes/AllPost";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="signup" element={<Signup></Signup>}></Route>
        <Route path="/create-post" element={<CreatePost></CreatePost>}></Route>
        <Route path="/:id" element={<PostDetail></PostDetail>} />
        <Route path="/my-posts" element={<MyPost></MyPost>}></Route>
        <Route path="/all-posts" element={<AllPost></AllPost>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
