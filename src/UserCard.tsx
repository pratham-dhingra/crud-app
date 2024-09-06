import { Call, Delete, Email, Language, LocationOn } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { UserData } from "./types";
import { useState } from "react";
import SkeletonCard from "./SkeletonCard";
import axios, { AxiosError } from "axios";
import { backendUri } from "./constants";

type Props = {
  user: UserData;
  showMessage: (msg: string) => void;
};

const UserCard = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const deleteItem = async () => {
    setLoading(true);
    try {
      await axios.delete(`${backendUri}/users/${props.user.id}`);
      props.showMessage(`User with id ${props.user.id} deleted.`);
    } catch (error) {
      if (error instanceof AxiosError) {
        props.showMessage(error.message);
      } else {
        props.showMessage("There was an error while deleting");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <>
      <Card variant="outlined" className="h-[250px] w-full">
        <CardContent>
          <Typography
            // gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            ID: {props.user.id}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {props.user.company.name}
            {", "}
            {props.user.company.catchPhrase}
          </Typography>
          <Typography variant="h5" component="div">
            {props.user.name}
          </Typography>
          <Typography
            // gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Email: {props.user.email}
          </Typography>
          <Typography
            // gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Phone: {props.user.phone}
          </Typography>
          <Typography variant="body2">
            {props.user.address.street}, {props.user.address.city}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="flex w-full justify-between">
          <div className="flex items-center justify-center">
            <Link to={`tel:${props.user.phone}`}>
              <IconButton aria-label="Call User">
                <Call />
              </IconButton>
            </Link>
            <Link to={`https://${props.user.website}`}>
              <IconButton aria-label="Website">
                <Language />
              </IconButton>
            </Link>
            <Link to={`mailto:${props.user.email}`}>
              <IconButton aria-label="Email User">
                <Email />
              </IconButton>
            </Link>
            <Link
              to={`https://www.google.com/maps?q=${props.user.address.geo.lat},${props.user.address.geo.lng}`}
            >
              <IconButton aria-label="Location">
                <LocationOn />
              </IconButton>
            </Link>
          </div>
          <IconButton onClick={deleteItem} aria-label="Location">
            <Delete fontSize="large" color="error" />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default UserCard;
