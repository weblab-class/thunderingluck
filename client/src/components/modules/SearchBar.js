import React, {useState, useEffect} from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from "@mui/material/Autocomplete";

import "./SearchBar.css";
import { get } from "../../utilities";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  float:"left",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  // marginBottom: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(5),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



const SearchBar = (props) => {
  const [languages, setLanguages] = useState([]);
  const setQuery = props.setQuery;
  const [defnLanguages, setDefnLanguages] = useState([]);

  useEffect(() => {
    get("/api/languages").then((languages) => {
      setLanguages(languages);
    });
  }, []);

  const [word, setWord] = useState("");
  const handleWordChange = (event) => {
    setWord(event.target.value);
  }

  const [language, setLanguage] = useState("");
  // const handleLanguageChange = (event) => {
  //   setLanguage(event.target.value);
  // }

  const [defnLanguage, setDefnLanguage] = useState("");
  // const handleDefnLanguageChange = (event) => {
  //   setDefnLanguage(event.target.value);
  // }

  const handleSearch = (word, language, defnLanguage, setQuery) => {
    setQuery({
      word: word,
      language: language,
      definition_language: defnLanguage,
    });
    // get("/api/definitions", query).then((definitions) => {
    //   console.log(definitions);
    // });
  }
  return (
  <div display="inline-block" className="center">
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleWordChange}
        autoComplete="on"
      />
    </Search>
    <div style={{display:"inline-block", float:"left"}}>
      <i>
        for a
      </i>
    </div>
    <Search style={{width:"140px", display:"inline-block", border:0}}>
        <Autocomplete
        sx={{
          pt: "1px",
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "none"
            }
        }}
          disablePortal
          size="small"
          displayEmpty
          inputValue = {language}
          onInputChange={(event, newInputValue) => {
            setLanguage(newInputValue);
            console.log(language)
            setDefnLanguages(languages.filter((item)=>(item.name==language))[0])
          }
        }
          options={languages.map((language) => language.name)}
          renderInput={(params) => <TextField {...params}  />}
        >
        </Autocomplete>
    </Search>
    <div style={{display:"inline-block", float:"left"}}>
      <i>
        word in
      </i>
    </div>
    {/* <Search>
      <StyledInputBase
        placeholder="language"
        inputProps={{ 'aria-label': 'search' }}
        onChange = {handleDefnLanguageChange}
      />
    </Search> */}
    <Search style={{width:"140px", display:"inline-block", border:0}}>
        <Autocomplete
        sx={{
          pt: "1px",
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "none"
            }
        }}
          disablePortal
          size="small"
          displayEmpty
          // inputValue = {defnLanguage}
          onInputChange={(event, newInputValue) => {
            setDefnLanguage(newInputValue);
          }}
          onChange = {(event, newValue) => {
            setDefnLanguage(newValue);
        }}
        
          options={languages.filter((item) => item.name == language).map((item) => item.definition_languages)}
          freeSolo = {language === "" ? true: false}
          renderInput={(params) => <TextField {...params}  />}
        >
        </Autocomplete>
    </Search>
    <Button variant="contained" 
      sx={{ color: "#ff781f" }} 
      onClick={() => handleSearch(word, language, defnLanguage, setQuery)}
      >
        Go
    </Button>
  </div>
  );
};

export default SearchBar;