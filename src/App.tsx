import axios from "axios";
import { useEffect, useState } from "react";
import { backendUri } from "./constants";
import { UserData } from "./types";
import { CircularProgress } from "@mui/material";
import UserCard from "./UserCard";

function App() {
  const [users, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(`${backendUri}/users`);
      setUserData([resp.data[0]]);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <>
      <main className="h-screen w-screen bg-slate-900 flex flex-col">
        {loading && (
          <>
            <section className="w-full h-full flex flex-col p-6">
              <div className="flex gap-2 justify-between">
                <h1 className="text-white text-4xl font-bold">Loading </h1>
                <CircularProgress color="secondary" />
              </div>
            </section>
          </>
        )}
        {!loading && (
          <section className="w-full h-full flex flex-col p-6">
            <div className="flex gap-2 justify-between">
              <h1 className="text-white text-4xl font-bold">Users</h1>
              <div />
            </div>
            {users.map((user) => {
              return <UserCard key={user.id} loading={loading} user={user} />;
            })}
          </section>
        )}
      </main>
    </>
  );
}

export default App;
