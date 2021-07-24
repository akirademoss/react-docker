//Basic imports
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from '@material-ui/icons/Search';
import { ThemeProvider } from "@material-ui/styles";
import InputBase from '@material-ui/core/InputBase';

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

//router and page imports
import history from '../history';

// CSS styling
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: red[700],
    },
    secondary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: [
      'sans-serif',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  button: {
    textTransform: 'none',
  },
  MuiAppBar: {
    color: 'secondary',
  }  
});

const styles = darkTheme => ({
  //Part of Top Nav Bar  
  navBar: {
    boxShadow: 'none',
    minHeight: 5,
    height: 'auto',
    backgroundColor: fade(darkTheme.palette.common.black, 0.5),
    
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
    display: 'flex',
    flexDirection: 'row',
  },
  homeButton: {
    marginRight: 0,
    marginLeft: -12,
    marginTop: 0,
    width: '100%', 
    background: 'transparent',
  },
  createAccountButton: {
    margin: darkTheme.spacing(0, 0, 0),
    width: 110,
  }, 
  searchAlign: {
    display: 'flex', 
    flexDirection: 'row', 
    alighnItems: 'center',
    width: '50%',
  },
  search: {
    position: 'relative',
    borderRadius: darkTheme.shape.borderRadius ,
    backgroundColor: fade(darkTheme.palette.common.black, 0.5),
    '&:hover': {
      backgroundColor: fade(darkTheme.palette.common.black, 0.05),
    },
    borderBottom: '1px solid white',
    borderTop: '1px solid white',
    borderLeft: '1px solid white',
    borderRight: '1px solid white',
    marginRight: darkTheme.spacing(2),
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    padding: darkTheme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: darkTheme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${darkTheme.spacing(4)}px)`,
    transition: darkTheme.transitions.create('width'),
    width: '100%',
    [darkTheme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [darkTheme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  text: {
    width: 290,
  },
  signInButton: {
    margin: darkTheme.spacing(3, 0, 0),
    width: 290,
  },

});

// Implementation 
class HomePublic extends React.Component {
  render(){
  const { classes } = this.props;
  return (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div>
    <AppBar position="static" className={classes.navBar}>
      <Toolbar>
        <div className={classes.homeButton}>
          <img src={process.env.PUBLIC_URL + '/static/images/logox6-200.png'}/>
        </div>
	<section className={classes.searchAlign}>
	<div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
        </div>
        </section>
        <section className={classes.rightToolbar}>
            <Button
              color="primary"
              type="submit"
              variant="contained" 
              onClick={() => history.push('/SignIn')}
              className={classes.createAccountButton}
            >
              Sign In
            </Button>
        </section>
      </Toolbar>
    </AppBar> 
          </div> 
    </ThemeProvider>
    

  );
  }
}

export default withStyles(styles, {withTheme: true})(HomePublic);
