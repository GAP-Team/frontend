import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const PhoneInput = (): JSX.Element  => {

return (<Grid item xs={12}>
<Typography variant="gsub" color="gray.500">
  Telefonnummer
</Typography>
<TextField
  InputProps={{ sx: { borderRadius: "0.5rem" } }}
  id="phone"
  name="phone"
  placeholder="Geben Sie Ihre Telefonnummer ein"
  fullWidth
  variant="outlined"
  autoComplete="phone"
/>
</Grid>)

};

export default PhoneInput;