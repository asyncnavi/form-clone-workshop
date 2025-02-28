import { DynamicFormOutlined, Google } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useUser from "../hooks/userUser";
import { logout, signInWithGoogle } from "../firebase/config";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const { user } = useUser();

  console.log(user)

  return (
    <AppBar position="sticky" variant="outlined" color="inherit">
      <Container>
        <Toolbar>
          <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
            <DynamicFormOutlined />
            <Typography fontWeight="bold">FORMS</Typography>
          </Box>
          <Box sx={{ marginLeft: "auto" }}>
            {!user ? (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Google />}
                sx={{ textTransform: "capitalize" }}
                onClick={() => signInWithGoogle()}
              >
                Login with Google
              </Button>
            ) : (
              <>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ marginLeft: "auto" }}
                >
                  <Avatar alt="User Photo" src={user.photoURL as string}></Avatar>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>{user.email}</MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
