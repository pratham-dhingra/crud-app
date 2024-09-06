import { Call, Email, Language, LocationOn } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { UserData } from "./types";

type Props = {
  user: UserData;
  loading: boolean;
};

const UserCard = (props: Props) => {
  return (
    <>
      <Card variant="outlined" className="max-w-96">
        <CardContent>
          <div className="flex gap-2">
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {props.user.company.name}
              {", "}
              {props.user.company.catchPhrase}
            </Typography>
          </div>
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
        <CardActions disableSpacing>
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
        </CardActions>
      </Card>
    </>
  );
};

export default UserCard;
