import { useState } from "react";
import { User } from "@/typings/types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import SwitchButton from "../button/SwitchButton";
import { UsersTableColumns } from "@/utils/Constants";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { USER_ROLE, USER_ROLE_IN_GERMAN } from "@/utils/enums";
import DocumentList from "@/screens/dashboard/buildings/building_card/DocumentList ";

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
                  {column.label}
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
                  <TableCell align="left">{user.company.name}</TableCell>
                  <TableCell align="left">{user.company.phonenumber}</TableCell>
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
                        title="Dokumente des Unternehmens"
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
                      <DocumentList
                        title="Qualifikationsdokumente"
                        documents={user.qualificationDocuments}
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Keine Dokumente vorhanden
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <SwitchButton
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
  },
  docName: {
    color: "#1976d2",
    "&:hover": {
      cursor: "pointer",
    },
  },
};
