import React from 'react';

import { ThemeProvider } from "@material-ui/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

//responsive UI
import Hidden from '@material-ui/core/Hidden';

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

//menu stuff
import GridOn from "@material-ui/icons/GridOn";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import FeaturedPlayList from "@material-ui/icons/FeaturedPlayList";
import VideoLibrary from "@material-ui/icons/VideoLibrary";


// CSS styling
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
        MuiButton: {
            label: {
                color: 'white',
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
    profileContainer: {
        maxWidth: 935,
        margin: "auto",
        padding: "0px 10px 0",
    },
    centerDiv: {
        display: "flex",
        justifyContent: "center",
        flexDirection: 'row',
        marginTop: '50px',
    },
})

class UserProfileTabsMobile extends React.Component {
    render() {
        const { classes, tab, handleTabChange, followStatusLoaded } = this.props;

        return (
            <div className={classes.profileContainer}>
                <ThemeProvider theme={darkTheme}>
                {(followStatusLoaded == true) &&
                    <div>
                    <Tabs
                        value={tab}
                        centered
                        onChange={handleTabChange}
                        indicatorColor="primary"
                    >
                        <Tab disableRipple label={<Hidden smDown>Videos</Hidden>} icon={<VideoLibrary />} />
                        <Tab disableRipple label={<Hidden smDown>Playlists</Hidden>} icon={<FeaturedPlayList />} />
                    </Tabs>
                    <Divider style={{ background: 'grey' }} />
                    {tab === 0 &&
                        <div className={classes.centerDiv}>
                            <Typography variant="h4"> No Posts Yet</Typography>
                        </div>
                    }
                    {tab === 1 &&
                        <div className={classes.centerDiv}>
                            <Typography variant="h4">No Playlists Yet</Typography>
                        </div>
                    }
                    </div>}
                </ThemeProvider>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(UserProfileTabsMobile));;