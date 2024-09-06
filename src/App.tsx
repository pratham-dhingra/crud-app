import { Route, Routes } from "react-router-dom";
import CreateUser from "./CreateUser";
import UsersPage from "./UsersPage";
import EditUser from "./EditUser";
import ViewUser from "./ViewUser";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/create" element={<CreateUser />} />
      <Route path="/edit/:id" element={<EditUser />} />
      <Route path="/view/:id" element={<ViewUser />} />
    </Routes>
  );
};

export default App;
