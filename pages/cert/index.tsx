import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Imp from "../Imp";
import axios from "axios";

interface RSP {
  error_code: string;
  error_msg: string;
  imp_uid: string;
  merchant_uid: string;
  pg_provider: string;
  pg_type: string;
  success: boolean;
}

const Register = () => {
  const theme = createTheme();

  function handleSubmit(e: any) {
    e.preventDefault();

    const data = {
      merchant_uid: e.target.merchant_uid.value,
      name: e.target.name.value,
      phone: e.target.phone.value,
    };

    window.IMP.init("imp10391932");
    window.IMP.certification(data, (rsp: RSP) => {
      console.log("anyway", rsp);
      // callback
      if (rsp.success) {
        // 인증 성공 시 로직, 서버로의 요청
        console.log("success", rsp.imp_uid);
        axios
          .post("/api/cert", {
            imp_uid: rsp.imp_uid,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log("@@@@@@@@@", err));
      } else {
        // 인증 실패 시 로직,
        console.log("failure");
      }
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Imp />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            인증
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="text"
                    id="merchant_uid"
                    name="merchant_uid"
                    label="merchant_uid"
                    value={`min_${new Date().getTime()}`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="name"
                    name="name"
                    label="name"
                    value="김성현"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="phone"
                    name="phone"
                    label="phone"
                    value="01033510617"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                인증
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Register;
