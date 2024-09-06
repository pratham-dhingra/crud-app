import {
  Call,
  Delete,
  Edit,
  Email,
  Home,
  Language,
  LocationOn,
  Visibility,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { backendUri } from "./constants";
import { UserData } from "./types";

const ViewUser = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [user, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`${backendUri}/users/${id}`);
        console.log(resp.data);
        setUserData(resp.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          showMessage(error.message);
        } else {
          showMessage("There was an error while fetching the user.");
        }
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const deleteItem = async () => {
    setLoading(true);
    try {
      await axios.delete(`${backendUri}/users/${user!.id}`);
      showMessage(`User with id ${user!.id} deleted.`);
    } catch (error) {
      if (error instanceof AxiosError) {
        showMessage(error.message);
      } else {
        showMessage("There was an error while deleting");
      }
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string) => {
    setOpen(true);
    setMsg(text);
  };

  return (
    <>
      <main className="flex h-screen w-screen flex-col overflow-y-scroll bg-slate-900">
        <section className="flex h-full w-full flex-col justify-between p-6">
          <div className="flex justify-between gap-2">
            <h1 className="text-4xl font-bold text-white">
              {loading ? "Loading" : "View User"}
            </h1>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Link to={"/"}>
                <Button
                  startIcon={<Home />}
                  variant="contained"
                  color="secondary"
                >
                  Home
                </Button>
              </Link>
            )}
          </div>
          {!loading && (
            <Card variant="outlined" className="h-[320px] w-full">
              <CardContent>
                <Typography
                  // gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  ID: {user!.id}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {user!.company.name}
                  <br />
                  {user!.company.catchPhrase}
                </Typography>
                <Typography variant="h5" component="div">
                  {user!.name}
                </Typography>
                <Typography
                  // gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Email: {user!.email}
                </Typography>
                <Typography
                  // gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Phone: {user!.phone}
                </Typography>
                <Typography variant="body2">{user!.address.street}</Typography>
                <Typography variant="body2">{user!.address.suite}</Typography>
                <Typography variant="body2">{user!.address.city}</Typography>
                <Typography variant="body2">{user!.address.zipcode}</Typography>
              </CardContent>
              <CardActions
                disableSpacing
                className="flex w-full justify-between"
              >
                <div className="flex items-center justify-center">
                  <Link to={`tel:${user!.phone}`}>
                    <IconButton aria-label="Call User">
                      <Call />
                    </IconButton>
                  </Link>
                  <Link to={`https://${user!.website}`}>
                    <IconButton aria-label="Website">
                      <Language />
                    </IconButton>
                  </Link>
                  <Link to={`mailto:${user!.email}`}>
                    <IconButton aria-label="Email User">
                      <Email />
                    </IconButton>
                  </Link>
                  <Link
                    to={`https://www.google.com/maps?q=${user!.address.geo.lat},${user!.address.geo.lng}`}
                  >
                    <IconButton aria-label="Location">
                      <LocationOn />
                    </IconButton>
                  </Link>
                </div>
                <div>
                  <Link to={`/view/${user!.id}`}>
                    <IconButton aria-label="Location">
                      <Visibility fontSize="medium" color="primary" />
                    </IconButton>
                  </Link>
                  <Link to={`/edit/${user!.id}`}>
                    <IconButton aria-label="Location">
                      <Edit fontSize="medium" color="secondary" />
                    </IconButton>
                  </Link>
                  <IconButton onClick={deleteItem} aria-label="Location">
                    <Delete fontSize="medium" color="error" />
                  </IconButton>
                </div>
              </CardActions>
            </Card>
          )}

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

export default ViewUser;
