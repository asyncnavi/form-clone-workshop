import { AddOutlined } from "@mui/icons-material";
import { Box, Container, Typography, Paper } from "@mui/material";
import Header from "../shared/header";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Box
        sx={{
          p: 2,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.12)",
        }}
      >
        <Container>
          <Typography my={1} fontSize={24}>
            Start a new form
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: 200,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
              border: "1px solid rgba(0,0,0,0.48)",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/form")
            }}
          >
            <AddOutlined sx={{ fontSize: 48 }} />
            <Typography>Create New Form</Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
