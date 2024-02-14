"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  Alert,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { authSchema } from "../auth/schema";
// import { createCarSchema } from "./schema";
import { ItemWithoutId, itemCategories } from "@/models/item";
import { useItemContext } from "@/contexts/itemsContext";
import { createCarSchema } from "../create-car/schema";
import { useEffect } from "react";

function EditCar() {
  const { handleSubmit, control, reset } = useForm<ItemWithoutId>({
    resolver: yupResolver(createCarSchema),
    mode: "onChange",
  });
  const router = useRouter();
  const { id } = useParams();
  const { editCar, getOneProduct, oneItem } = useItemContext();

  async function onSubmit(data: ItemWithoutId) {
    await editCar(id as string, data);
    router.back();
  }

  useEffect(() => {
    getOneProduct(id as string);
  }, []);

  useEffect(() => {
    if (oneItem) {
      reset(oneItem);
    }
  }, [oneItem]);
  console.log(oneItem);
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Edit your car
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              error={invalid}
              // error={!!error} //error = {} -> true, error = undefined -> false
              helperText={error?.message}
              placeholder="Make and model of a car"
            />
          )}
        />
        <Controller
          name="image"
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              name="image"
              label="Image URL"
              type="text"
              id="image"
              autoComplete="image"
              error={invalid}
              helperText={error?.message}
              placeholder="Pass a link to your image"
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="price"
              autoComplete="price"
              error={invalid}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <FormControl sx={{ my: 2, width: "100%", minWidth: 120 }}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                label="Category"
                sx={{ textTransform: "capitalize" }}
                {...field}
                // TODO: category is not working
              >
                {itemCategories.map((item) => (
                  <MenuItem value={item} sx={{ textTransform: "capitalize" }}>
                    {/* {item[0].toUpperCase() + item.slice(1)} */}
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {invalid && (
                <FormHelperText error>{error?.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
      </Box>
      {/* {error && (
        <Alert
          severity="error"
          sx={{
            position: "fixed",
            left: "50%",
            top: "50px",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {error.code}
          <IconButton onClick={resetError} sx={{ padding: "0", ml: 2 }}>
            <CloseIcon sx={{ fontSize: "20px" }}></CloseIcon>
          </IconButton>
        </Alert>
      )} */}
    </Box>
  );
}

export default EditCar;
