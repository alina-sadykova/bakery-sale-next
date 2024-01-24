"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import MUITable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableToolbar from "./TableToolbar";
import TableHead from "./TableHead";
import { Paper } from "@mui/material";
import { getComparator } from "./helper";
import { HeadCell, Order } from "./types";

interface TableProps<T> {
  rows: T[];
  headCells: HeadCell<T>[];
  loading: boolean;
  emptyMessage: string;
  onCreate: () => void;
  tableName: string;
}

export default function Table<T extends { id: string }>({
  rows,
  headCells,
  loading,
  emptyMessage,
  onCreate,
  tableName,
}: TableProps<T>) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T>(headCells[0].id);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const filteredSelected = selected.filter((selectedId) => selectedId !== id);

    //find: return first element which meets the condition.
    //filter: return new array, return length less or equal elements that met condition.
    //map: return mutated array, length of which equal to original array but with new elements.

    if (filteredSelected.length < selected.length) {
      setSelected(filteredSelected);
    } else {
      setSelected(filteredSelected.concat(id));
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    // to cache
    () =>
      rows
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(
          page * rowsPerPage, //0 X 5 = 0 , 1 X 5 = 5
          page * rowsPerPage + rowsPerPage // 0 X 5 + 5 = 5 ,10
        ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableToolbar
          numSelected={selected.length}
          onCreate={onCreate}
          tableName={tableName}
        />
        <TableContainer>
          <MUITable
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {loading ? (
                // <Loading />
                <h1>Loading...</h1>
              ) : (
                visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>

                      {headCells.map((headCell, index) =>
                        index === 0 ? (
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row[headCell.id] as string}
                          </TableCell>
                        ) : (
                          <TableCell
                            align={headCell.numeric ? "right" : "left"}
                          >
                            {row[headCell.id] as string}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  );
                })
              )}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MUITable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
