import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, FormControlLabel, Checkbox, Select, MenuItem, TextField, FormControl, InputLabel, Stack, Paper } from "@mui/material";
import { Form } from "../../types";

const PreviewModal = ({ open, onClose, form }: { open: boolean; onClose: () => void; form: Form }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {form.title} (Preview)
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          {form.fields.map((field) => (
            <Paper key={field.id} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>{field.label}</Typography>
              {field.type === "text" && <TextField fullWidth variant="outlined" placeholder="Your answer" />}
              {field.type === "checkbox" && <FormControlLabel control={<Checkbox />} label={field.label} />}
              {field.type === "dropdown" && (
                <FormControl fullWidth>
                  <InputLabel>{field.label}</InputLabel>
                  <Select>{field.options?.map((option, index) => <MenuItem key={index} value={option}>{option}</MenuItem>)}</Select>
                </FormControl>
              )}
            </Paper>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
