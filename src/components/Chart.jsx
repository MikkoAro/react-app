import React from 'react';
import { Bar } from 'react-chartjs-2'
import PropTypes from "prop-types";

function Chart(props) {
    return (
        <div>
          <Bar data={props.data}>
          </Bar>
        </div>
    )
}

Chart.propTypes = {
    data: PropTypes.object
};

export default Chart;
