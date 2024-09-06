import { Call, Email, Language, LocationOn } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Skeleton,
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
      <Card variant="outlined" className="h-[230px] w-full">
        <CardContent>
          <div className="flex gap-2">
            {props.loading ? (
              <Skeleton variant="rectangular" className="mb-2 h-4 w-full" />
            ) : (
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                {props.user.company.name}
                {", "}
                {props.user.company.catchPhrase}
              </Typography>
            )}
          </div>
          <Typography variant="h5" component="div">
            {props.loading && (
              <Skeleton variant="rectangular" className="mb-2 h-6 w-full" />
            )}
            {!props.loading && props.user.name}
          </Typography>
          <Typography
            // gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {props.loading && (
              <Skeleton variant="rectangular" className="mb-2 h-4 w-full" />
            )}
            {!props.loading && <>Email: {props.user.email}</>}
          </Typography>
          <Typography
            // gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {props.loading && (
              <Skeleton variant="rectangular" className="mb-2 h-4 w-full" />
            )}
            {!props.loading && <>Phone: {props.user.phone}</>}
          </Typography>
          <Typography variant="body2">
            {props.loading && (
              <Skeleton variant="rectangular" className="mb-2 h-4 w-full" />
            )}
            {!props.loading && (
              <>
                {props.user.address.street}, {props.user.address.city}
              </>
            )}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {props.loading && (
            <Skeleton variant="rounded" className="mb-2 h-8 w-full" />
          )}
          {!props.loading && (
            <>
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
            </>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default UserCard;
