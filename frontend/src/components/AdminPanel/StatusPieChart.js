import React, {useState, useEffect} from 'react';
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import PieChart, {
    Series,
    Label,
    Connector,
    SmallValuesGrouping,
    Legend,
    Export
} from 'devextreme-react/pie-chart';

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
        <PieChart
            id="pie"
            // to replace dataSource with statusCount
            dataSource={statList}
            palette="Bright"
            title="SERVICE STATUS STATISTICS">

            <Series
                argumentField="status"
                valueField="counts"
                customizeText={"abc"}>

                <Label visible={true} customizeText={formatLabel} format="fixedPoint">
                    <Connector visible={true} width={0.5} />
                </Label>
                <SmallValuesGrouping threshold={4.5} mode="smallValueThreshold" />
            </Series>
            <Legend horizontalAlignment="center" verticalAlignment="bottom" />
            <Export enabled={true} />
        </PieChart>
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
