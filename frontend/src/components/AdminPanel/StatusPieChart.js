import React, {useState, useEffect} from 'react';
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import PieChart, {
    Series,
    Label,
    Connector,
    SmallValuesGrouping,
    Legend,
    Export,
    Title,
    Font,
    Margin,
    Size,
    AdaptiveLayout,
} from 'devextreme-react/pie-chart';
import {heIL} from "@material-ui/core/locale"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"
import BackdropProgressCircle from "../UI/BackdropProgressCircle/BackdropProgressCircle"

function StatusPieChart(props) {
    const{
        onFetchStatistics,
        loading,
        userId,
        statList,
    } = props;

    useEffect(() => {
        onFetchStatistics(userId);
    },[]);

    return (
        <React.Fragment>
            <BackdropProgressCircle open={loading} />
            <PieChart
                id="pie"
                // to replace dataSource with statusCount
                dataSource={statList}
                palette="Ocean"
                resolveLabelOverlapping={"shift"}
                diameter={0.5}>
                <Size height={550}/>
                <Margin top={25} left={20} right={20} bottom={10}/>
                <Title text={"SERVICE STATUS STATISTICS"}>
                    <Margin top={25}/>
                    <Font size={20} family={"Helvetica"}/>
                </Title>
                <Series
                    argumentField="status"
                    valueField="counts"
                    customizeText={"abc"}>
                    <AdaptiveLayout width={150}height={200} />
                    <Label visible={true} customizeText={formatLabel} format="fixedPoint">
                        <Connector visible={true} width={0.5} />
                    </Label>
                    <SmallValuesGrouping threshold={0} mode="smallValueThreshold" />
                </Series>
                <Legend markerSize={30}
                        verticalAlignment={"bottom"}
                        horizontalAlignment={"center"}
                        orientation={"horizontal"}/>
                <Export enabled={true} />
            </PieChart>
        </React.Fragment>

    );
}

function formatLabel(arg) {
    return `${arg.argumentText}: ${arg.valueText}%`;
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        loading: state.admin.loading,
        statList: state.admin.statList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchStatistics: (userId) => {
            dispatch(
                actions.fetchStatistics(userId)
            )
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(StatusPieChart);
