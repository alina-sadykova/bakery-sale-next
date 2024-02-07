"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface TableToolbarProps<T> {
  selected: T[];
  onCreate: () => void;
  onDelete: (selectedRows: T[]) => void;
  onEdit: (selectedRow: T) => void;
  tableName: string;
}

export default function TableToolbar<T>(props: TableToolbarProps<T>) {
  const { selected, onCreate, onDelete, onEdit, tableName } = props;
  const numSelected = selected.length;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableName}
        </Typography>
      )}
      {numSelected > 0 && numSelected < 2 ? (
        <>
          <Tooltip title="Delete Selected Car">
            <IconButton onClick={() => onDelete(selected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Selected Car">
            <IconButton onClick={() => onEdit(selected[0])}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : numSelected > 1 ? (
        <Tooltip title="Delete All Selected Cars">
          <IconButton onClick={() => onDelete(selected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Create new">
          <IconButton onClick={onCreate}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
