"use client";
import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material";
import contractAPI from "@/api/contract";
import { useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/feedback/snackbar";
import GEmptyState from "@/components/data-display/GEmptyState";
import ApplicationsTable from "./ApplicationsTable";
import WithdrawApplicationDialog from "./WithdrawApplicationDialog";
import { FILTER_LABELS } from "./constants";
import { countByFilter, filterApplications } from "./utils";
import { ApplicationFilter, ApplicationSort, MyApplication } from "./types";

const FILTERS = Object.keys(FILTER_LABELS) as ApplicationFilter[];

const ApplicationsOverview = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [applications, setApplications] = useState<MyApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ApplicationFilter>("ALL");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<ApplicationSort>("DATE");
  const [toWithdraw, setToWithdraw] = useState<MyApplication | null>(null);
  const [withdrawing, setWithdrawing] = useState(false);

  useEffect(() => {
    const loadApplications = async (): Promise<void> => {
      try {
        const { data } = await contractAPI.getMyApplications();
        setApplications(data);
      } catch {
        dispatch(
          showSnackbar({
            type: "error",
            message:
              "Etwas ist schiefgelaufen. Versuchen Sie es später noch einmal!",
          })
        );
      } finally {
        setLoading(false);
      }
    };
    loadApplications();
  }, [dispatch]);

  const visible = useMemo(
    () => filterApplications(applications, filter, query, sort),
    [applications, filter, query, sort]
  );

  const handleWithdraw = async (): Promise<void> => {
    if (!toWithdraw) return;
    setWithdrawing(true);
    try {
      await contractAPI.withdrawApplication(toWithdraw.tenderId, toWithdraw.id);
      setApplications((current) =>
        current.filter(({ id }) => id !== toWithdraw.id)
      );
      dispatch(
        showSnackbar({
          type: "success",
          message: "Ihre Bewerbung wurde zurückgezogen.",
        })
      );
    } catch {
      dispatch(
        showSnackbar({
          type: "error",
          message:
            "Die Bewerbung konnte nicht zurückgezogen werden. Versuchen Sie es später noch einmal!",
        })
      );
    } finally {
      setWithdrawing(false);
      setToWithdraw(null);
    }
  };

  if (loading) {
    return (
      <Box sx={centerStyles}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={pageStyles}>
      <Typography variant="h4" component="h1">
        Meine Bewerbungen
      </Typography>
      <Typography sx={subtitleStyles}>
        Alle Ausschreibungen, auf die Sie sich beworben haben, im Überblick.
      </Typography>

      <Box sx={statsStyles}>
        {FILTERS.map((key) => (
          <Paper
            key={key}
            role="button"
            onClick={() => setFilter(key)}
            sx={{ ...statStyles, ...(filter === key && activeStatStyles) }}
          >
            <Typography sx={statCountStyles}>
              {countByFilter(applications, key)}
            </Typography>
            <Typography sx={subtitleStyles}>{FILTER_LABELS[key]}</Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={toolbarStyles}>
        <TextField
          fullWidth
          size="small"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Suche nach Titel, Gebäude oder Ort …"
        />
        <TextField
          select
          size="small"
          value={sort}
          sx={sortStyles}
          onChange={(event) => setSort(event.target.value as ApplicationSort)}
        >
          <MenuItem value="DATE">Neueste zuerst</MenuItem>
          <MenuItem value="PRICE">Preis (hoch → niedrig)</MenuItem>
        </TextField>
      </Box>

      {visible.length === 0 ? (
        <GEmptyState
          text="Keine Bewerbungen gefunden"
          description={
            applications.length === 0
              ? "Sie haben sich noch auf keine Ausschreibung beworben."
              : "Keine Bewerbung entspricht den gewählten Kriterien."
          }
        />
      ) : (
        <ApplicationsTable applications={visible} onWithdraw={setToWithdraw} />
      )}
      <WithdrawApplicationDialog
        application={toWithdraw}
        loading={withdrawing}
        onConfirm={handleWithdraw}
        onClose={() => setToWithdraw(null)}
      />
    </Box>
  );
};

export default ApplicationsOverview;

const pageStyles: SxProps = { p: { xs: 2, md: 4 }, maxWidth: 1200 };

const centerStyles: SxProps = {
  display: "grid",
  placeItems: "center",
  minHeight: "50vh",
};

const subtitleStyles: SxProps = { color: "#5B6B70", fontSize: "0.875rem" };

const statsStyles: SxProps = {
  display: "grid",
  gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
  gap: 2,
  my: 3,
};

const statStyles = {
  p: 2,
  cursor: "pointer",
  boxShadow: "none",
  border: "1px solid #E2E7E9",
  borderRadius: "12px",
};

const activeStatStyles = {
  borderColor: "#1478B4",
  boxShadow: "0 0 0 1px #1478B4",
};

const statCountStyles: SxProps = { fontSize: "1.625rem", fontWeight: 600 };

const toolbarStyles: SxProps = { display: "flex", gap: 1.5, mb: 2 };

const sortStyles: SxProps = { minWidth: 220 };
