// import React from "react";
//
// function ProviderHistory(props) {
//   return <div>Provider historical services ...</div>;
// }
//
// export default ProviderHistory;
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Grid, lighten, withStyles } from "@material-ui/core";

const columns = [
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "name", label: "Name", minWidth: 100, align: "center" },
  {
    id: "bookingID",
    label: "Booking ID",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "location",
    label: "Location",
    minWidth: 100,
    align: "center",
  },
  {
    id: "service",
    label: "Service",
    minWidth: 100,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },

  {
    id: "earning",
    label: "Earning",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const TableTitleCell = withStyles((theme) => ({
  head: {
    backgroundColor: lighten(theme.palette.primary.light, 0.3),
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  body: {},
}))(TableCell);

function createData(date, name, bookingID, location, service, status, earning) {
  return { date, name, bookingID, location, service, status, earning };
}

const rows = [
  createData(
    "06/16/2021",
    "Kilgore",
    "011192",
    "Vancouver",
    "Hair cut",
    "Paid",
    "$50"
  ),
  createData(
    "06/16/2021",
    "Jessie Santos",
    "04468",
    "Burnaby",
    "Hair style",
    "cancelled",
    "$0"
  ),
  createData(
    "06/16/2021",
    "Jessie Santos",
    "04468",
    "Burnaby",
    "Hair style",
    "cancelled",
    "$0"
  ),
  createData(
    "06/16/2021",
    "Kilgore",
    "011192",
    "Vancouver",
    "Hair cut",
    "Paid",
    "$50"
  ),
  createData(
    "06/16/2021",
    "Jessie Santos",
    "04468",
    "Burnaby",
    "Hair style",
    "cancelled",
    "$0"
  ),

  createData(
    "06/16/2021",
    "Kilgore",
    "011192",
    "Vancouver",
    "Hair cut",
    "Paid",
    "$50"
  ),
  createData(
    "06/16/2021",
    "Jessie Santos",
    "04468",
    "Burnaby",
    "Hair style",
    "cancelled",
    "$0"
  ),
  createData(
    "06/16/2021",
    "Jessie Santos",
    "04468",
    "Burnaby",
    "Hair style",
    "cancelled",
    "$0"
  ),
  createData(
    "06/16/2021",
    "Kilgore",
    "011192",
    "Vancouver",
    "Hair cut",
    "Paid",
    "$50"
  ),
  createData(
    "06/16/2021",
    "Jessie Santos",
    "04468",
    "Burnaby",
    "Hair style",
    "cancelled",
    "$0"
  ),
  createData(
    "06/16/2021",
    "Kilgore",
    "011192",
    "Vancouver",
    "Hair cut",
    "Paid",
    "$50"
  ),
  createData(
    "06/16/2021",
    "Jessie Santos",
    "04468",
    "Burnaby",
    "Hair style",
    "cancelled",
    "$0"
  ),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={11}>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableTitleCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableTitleCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
