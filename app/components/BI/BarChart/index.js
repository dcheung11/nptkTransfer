import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';

function BarChart(props) {
  const seriesData = props.allSeriesData.map(x => ({
    name: x.seriesName,
    type: 'bar',
    stack: 'total',
    itemStyle: { color: x.seriesColor },
    label: {
      show: true,
    },
    emphasis: {
      focus: 'series',
    },
    data: x.seriesData,
  }));
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {
      data: props.allSeriesData.map(x => x.seriesName),
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: props.categories,
      axisLabel: {
        interval: 0,
      },
    },
    series: seriesData,
  };
  return <ReactECharts option={options} style={props.style} />;
}
BarChart.propTypes = {
  categories: PropTypes.array,
  allSeriesData: PropTypes.array,
  style: PropTypes.any,
};

export default memo(BarChart);
