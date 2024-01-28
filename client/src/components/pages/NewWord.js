import "../../utilities.css";


import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";

export default function NewWord() {
  const [language, setLanguage] = React.useState("");
  const [defnLanguage, setDefnLanguage] = React.useState("");

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleDefnChange = (event) => {
    setDefnLanguage(event.target.value);
  };

  const categories = [
    "science",
    "sports",
    "business",
    "politics",
    "entertainment",
    "technology",
    "world",
    "all"
  ];

  const handleSubmit = console.log("woof");
  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Define a word
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Word
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="word"
                name="word"
                label="Word"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Definition
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                id="outlined-multiline-static"
                label="Definition"
                required
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Example
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                id="example"
                name="example"
                label="Example"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3.5}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Word language
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={8.5}>
              <FormControl  required fullWidth size="small">
                <InputLabel requred id="word_language">Language</InputLabel>
                <Select
                  labelId="word_language"
                  id="word_language"
                  value={language}
                  label="Language"
                  onChange={handleChange}
                >
                  {categories.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3.5}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Definition language
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={8.5}>
              <FormControl fullWidth required size="small">
                <InputLabel required id="definition_language">Language</InputLabel>
                <Select
                  labelId="definition_language"
                  id="definition_language"
                  value={defnLanguage}
                  label="Language"
                  onChange={handleDefnChange}
                >
                  {categories.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                IPA
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="ipa"
                name="ipa"
                label="IPA"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Word type
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="word_type"
                name="word_type"
                label="Word type (noun, verb, etc.)"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained" sx={{ color: "#ff781f" }} onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}


// const NewWord = () => {
//   return (
//     <div>
//       <h1>new word</h1>
//     </div>
//   );
// };

// export default NewWord;
