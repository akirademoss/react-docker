import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Hidden from '@material-ui/core/Hidden';

const darkTheme = createMuiTheme({
  overrides: {
      MuiMenu: {
          paper: {
              margin: 10,
              borderBottom: '1px solid grey',
              borderTop: '1px solid grey',
              borderLeft: '1px solid grey',
              borderRight: '1px solid grey',
              borderColor: fade('#ffffff', 0.5),
          }
      },       
  },
  palette: {
      type: 'dark',
      primary: {
          main: red[700],
      },
      secondary: {
          main: '#000000',
      },
      background: {
          paper: fade('#000000', 0.5),
          default: '#000000',
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
  MuiAppBar: {
      color: 'secondary',
  }
});


const styles = darkTheme => ({
followGrid: {
    alignItems: 'center',
    display: 'inline-flex',
    flexDirection: 'row',
    width: '100%',
},
iconButtonAvatar: {
  background: 'transparent',
  background: 'transparent',
  "&:hover": {
      background: 'transparent',
      backgroundColor: 'transparent',
      cursor: 'default',
  },
  width: "50px",
  height: "50px",
},
followGridList: {
    alignItems: 'left',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
},
  avatarFollow: {
    background: 'transparent',
    background: 'transparent',
    "&:hover": {
        background: 'transparent',
    },
    margin: "auto",
    width: "32px",
    height: "32px",
    borderRadius: 100
},
followingButton: {
    backgroundColor: grey[700],
    color: darkTheme.palette.common.white,
    '&:hover': {
        backgroundColor: grey[800],
    },
    borderBottom: '1px solid white',
    borderTop: '1px solid white',
    borderLeft: '1px solid white',
    borderRight: '1px solid white',
    textTransform: 'none',
    fontSize: '11px',
    height: "32px",
    width: "70px"
},
item3: {
  position: 'absolute',
  marginLeft: 240,
},
link: {
  color: darkTheme.palette.common.white,
  fontSize: '13px',
},

});

class FollowInfo extends React.Component {
    render() {
      const { classes, followingInfo, handleButton, handlePageChange, buttonText} = this.props;
        return (
            <div>
              <Grid container spacing={0} className={classes.followGrid}>
                <Grid item>
                  
                    
                      <IconButton
                        color="inherit"
                        className={classes.iconButtonAvatar}
                        onClick={handlePageChange}
                      >
                        {followingInfo.previewImg && <img src={followingInfo.previewImg} className={classes.avatarFollow} />}
                        {!followingInfo.previewImg && <AccountCircle className={classes.avatarFollow}/>}
                      </IconButton>
                 
                  
                </Grid>
                <Grid item>
                  <Grid container className={classes.followGridList}>
                    <Grid item> 
                      <Link variant="subtitle2" className={classes.link} onClick={handlePageChange}><b>{followingInfo.User.username}</b> </Link>
                    </Grid>
                    {followingInfo.name && <Grid item>
                      <Typography variant="subtitle2" className={classes.link}>{followingInfo.name}</Typography>
                    </Grid>}
                  </Grid>
                </Grid>

                <Grid item className={classes.item3}>
                  <Button className={classes.followingButton} variant="contained" fullWidth={false} onClick={handleButton}>
                    <b>{buttonText}</b>
                  </Button>
                </Grid>             
              </Grid>
             
            </div>
            
        );
    }
}

export default (withStyles(styles, { withTheme: true })(FollowInfo));;