import React from 'react';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import { fade } from '@material-ui/core/styles/colorManipulator';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        light: red[700],
        main: '#ffffff',
      },
      secondary: {
        main: red[700],
      },
      background: {
        paper: fade('#000000', 0.5),
      }
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
  });

const styles = theme => ({
    menuItem: {
        boxShadow: 'none',
        height: 'auto',
        background: 'transparent',
      },
      menu: {
        boxShadow: 'none',
        backgroundColor: fade(darkTheme.palette.common.black, 0.5),
      },
});

class MenuButton extends React.Component {
  state = {
    anchorEl: null
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const Wrapper = this.props.iconType;
    const listItems = this.props.items.map((link) =>
      <MenuItem onClick={this.handleClose} key={link.toString()} className={classes.menuItem}>{link}</MenuItem>
    );



    return (
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          {<Wrapper />}
        </IconButton>
        <Menu
          color="secondary"
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
         {listItems}


        </Menu>
      </div>
      </ThemeProvider>
    );
  }

}

export default withStyles(styles, {withTheme: true})(MenuButton);