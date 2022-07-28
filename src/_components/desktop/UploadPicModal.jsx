import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    modalUpload: {
        [darkTheme.breakpoints.up('sm')]: {
        },
        minheight: 200,
        minWidth: 400,
        position: 'absolute',
        backgroundColor: grey[700],
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: darkTheme.shadows[5],
        padding: darkTheme.spacing(1),
        "&:focus": {
            outline: "none"
        },
        borderRadius: darkTheme.shape.borderRadius,
    },
    // styling for viewing image cropper tool
    cropContainer: {
        position: 'relative',
        width: '100%',
        minWidth: 400,
        minHeight: 400,
        background: darkTheme.palette.common.black,
        [darkTheme.breakpoints.up('sm')]: {
            height: 400,
        },
    },
    cropButton: {
        marginLeft: 16,
        width: 10,
        flex: '1',
        backgroundColor: red[700],
        '&:hover': {
            backgroundColor: red[800],
        },
    },
    cancelButton: {
        marginLeft: 16,
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: grey[600],
        },
        width: 10,
        flex: '1',
    },
    controls: {
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        [darkTheme.breakpoints.up('sm')]: {
        },
    },
    sliderContainer: {
        display: 'flex',
        flex: '2',
        alignItems: 'center',
        flexDirection: 'row',
    },
    sliderLabel: {
        marginLeft: 16,
        [darkTheme.breakpoints.down('xs')]: {

        },
    },
    slider: {
        padding: '22px 0px',
        marginLeft: 16,
        minWidth: 100,
        [darkTheme.breakpoints.up('sm')]: {
            margin: '0 16px',
        },
        color: red[700],
    },
})

class UploadPicModal extends React.Component {
    render() {
        const { classes, showImageCrop, handleCloseImageModal, imageSrc, crop, rotation, zoom, setCrop, setRotation,
        onCropComplete, setZoom, showCroppedImage} = this.props;
        
        return (

            <div>
                <Modal
                    open={showImageCrop}
                    onClose={handleCloseImageModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={classes.modalUpload}>
                        <div className={classes.cropContainer}>
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={1 / 1}
                                cropShape="round"
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className={classes.controls}>
                            <div className={classes.sliderContainer}>
                                <Typography
                                    variant="overline"
                                    classes={{ root: classes.sliderLabel }}
                                >
                                    Zoom
                                    </Typography>
                                <Slider
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    classes={{ root: classes.slider }}
                                    onChange={setZoom}
                                />
                            </div>
                            <div className={classes.sliderContainer}>
                                <Typography
                                    variant="overline"
                                    classes={{ root: classes.sliderLabel }}
                                >
                                    Rotation
                                    </Typography>
                                <Slider
                                    value={rotation}
                                    min={0}
                                    max={360}
                                    step={1}
                                    aria-labelledby="Rotation"
                                    classes={{ root: classes.slider }}
                                    onChange={setRotation}
                                />
                            </div>
                           
                            <Button
                                disableRipple
                                onClick={() => { showCroppedImage() ; handleCloseImageModal() }}
                                variant="contained"
                                color="primary"
                                classes={{ root: classes.cropButton }}
                            >
                                Save
                            </Button> 
                            
                            <Button
                                disableRipple
                                variant="contained"
                                color="primary"
                                classes={{ root: classes.cancelButton }}
                                onClick={handleCloseImageModal}
                            >
                                Cancel
                                </Button>
                        </div>

                    </div>
                </Modal>
                
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(UploadPicModal));;