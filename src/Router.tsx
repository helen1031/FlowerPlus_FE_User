import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import CreatePost from "./routes/CreatePost";
import ModifyPost from "./routes/ModifyPost";
import PostDetail from "./routes/PostDetail";
import MyPost from "./routes/MyPost";
import SubscriberPost from "./routes/SubscriberPost";
import AllPost from "./routes/AllPost";
import OthersPost from "./routes/OthersPost";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="signup" element={<Signup></Signup>}></Route>
        <Route path="/create-post" element={<CreatePost></CreatePost>}></Route>
        <Route
          path="/modify-post/:id"
          element={<ModifyPost></ModifyPost>}
        ></Route>
        <Route path="/:id" element={<PostDetail></PostDetail>} />
        <Route path="/my-posts" element={<MyPost></MyPost>}></Route>
        <Route
          path="/subscriber-posts"
          element={<SubscriberPost></SubscriberPost>}
        ></Route>
        <Route path="/all-posts" element={<AllPost></AllPost>}></Route>
        <Route
          path="/others-posts/:userId"
          element={<OthersPost></OthersPost>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
