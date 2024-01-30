import React, {useState} from "react";
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

import "./SearchBar.css";
import { set } from "core-js/core/dict";

const Search = styled('div')(({ theme }) => ({

  position: 'relative',
  display: 'inline-block',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
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


const SearchBar = () => {
  [languages, setLanguages] = useState([]);
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
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  }

  const [defnLanguage, setDefnLanguage] = useState("");
  const handleDefnLanguageChange = (event) => {
    setDefnLanguage(event.target.value);
  }

  return (
  <div display="flex" className="center">
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
    <div style={{display:"inline-block"}}>
      <i>
        for a
      </i>
    </div>
    <Search>
      <FormControl sx={{ m: 0, minWidth: 120 }}>
          <Select
            value={language}
            onChange={handleLanguageChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Language' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Search>

  </div>
  );
};

export default SearchBar;
