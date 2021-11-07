import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import EcoIcon from "@material-ui/icons/Eco";
import { useTotalIngredientsQuantity } from "src/hooks/ingredient/useTotalIngredientsQuantity";
const TotalIngredients = (props) => {
  const { state, loading, error } = useTotalIngredientsQuantity();
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL INGREDIENTS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {state.quantity}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: indigo[600],
                height: 56,
                width: 56,
              }}
            >
              <EcoIcon />
            </Avatar>
          </Grid>
        </Grid>

        {/* <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowDownward sx={{ color: red[900] }} />
        <Typography
          sx={{
            color: red[900],
            mr: 1,
          }}
          variant="body2"
        >
          10%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography>
      </Box> */}
      </CardContent>
    </Card>
  );
};
export default TotalIngredients;
