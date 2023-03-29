import React from 'react';

//MUI component imports
import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/styles";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

//styles and color imports
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import ProfilePic from "../ProfilePic";
import ProfilePicMobile from "../ProfilePicMobile";

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
        // type: 'dark',
        primary: {
            main: blue[700],
        },
        secondary: {
            main: grey[500],
            light: grey[500],
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
    grow: {
        flexGrow: 1,
    },
    text: {
        width: 220,
        color: 'primary',
        backgroundColor: 'primary',
        fontSize: '10px',
    },
    textfield: {
        fontSize: '12px',
    },
    submitButton: {
        margin: darkTheme.spacing(3, 0, 0),
        width: 260,
    },
    formholder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        height: '100%',
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: darkTheme.palette.common.white,
        alignItems: 'center',
        borderBottom: '1px solid grey',
        borderTop: '1px solid grey',
        borderLeft: '1px solid grey',
        borderRight: '1px solid grey',
    },
    link: {
        textDecoration: 'none',
        color: blue[700]
    },
    header: {
        fontSize: '16px',
    }
});

class EditProfileFormMobile extends React.Component {
    render() {
        const { classes, handleSubmit, profile, loadingProfile, handleShow, username, handleChange, name, bio, link } = this.props;

        return (
            <div>
                <ThemeProvider theme={darkTheme}>
                    <div className={classes.formholder}>
                        <Box m={4} /> 
                        <form className={classes.form} onSubmit={handleSubmit}>
                           
                            <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                                <Grid item >
                                    <ProfilePicMobile
                                        profile={profile}
                                        loadingProfile={loadingProfile}
                                        viewingMyProfile={true}
                                        handleShow={handleShow}
                                        grey={true}
                                    />
                                </Grid>
                                <Grid item>
                                    <Box m={3} />
                                    <Typography component="h1" variant="h4">
                                        {username}
                                    </Typography>
                                    <a className={classes.link} onClick={handleShow}>
                                        <Typography component="h1" variant="subtitle1">
                                            <b>Change Profile Photo</b>
                                        </Typography>
                                    </a>
                                </Grid>
                            </Grid>

                         

                            <Grid container spacing={2} direction="column" alignItems="center" justify="center" className={classes.grow}>
                                <Grid item>
                                    <Grid container spacing={2} direction="row" alignItems="top" justify="center">
                                        <Grid item >
                                            <Typography component="h1" variant="h6" style={{ marginTop: 30 }} className={classes.header}>
                                                <b>Name</b>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                color="primary"
                                                variant="outlined"
                                                margin="normal"
                                                id="name"
                                                name="name"
                                                type="name"
                                                value={name}
                                                autoComplete="name"
                                                autoFocus
                                                className={classes.text}
                                                onChange={handleChange}
                                                FormHelperTextProps={{
                                                    className: classes.text
                                                }}
                                                InputProps={{
                                                    classes: {
                                                      input: classes.textfield,
                                                    },
                                                  }}
                                            />
                                            <Grid item>
                                                <Typography component="h1" variant="caption" className={classes.text} color="secondary" >
                                                    Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                                        <Grid item >
                                            <Typography component="h1" variant="h6" style={{ marginLeft: 20 }} className={classes.header}>
                                                <b>Bio </b>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                color="primary"
                                                variant="outlined"
                                                margin="normal"
                                                id="bio"
                                                name="bio"
                                                type="bio"
                                                value={bio}
                                                autoComplete="bio"
                                                autoFocus
                                                multiline
                                                rows={4}
                                                className={classes.text}
                                                onChange={handleChange}
                                                FormHelperTextProps={{
                                                    className: classes.text
                                                }}
                                                InputProps={{
                                                    classes: {
                                                      input: classes.textfield,
                                                    },
                                                  }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                                        <Grid item >
                                            <Typography component="h1" variant="h6" style={{ marginTop: 60 }} className={classes.header}>
                                                <b>Link</b>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                                                <Grid item>
                                                    <Typography component="h1" variant="subtitle2" className={classes.text} color="secondary">
                                                        <b>Personal Information</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography component="h1" variant="caption" className={classes.text} color="secondary">
                                                        Add a link to your personal or professional website
                                                    </Typography>
                                                </Grid>
                                                <Grid item >
                                                    <TextField
                                                        color="primary"
                                                        variant="outlined"
                                                        margin="normal"
                                                        id="link"
                                                        name="link"
                                                        type="link"
                                                        value={link}
                                                        autoComplete="link"
                                                        autoFocus
                                                        className={classes.text}
                                                        onChange={handleChange}
                                                        FormHelperTextProps={{
                                                            className: classes.text
                                                        }}
                                                        InputProps={{
                                                            classes: {
                                                              input: classes.textfield,
                                                            },
                                                          }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submitButton}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                            <Box m={5} />
                        </form>
                        <Box m={2} />
                        <Typography variant="body2" color="secondary" align="center">
                            Copyright © Too Legit To Submit, Inc 2022
                        </Typography>
                    </div>

                </ThemeProvider>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(EditProfileFormMobile));;