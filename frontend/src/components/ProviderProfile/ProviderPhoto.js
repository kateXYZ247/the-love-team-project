import {Box, Grid} from "@material-ui/core";
import React from "react";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import photo from "../../assets/images/providerAvatar.jpg";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({

    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
    },
    approve: {
        textAlign: "flex-end",
        justifyContent: "flex-end",
    }
}));
function ProviderPhoto(props) {
    const { handleSwitch } = props;
    const [state, setState] = React.useState({
        checkedA: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        console.log(state.checkedA);
        handleSwitch(state.checkedA);
    };
    const classes = useStyles();
    return(
        <Grid container  spacing={9} >
            <Grid item xs={5} sm={5} >
                <Avatar alt="Cindy Baker" src={photo} className={classes.large}/>
            </Grid>
            <Grid item xs={5} sm={5} className={classes.approve}>
                <Box mt={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Approved
                    </Button>
                </Box>
                <Box mt={3}>
                    <FormControlLabel
                        control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                        label="available/unavailable "
                    />
                </Box>
            </Grid>

        </Grid>
    );
}

export default ProviderPhoto;