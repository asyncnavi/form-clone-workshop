import { CloseOutlined, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { nanoid } from "nanoid";
import Header from "./header";
import { Field, FieldType } from "../../types";
import { saveForm } from "../../services";
import useUser from "../../hooks/userUser";

const FormPage = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [title, setTitle] = useState<string>("Untitled Form");
  const [description, setDescription] = useState<string>("");

  const addField = (event: SelectChangeEvent) => {
    const value = event.target.value as FieldType;
    const newField: Field = {
      id: nanoid(),
      type: value,
      label: "Untitled Question",
      options:
        value === "dropdown" || value === "multiple_choice"
          ? ["Option 1"]
          : undefined,
    };

    setFields((prev) => [...prev, newField]);

    setSelectedType("");
  };

  const handleLabelChange = (id: string, value: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, label: value } : field
      )
    );
  };

  const handleOptionChange = (
    fieldId: string,
    index: number,
    value: string
  ) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId && field.options
          ? {
              ...field,
              options: field.options.map((opt, i) =>
                i === index ? value : opt
              ),
            }
          : field
      )
    );
  };

  const addOption = (id: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id && field.options
          ? {
              ...field,
              options: [...field.options, `Option ${field.options.length + 1}`],
            }
          : field
      )
    );
  };

  const removeOption = (fieldId: string, optionIndex: number) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId && field.options
          ? {
              ...field,
              options: field.options.filter((_, i) => i !== optionIndex),
            }
          : field
      )
    );
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const { user } = useUser();
  const submitForm = () => {
    console.log({
      user_id: user?.uid,
      fields: fields,
      allowed_users: [],
      is_private: false,
      published: true,
      title: title,
      description: description,
    });
    if (user?.uid) {
      saveForm({
        user_id: user.uid,
        fields: fields,
        allowed_users: [],
        is_private: false,
        published: true,
        title: title,
        description: description,
      });
    }
  };

  const theme = useTheme();
  return (
    <div>
      <Header
        form={{
          id: "dlfkasdlfakslf",
          title: title,
          description: description,
          fields: fields,
        }}
        onPublish={submitForm}
      />
      <Box sx={{ backgroundColor: theme.palette.grey[100], py: 10 }}>
        <Container>
          <Paper
            sx={{
              padding: 4,
              borderTop: `8px solid ${theme.palette.grey[400]}`,
            }}
          >
            <TextField
              margin="normal"
              size="medium"
              variant="standard"
              fullWidth
              onChange={(e) => setTitle(e.target.value as string)}
              value={title}
            />
            <TextField
              margin="dense"
              label="Form Descirpition"
              variant="standard"
              fullWidth
              multiline
              onChange={(e) => setDescription(e.target.value as string)}
              value={description}
              maxRows={4}
            />
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Select
              value={selectedType}
              onChange={addField}
              displayEmpty
              sx={{ my: 2 }}
            >
              <MenuItem value="" disabled>
                Select Field Type
              </MenuItem>
              <MenuItem value="text">Text Field</MenuItem>
              <MenuItem value="checkbox">Checkbox</MenuItem>
              <MenuItem value="dropdown">Dropdown</MenuItem>
              <MenuItem value="multiple_choice">Multiple Choice</MenuItem>
            </Select>
          </Box>

          {/* Form Fields */}
          {fields.length === 0 ? (
            <Typography>No Form Fields Added</Typography>
          ) : (
            fields.map((field) => (
              <>
                <Paper
                  key={field.id}
                  sx={{ my: 2, p: 2, borderLeft: "8px solid blue" }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ my: 4 }}
                  >
                    <TextField
                      variant="filled"
                      placeholder={field.label}
                      onChange={(e) =>
                        handleLabelChange(field.id, e.target.value)
                      }
                      fullWidth
                    />
                    <IconButton
                      onClick={() => removeField(field.id)}
                      color="error"
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Stack>
                  {field.type === "text" && (
                    <TextField
                      variant="standard"
                      value="Answer text"
                      disabled
                      margin="normal"
                    />
                  )}
                  {field.type === "checkbox" && (
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label={field.label}
                    />
                  )}
                  {(field.type === "dropdown" ||
                    field.type === "multiple_choice") && (
                    <>
                      {field?.options?.map((option, index) => {
                        return (
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            {field.type === "dropdown" ? (
                              <Radio disabled />
                            ) : (
                              <Checkbox disabled />
                            )}
                            <TextField
                              variant="standard"
                              placeholder={option}
                              value={option}
                              size="small"
                              margin="normal"
                              onChange={(e) =>
                                handleOptionChange(
                                  field.id,
                                  index,
                                  e.target.value
                                )
                              }
                              fullWidth
                            />
                            <IconButton
                              onClick={() => removeOption(field.id, index)}
                              color="error"
                            >
                              <CloseOutlined />
                            </IconButton>
                          </Stack>
                        );
                      })}

                      <Stack direction="row" spacing={2} alignItems="center">
                        {field.type === "dropdown" ? (
                          <Radio disabled />
                        ) : (
                          <Checkbox disabled />
                        )}
                        <Button
                          sx={{ textTransform: "capitalize" }}
                          variant="text"
                          onClick={() => addOption(field.id)}
                        >
                          Add Option
                        </Button>
                      </Stack>
                    </>
                  )}
                </Paper>
              </>
            ))
          )}
        </Container>
      </Box>
    </div>
  );
};

export default FormPage;
