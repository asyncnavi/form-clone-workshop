import {
  AddLink,
  ArrowBack,
  PersonAddAlt1Outlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import PreviewModal from "./preview";
import { Form } from "../../types";
import { useNavigate } from "react-router";

const Header = ({
  onPublish,
  form,
}: {
  onPublish: () => void;
  form: Form;
}) => {
  const [openPreview, setOpenPreview] = useState(false);
  const navigate = useNavigate()

  return (
    <AppBar color="inherit" variant="outlined">
      <Container>
        <Toolbar>
          <IconButton onClick={()=> navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography fontSize={24}>{form.title}</Typography>
          <Stack direction="row" gap={2} sx={{ marginLeft: "auto" }}>
            <IconButton onClick={() => setOpenPreview(true)}>
              <VisibilityOutlined />
            </IconButton>
            <IconButton>
              <AddLink />
            </IconButton>
            <IconButton>
              <PersonAddAlt1Outlined />
            </IconButton>
            <Button onClick={onPublish} color="secondary" variant="contained">
              Publish
            </Button>
          </Stack>
        </Toolbar>
        <PreviewModal open={openPreview} onClose={() => setOpenPreview(false)} form={form} />
      </Container>
    </AppBar>
  );
};

export default Header;
