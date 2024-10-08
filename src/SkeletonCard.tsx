import {
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";

const SkeletonCard = () => {
  return (
    <>
      <Card variant="outlined" className="h-[250px] w-full">
        <CardContent>
          <Skeleton variant="rectangular" className="mb-2 h-4 w-full" />
          <Skeleton variant="rectangular" className="mb-2 h-4 w-full" />
          <Typography variant="h5" component="div">
            <Skeleton variant="rectangular" className="mb-2 h-6 w-full" />
          </Typography>
          <Typography
            // gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            <Skeleton variant="rectangular" className="mb-2 h-4 w-full" />
          </Typography>
          <Typography
            // gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            <Skeleton variant="rectangular" className="mb-2 h-4 w-full" />
          </Typography>
          <Typography variant="body2">
            <Skeleton variant="rectangular" className="mb-2 h-4 w-full" />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Skeleton variant="rounded" className="mb-2 h-8 w-full" />
        </CardActions>
      </Card>
    </>
  );
};

export default SkeletonCard;
