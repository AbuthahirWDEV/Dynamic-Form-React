import React, { useState, useEffect } from "react";
import formFields from "./formFields.json";
import mockData from "./mockData.json";
import { TextField, Grid, Button, Box } from "@mui/material";
const ArrayTextFields = () => {
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Add state for editing
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isViewMode) {
      // Map mockData to form fields if in view mode
      setFormData(mockData);
    } else {
      // Initialize formData for a new form
      setFormData({});
    }
  }, [isViewMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error for the field being edited
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    let errors = {};
    formFields.forEach((field) => {
      const value = formData[field.name];

      // Required field validation
      if (field.required && !value) {
        errors[field.name] = field.helperText || "This field is required";
      }

      // Email validation
      if (field.name === "email" && value && !validateEmail(value)) {
        errors[field.name] = field.emailValidation || "Invalid email address";
      }

      setFormData({});
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      console.log(formData); // Handle successful form submission
    }
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <h1>Hello</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setIsViewMode(!isViewMode);
          if (isViewMode) {
            setIsEditing(false); // Reset editing state when switching to new form
          }
        }}
        sx={{ mb: 2 }}
      >
        {isViewMode ? "Switch to New Form" : "Switch to View Mode"}
      </Button>

      {isViewMode && !isEditing && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsEditing(true)}
          sx={{ mb: 2, ml: 2 }}
        >
          Edit
        </Button>
      )}

      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {formFields.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                variant="outlined"
                disabled={!isEditing && isViewMode} // Disable the field if not editing in view mode
                value={formData[field.name] || ""}
                onChange={(isEditing || !isViewMode) ? handleChange : undefined} // Allow changes only if editing
                error={!!formErrors[field.name]} // Show error if field has an error
                helperText={formErrors[field.name] || ""} // Show error message or default helper text
              />
            </Grid>
          ))}
          {(isEditing || !isViewMode) && (
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  );
};

export default ArrayTextFields;
