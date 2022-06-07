import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    display: 'flex',
    flexDirection: 'row',
},
followGridList: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
},
  avatarFollow: {
    background: 'transparent',
    background: 'transparent',
    "&:hover": {
        background: 'transparent',
    },
    margin: "auto",
    width: "30px",
    height: "30px",
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
},
});

class FollowInfo extends React.Component {
    render() {
      const { classes, userProfile, handleShowUnfollow } = this.props;
        return (
            <div>
              <Grid container spacing={2} className={classes.followGrid}>
                <Grid item>
                  <img src={userProfile.previewImg} className={classes.avatarFollow} />
                </Grid>
                <Grid item>
                  <Grid container className={classes.followGridList}>
                    <Grid item>
                      <Typography variant="subtitle2"> <b>username</b> </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2"> Full Name </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <div>
                    <Box m={6}/>
                  </div>
                </Grid>
                <Grid item>
                  <Button className={classes.followingButton} variant="contained" fullWidth={false} onClick={handleShowUnfollow}>
                    <b>Following</b>
                  </Button>
                </Grid>
              </Grid>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(FollowInfo));;