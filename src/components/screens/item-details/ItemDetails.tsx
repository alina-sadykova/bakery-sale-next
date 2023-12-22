"use client";
import ErrorModal from "@/components/common/errorModal";
import Loading from "@/components/common/loading";
import { useItemContext } from "@/contexts/itemsContext";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import NextLink from "next/link";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ItemDetails = () => {
  const { oneItem, loading, error, handleResetError, getOneProduct } =
    useItemContext();
  const { id } = useParams();

  useEffect(() => {
    getOneProduct(id as string);
  }, []);

  return (
    <div>
      {oneItem && (
        <>
          <Button
            startIcon={<ArrowBackIosNewIcon />}
            component={NextLink}
            href={"/items"}
            sx={{ color: "black" }}
          >
            Go back
          </Button>
          <Paper
            sx={{
              mt: 3,
              position: "relative",
              backgroundColor: "grey.800",
              color: "#fff",
              mb: 4,
              padding: 3,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${oneItem.image})`,
            }}
          >
            {/* Increase the priority of the hero background image */}
            {
              <img
                style={{ display: "none" }}
                src={oneItem.image}
                alt={oneItem.title}
              />
            }
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,.3)",
              }}
            />
            <Grid container>
              <Grid item md={6}>
                <Box
                  sx={{
                    position: "relative",
                    p: { xs: 3, md: 6 },
                    pr: { md: 0 },
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    {oneItem.title}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    ${oneItem.price}
                  </Typography>

                  <Button variant="outlined" color="inherit">
                    Buy
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}

      {loading && <Loading />}

      <ErrorModal
        message={`${error}`}
        open={!!error}
        onClose={handleResetError}
      />
    </div>
  );
};

export default ItemDetails;
