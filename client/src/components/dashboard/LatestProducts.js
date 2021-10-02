import { v4 as uuid } from "uuid";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const products = [
  {
    id: uuid(),
    name: "Apple cake",

    updatedAt: moment().subtract(2, "hours"),
  },
  {
    id: uuid(),
    name: "Banana cake",

    updatedAt: moment().subtract(2, "hours"),
  },
  {
    id: uuid(),
    name: "Chocolate cake",

    updatedAt: moment().subtract(3, "hours"),
  },
  {
    id: uuid(),
    name: "Dried meat floss toast",

    updatedAt: moment().subtract(5, "hours"),
  },
  {
    id: uuid(),
    name: "Ham toast",
    imageUrl: "/static/images/products/product_5.png",
    updatedAt: moment().subtract(9, "hours"),
  },
];

const LatestProducts = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${products.length} in total`}
      title="Latest Products"
    />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem divider={i < products.length - 1} key={product.id}>
          <ListItemAvatar>
            <img
              alt={product.name}
              src={"/static/images/croissant.png"}
              style={{
                height: 48,
                width: 48,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={`Updated ${product.updatedAt.fromNow()}`}
          />
          <IconButton edge="end" size="small">
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);

export default LatestProducts;
