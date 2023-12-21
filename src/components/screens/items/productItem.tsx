import { Item } from "@/models/item";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

interface ProductItemProps {
  item: Item;
}
function ProductItem({ item }: ProductItemProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={item.image} title={item.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.category}
        </Typography>
        <Typography variant="h5">${item.price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default ProductItem;
