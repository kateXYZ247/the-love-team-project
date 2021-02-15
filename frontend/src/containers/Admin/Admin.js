import React, { useEffect } from "react";
import StatusPieChart from "../../components/AdminPanel/StatusPieChart";
import ServiceMap from "../../components/AdminPanel/ServiceMap";
import {Grid, Box, Paper} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    box: {
        height: 600,
    },
    map: {
        height: 600,
    }
}));

function Admin() {
    const classes = useStyles();
    return (
        <Grid container spacing={2} justify={"center"}>
            <Grid item xs={12} md={6} lg={3} justify={"center"}>
                <Paper elevation={5} className={classes.box}>
                    <StatusPieChart/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} justify="center" >
                    <Paper elevation={5} className={classes.map}>
                        <ServiceMap center={{ lat: 37, lng: -100 }}/>
                    </Paper>
            </Grid>
        </Grid>
    );
}

export default Admin;