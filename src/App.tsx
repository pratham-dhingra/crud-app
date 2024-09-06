import axios from "axios";
import { useEffect, useState } from "react";
import { backendUri } from "./constants";
import { UserData } from "./types";
import { CircularProgress, Snackbar, SnackbarCloseReason } from "@mui/material";
import UserCard from "./UserCard";
import SkeletonCard from "./SkeletonCard";

function App() {
  const [users, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const showMessage = (text: string) => {
    setOpen(true);
    setMsg(text);
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(`${backendUri}/users`);
      setUserData(resp.data);
      setLoading(false);
      showMessage("Users data loaded!");
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
                return (
                  <UserCard
                    showMessage={showMessage}
                    key={user.id}
                    user={user}
                  />
                );
              })}
          </div>
        </section>
      </main>
      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
      />
    </>
  );
}

export default App;
