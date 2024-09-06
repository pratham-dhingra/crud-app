import { Route, Routes } from "react-router-dom";
import CreateUser from "./CreateUser";
import UsersPage from "./UsersPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/create" element={<CreateUser />} />
      <Route path="/edit" element={<CreateUser />} />
    </Routes>
  );
};

export default App;
