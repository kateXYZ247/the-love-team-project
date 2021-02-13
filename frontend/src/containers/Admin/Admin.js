
import React, { useEffect } from "react";

import StatusPieChart from "../../components/AdminPanel/StatusPieChart";
import GoogleMapSample from "../../components/Sample/GoogleMapSample";


function Admin() {
    return (
        <React.Fragment>
            <StatusPieChart/>
            {/*<GoogleMapSample/>*/}
        </React.Fragment>
    );
}

export default Admin;