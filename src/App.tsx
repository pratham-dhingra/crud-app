import { Route, Routes } from "react-router-dom";
import CreateUser from "./CreateUser";
import UsersPage from "./UsersPage";
import EditUser from "./EditUser";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/create" element={<CreateUser />} />
      <Route path="/edit/:id" element={<EditUser />} />
    </Routes>
  );
};

export default App;
