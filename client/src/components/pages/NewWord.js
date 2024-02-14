import "../../utilities.css";


import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { post, get } from "../../utilities";


const handleSubmit = (w, d, e, wT, i, l, dL) => {
  const body = {
    word: w,
    definition: d,
    example: e,
    word_type: wT,
    ipa: i,
    language: l,
    definition_language: dL,
  };
  post("/api/definition", body).then(() => {
    // redirect to home page
    window.location.assign("../");
  });
}



export default function NewWord() {
  const categories = [
    "MITspeak",
    "English",
  ];

  const [language, setLanguage] = useState("");
  const [defnLanguage, setDefnLanguage] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [wordType, setWordType] = useState("");
  const [ipa, setIpa] = useState("");
  const [languages, setLanguages] = useState([]);
  const [defnLanguages, setDefnLanguages] = useState([]);
  
  useEffect(() => {
    get("/api/whoami")
    get("/api/languages").then((languages) => {
      let languageNames = languages.map((language) => language.name);
      setLanguages(languageNames);
    });
  }, []);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    get("/api/defnLanguages", { content: event.target.value }).then((language) => {
      setDefnLanguages(language[0].definition_languages);
  })};

  const handleDefnLanguageChange = (event) => {
    setDefnLanguage(event.target.value);
  };
  const handleWordChange = (event) => {
    setWord(event.target.value);
  };
  const handleDefinitionChange = (event) => {
    setDefinition(event.target.value);
  }
  const handleExampleChange = (event) => {
    setExample(event.target.value);
  }
  const handleWordTypeChange = (event) => {
    setWordType(event.target.value);
  }
  const handleIpaChange = (event) => {
    setIpa(event.target.value);
  }



  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ marginRight: "10%", marginLeft: "15%" }}>
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
                onChange={handleWordChange}
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
                onChange={handleDefinitionChange}
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
                onChange={handleExampleChange}
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
                  onChange={handleLanguageChange}
                  
                >
                  {languages.map((item) => (
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
                  // onOpen
                  onChange={handleDefnLanguageChange}
                  freeSolo
                >
                  {defnLanguages.map((item) => (
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
                onChange={handleIpaChange}
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
                onChange={handleWordTypeChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained" 
              sx={{ color: "#ff781f" }} 
              onClick={() => handleSubmit(word, definition, example, wordType, ipa, language, defnLanguage)}
              >
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

