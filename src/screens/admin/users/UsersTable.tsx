import { useState } from "react";
import { User } from "./types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import { Box, Grid, Tooltip } from "@mui/material";
import { UsersTableColumns } from "@/utils/Constants";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { USER_ROLE, USER_ROLE_IN_GERMAN } from "@/utils/enums";
import UpdateUserIsActiveStatusButton from "./UpdateUserIsActiveStatusButton";
import DocumentList from "@/screens/real-estate-owner/buildings/building-overview/DocumentList";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }): JSX.Element => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPage(0);
    setRowsPerPage(+event.target.value);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <Box sx={{ overflowX: "auto" }}>
        <TableContainer sx={styles.tableContainer}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {UsersTableColumns.map((column) => (
                  <TableCell
                    align="left"
                    key={column.id}
                    sx={styles.tableHeadCell}
                  >
                    <Tooltip title={column.label}>
                      <Typography
                        variant="body2"
                        component="div"
                        noWrap
                        fontWeight={600}
                      >
                        {column.label}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow hover tabIndex={-1} key={user.id}>
                    <TableCell align="left">{user.firstName}</TableCell>
                    <TableCell align="left">{user.lastName}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.company.name}</TableCell>
                    <TableCell align="left">
                      {user.company.phonenumber}
                    </TableCell>
                    <TableCell align="left">
                      {`${user.company.address.street} ${user.company.address.houseNo}, ${user.company.address.zip} ${user.company.address.city}, ${user.company.address.state}, ${user.company.address.country}`}
                    </TableCell>
                    <TableCell align="left">
                      {user.company.business?.businessType}
                    </TableCell>
                    <TableCell align="left">
                      {user.role === USER_ROLE.SERVICE_PROVIDER
                        ? USER_ROLE_IN_GERMAN.SERVICE_PROVIDER
                        : USER_ROLE_IN_GERMAN.REAL_ESTATE_OWNER}
                    </TableCell>
                    <TableCell align="left">
                      {user.company.business?.registrationNumber}
                    </TableCell>
                    <TableCell align="left">
                      {user.company.business?.documents &&
                      user.company.business?.documents.length > 0 ? (
                        <DocumentList
                          documents={user.company.business?.documents}
                        />
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          Keine Dokumente vorhanden
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {user.qualificationDocuments &&
                      user.qualificationDocuments.length > 0 ? (
                        <Grid sx={styles.documentDataCell}>
                          <DocumentList
                            documents={user.qualificationDocuments}
                          />
                        </Grid>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          Keine Dokumente vorhanden
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <UpdateUserIsActiveStatusButton
                        color="success"
                        userId={user.id}
                        checked={user.isActive}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {users?.length > rowsPerPage && (
          <TablePagination
            page={page}
            component="div"
            count={users?.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[10, 25, 100]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </Paper>
  );
};

export default UsersTable;

const styles = {
  tableContainer: {
    maxHeight: 440,
    overflow: "auto",
  },
  tableHeadCell: {
    top: 57,
    minWidth: "auto",
    fontWeight: "bold",
    maxWidth: 150,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "&:hover": {
      cursor: "pointer",
    },
  },
  documentDataCell: {
    display: "flex",
    maxWidth: "8rem",
    flexDirection: "column",
  },
};
