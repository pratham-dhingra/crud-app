import axios from "axios";
import { useEffect, useState } from "react";
import { backendUri } from "./constants";
import { UserData } from "./types";
import { CircularProgress } from "@mui/material";
import UserCard from "./UserCard";
import SkeletonCard from "./SkeletonCard";

function App() {
  const [users, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(`${backendUri}/users`);
      setUserData(resp.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <>
      <main className="flex h-screen w-screen flex-col overflow-y-scroll bg-slate-900">
        <section className="flex h-full w-full flex-col p-6">
          <div className="flex justify-between gap-2">
            <h1 className="text-4xl font-bold text-white">
              {loading ? "Loading" : "Users"}
            </h1>
            {loading ? <CircularProgress color="secondary" /> : <div />}
          </div>
          <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
            {loading &&
              [...new Array(10)].map((_, index) => {
                return <SkeletonCard key={index} />;
              })}
            {!loading &&
              users.map((user) => {
                return <UserCard key={user.id} user={user} />;
              })}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
