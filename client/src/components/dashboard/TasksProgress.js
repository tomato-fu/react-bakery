import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import InsertChartIcon from "@material-ui/icons/InsertChartOutlined";

const TasksProgress = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            CURRENT ORDERS
          </Typography>
          <Typography color="textPrimary" variant="h3">
            9
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56,
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 2 }}>
        <Typography color="textSecondary" variant="caption">
          <span style={{ color: "#fb8c00", fontSize: "0.875rem" }}>4 </span>{" "}
          orders fulfilled
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default TasksProgress;
