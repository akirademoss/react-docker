import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";


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
    "&:hover": {
        background: 'transparent',
    },
    margin: "auto",
    width: "32px",
    height: "32px",
    borderRadius: 100
},
followingButton: {
    backgroundColor: grey[600],
    color: darkTheme.palette.common.white,
    '&:hover': {
        backgroundColor: grey[700],
    },

    textTransform: 'none',
    fontSize: '11px',
    height: "32px",
    width: "70px"
},
followButton: {
  backgroundColor: blue[700],
  color: darkTheme.palette.common.white,
  '&:hover': {
      backgroundColor: blue[800],
  },
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
  "&:hover": {
    cursor: 'default',
},
},
skeleton: {
  color: darkTheme.palette.common.white,
  backgroundColor: grey[700],
  width: "32px",
  height: "32px",
},

});

class UserFollowInfo extends React.Component {
    render() {
      const { classes, followingInfo, followingStatus, handleButton, handlePageChange, handleFollow, buttonText, loadingInfo, myUsername} = this.props;
        return (
            <div>
              <Grid container spacing={0} className={classes.followGrid}>
                <Grid item>
                  
                    
                      <IconButton
                        disableRipple
                        color="inherit"
                        className={classes.iconButtonAvatar}
                        onClick={handlePageChange}
                      >
                        {loadingInfo && !followingInfo.previewImg && <Skeleton variant="circle" animation="wave" className={classes.skeleton}/>}
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
                  {followingStatus.status == 'True' && (myUsername != followingInfo.User.username) &&
                  <Button disableRipple className={classes.followingButton} variant="contained" fullWidth={false} onClick={handleButton}>
                    <b>Following</b>
                  </Button>}
                  {(myUsername != followingInfo.User.username) && followingStatus.status == 'False' &&
                  <Button disableRipple className={classes.followButton} variant="contained" fullWidth={false} onClick={handleFollow}>
                    <b>Follow</b>
                  </Button>}
                  {(myUsername == followingInfo.User.username) &&
                  <Button disableRipple className={classes.followButton} variant="contained" fullWidth={false} onClick={handlePageChange}>
                    <b>Profile</b>
                  </Button>}
                </Grid>             
              </Grid>
             
            </div>
            
        );
    }
}

export default (withStyles(styles, { withTheme: true })(UserFollowInfo));;