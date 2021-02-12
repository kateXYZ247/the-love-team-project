import React, {useState} from 'react';

import PieChart, {
    Series,
    Label,
    Connector,
    SmallValuesGrouping,
    Legend,
    Export
} from 'devextreme-react/pie-chart';

let dataSource = [{
    language: 'English',
    percent: 50,
}, {
    language: 'Chinese',
    percent: 10,
}, {
    language: 'Spanish',
    percent: 10,
}];


function StatusPieChart(props) {
    // const{serviceCount} = props;
    // const {statusCount, total} = serviceCount;
    // const [serviceCount, setServiceCount] = useState("");
    //
    // statusCount.forEach(item => {item.count = 100 * item.count / total});
    return (
        <PieChart
            id="pie"
            // to replace dataSource with statusCount
            dataSource={dataSource}
            palette="Bright"
            title="Top internet languages">

            <Series
                argumentField="language"
                valueField="percent"
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

export default StatusPieChart;
