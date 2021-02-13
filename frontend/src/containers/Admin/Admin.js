import React, { useEffect } from "react";
import StatusPieChart from "../../components/AdminPanel/StatusPieChart";
import ServiceMap from "../../components/AdminPanel/ServiceMap";
import ServiceMapCluster from "../../components/AdminPanel/ServiceMapCluster";
import { Grid, Box} from "@material-ui/core"


function Admin() {
    return (
        <Grid spacing={2} container justify="center">
            <Grid xs={3} container justify="center">
                <StatusPieChart/>
            </Grid>

            <Grid xs={9} container justify="center">
                {/*<ServiceMapCluster/>*/}
                <ServiceMap
                    center={{ lat: 37, lng: -100 }}
                />
            </Grid>
        </Grid>
    );
}

export default Admin;