import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { ROUTES } from "@/utils/routes";
import { MyApplication } from "./types";
import ApplicationStatusChip from "./ApplicationStatusChip";
import { formatLocation, formatPrice, formatSuggestedDate } from "./utils";

interface ApplicationsTableProps {
  applications: MyApplication[];
  onWithdraw: (application: MyApplication) => void;
}

const HEADERS = [
  "Ausschreibung",
  "Ort",
  "Mein Angebot",
  "Vorgeschlagener Termin",
  "Beworben am",
  "Status",
  "",
];

const SuggestedDates: React.FC<{ application: MyApplication }> = ({
  application,
}) => {
  const [first, ...rest] = application.suggestionWorkDates;
  if (!first) return <>–</>;
  return (
    <>
      {formatSuggestedDate(first)}
      {rest.length > 0 && (
        <Typography component="span" sx={mutedStyles}>
          {` +${rest.length}`}
        </Typography>
      )}
    </>
  );
};

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  onWithdraw,
}) => {
  const router = useRouter();
  const openDetails = (tenderId: string): void =>
    router.push(
      ROUTES.SERVICE_PROVIDER.CONTRACT_DETAILS_FROM_APPLICATIONS(tenderId)
    );

  return (
    <TableContainer component={Paper} sx={containerStyles}>
      <Table>
        <TableHead>
          <TableRow>
            {HEADERS.map((header) => (
              <TableCell key={header} sx={headerCellStyles}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((application) => (
            <TableRow
              hover
              key={application.id}
              sx={rowStyles}
              onClick={() => openDetails(application.tenderId)}
            >
              <TableCell>
                <Box sx={titleStyles}>{application.facilityName}</Box>
                <Typography sx={mutedStyles}>
                  {application.subcategory ?? application.tenderType}
                  {` · ${application.buildingName}`}
                </Typography>
              </TableCell>
              <TableCell>{formatLocation(application)}</TableCell>
              <TableCell sx={priceStyles}>
                {formatPrice(application.serviceTotalPrice)}
              </TableCell>
              <TableCell>
                <SuggestedDates application={application} />
              </TableCell>
              <TableCell>
                {dayjs(application.appliedAt).format("DD.MM.YYYY")}
              </TableCell>
              <TableCell>
                <ApplicationStatusChip status={application.status} />
              </TableCell>
              <TableCell>
                <Box sx={actionsStyles}>
                  <Link component="span" underline="hover" sx={linkStyles}>
                    Ansehen
                  </Link>
                  {application.status === "PENDING" && (
                    <Link
                      component="button"
                      underline="hover"
                      sx={{ ...linkStyles, color: "#B42318" }}
                      onClick={(event) => {
                        event.stopPropagation();
                        onWithdraw(application);
                      }}
                    >
                      Zurückziehen
                    </Link>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicationsTable;

const containerStyles: SxProps = {
  border: "1px solid #E2E7E9",
  borderRadius: "12px",
  boxShadow: "none",
};

const headerCellStyles: SxProps = {
  bgcolor: "#F6F8F9",
  color: "#5B6B70",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const rowStyles: SxProps = { cursor: "pointer" };

const titleStyles: SxProps = { fontWeight: 600 };

const mutedStyles: SxProps = { color: "#5B6B70", fontSize: "0.8125rem" };

const priceStyles: SxProps = { fontWeight: 600, whiteSpace: "nowrap" };

const actionsStyles = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  whiteSpace: "nowrap",
};

const linkStyles: SxProps = { color: "#1478B4", fontSize: "0.8125rem" };
