import s3APIs from "@/api/s3";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { useAppDispatch } from "@/lib/hooks";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { User, Document } from "@/typings/types";
import Typography from "@mui/material/Typography";
import SwitchButton from "../button/SwitchButton";
import { UsersTableColumns } from "@/utils/Constants";
import { activateUser } from "@/lib/features/userSlice";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }): JSX.Element => {
  const appDispatch = useAppDispatch();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPage(0);
    setRowsPerPage(+event.target.value);
  };

  const handleOnChange = (id: string, isChecked: boolean): void => {
    if (isChecked) {
      appDispatch(activateUser({ id: id }));
    }
  };

  const renderDocuments = (documents: Document[]): JSX.Element => {
    if (documents.length === 0) {
      return (
        <Typography variant="body2" color="textSecondary">
          Keine Dokumente vorhanden
        </Typography>
      );
    } else {
      return (
        <>
          {documents.map((doc, index) => (
            <Typography
              key={doc.key}
              sx={styles.docName}
              onClick={() => handleDownloadDocument(doc.key, doc.name, index)}
            >
              {doc.name}
              {index === selectedIndex && isDownloading && (
                <CircularProgress
                  size={20}
                  color="primary"
                  style={{ marginTop: "5px", marginLeft: "1rem" }}
                />
              )}
              {index !== documents.length - 1 && ", "}
            </Typography>
          ))}
        </>
      );
    }
  };

  const handleDownloadDocument = async (
    fileKey: string,
    fileName: string,
    selectedDocIndex: number
  ): Promise<void> => {
    setIsDownloading(true);
    setSelectedIndex(selectedDocIndex);

    let fileDetails = await s3APIs.getFile(fileKey);

    const url = window.URL.createObjectURL(
      new Blob([fileDetails.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);

    link.click();

    setIsDownloading(false);
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
                  sx={[styles.tableHeadCell, { minWidth: column.minWidth }]}
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
                    {user.company.business?.registrationNumber}
                  </TableCell>
                  <TableCell align="left">
                    {user.company.business?.documents ? (
                      <>{renderDocuments(user.company.business?.documents)}</>
                    ) : (
                      "Keine Dokumente vorhanden"
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {user.qualificationDocuments ? (
                      <>{renderDocuments(user.qualificationDocuments)}</>
                    ) : (
                      "Keine Dokumente vorhanden"
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <SwitchButton
                      color="success"
                      userId={user.id}
                      checked={user.isActive}
                      onChange={handleOnChange}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {users.length > rowsPerPage && (
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
    fontWeight: "bold",
  },
  docName: {
    color: "#1976d2",
    "&:hover": {
      cursor: "pointer",
    },
  },
};
