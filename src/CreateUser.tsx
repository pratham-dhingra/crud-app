import { CircularProgress, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useState } from "react";
import { Form } from "./Form";
import { hasAnyEmpty } from "./utils";
import axios, { AxiosError } from "axios";
import { backendUri } from "./constants";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

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

  const handleOnSubmit = async (values: Record<string, string>) => {
    if (hasAnyEmpty(values)) {
      showMessage("Please fill out all the values to proceed.");
      return;
    }

    setLoading(true);
    try {
      const resp = await axios.post(`${backendUri}/users`);
      console.log(resp.data);
      showMessage(`User with id ${resp.data.id} created.`);
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      if (error instanceof AxiosError) {
        showMessage(error.message);
      } else {
        showMessage("There was an error while creating the user.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex h-screen w-screen flex-col overflow-y-scroll bg-slate-900">
        <section className="flex h-full w-full flex-col justify-between p-6">
          <div className="flex justify-between gap-2">
            <h1 className="text-4xl font-bold text-white">
              {loading ? "Loading" : "Create New User"}
            </h1>
            {loading ? <CircularProgress color="secondary" /> : <div />}
          </div>
          <div className="w-full rounded-md bg-white p-6">
            <Form
              loading={loading}
              buttonText="Add User"
              onSubmit={handleOnSubmit}
              initialValues={{
                name: "",
                username: "",
                email: "",
                phone: "",
                website: "",
                companyName: "",
                address: "",
              }}
              formFields={[
                { name: "name", type: "text", label: "Full Name" },
                { name: "username", type: "text", label: "User Name" },
                { name: "email", type: "text", label: "Email" },
                { name: "phone", type: "text", label: "Phone" },
                { name: "website", type: "text", label: "Website" },
                { name: "companyName", type: "text", label: "Company Name" },
                { name: "address", type: "text", label: "Address Street" },
              ]}
            />
          </div>
          <div />
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
};

export default CreateUser;
