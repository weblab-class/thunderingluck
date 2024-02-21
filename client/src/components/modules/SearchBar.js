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

  const [searchField, setSearchField] = useState("");


  const handleSearch = (word, language, searchField, setQuery) => {
    if (searchField === "dictionary entry"){
      setQuery({
        word: word,
        language: language,
      });
    }
    else if (searchField === "definition"){
      setQuery({
        language: language,
        definition: word,
      });
    }
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
      />
    </Search>
    <div style={{display:"inline-block", float:"left"}}>
      <i>
        for a
      </i>
    </div>
    <Search style={{width:"180px", display:"inline-block", border:0}}>
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
                get("/api/defnLanguages", { content: newInputValue }).then((language) => {
                  if (language[0]) {
                    setDefnLanguages(language[0].definition_languages);
                  }
              // setDefnLanguages(languages.filter((item)=>(item.name==language))[0].definition_languages)
            })
          }
        }
          options={languages.map((language) => language.name)}
          renderInput={(params) => <TextField {...params} placeholder="word language" />}
        >
        </Autocomplete>
    </Search>
    <div style={{display:"inline-block", float:"left"}}>
      <i>
        word by
      </i>
    </div>
    {/* <Search>
      <StyledInputBase
        placeholder="language"
        inputProps={{ 'aria-label': 'search' }}
        onChange = {handleDefnLanguageChange}
      />
    </Search> */}
    <Search style={{width:"180px", display:"inline-block", border:0}}>
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
          onInputChange={(event, newInputValue) => {
            setSearchField(newInputValue);
          }}
          onChange = {(event, newValue) => {
            setSearchField(newValue);
        }}
        
          // options={languages.filter((item) => item.name == language).map((item) => item.definition_languages)}
          options={["dictionary entry", "definition"]}
          // freeSolo = {language === "" ? true: false}
          renderInput={(params) => <TextField {...params} placeholder="Search field"/>}
        >
        </Autocomplete>
    </Search>
    <Button variant="contained" 
      sx={{ color: "#ff781f" }} 
      onClick={() => handleSearch(word, language, searchField, setQuery)}
      >
        Go
    </Button>
  </div>
  );
};

export default SearchBar;