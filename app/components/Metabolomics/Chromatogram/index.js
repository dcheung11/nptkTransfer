import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as echarts from 'echarts/core';
import ReactECharts from 'echarts-for-react';

function Chromatogram(props) {
  /*
  Merging RT
  Currently pools to second + 3 decimal places
  */
  const rtToIntensity = new Map(); // Maps keep order
  props.rtSortedPeaks.map(x => {
    const newRt = Math.round(x.rt * 1000) / 1000;
    rtToIntensity.set(
      newRt,
      rtToIntensity.get(newRt) + x.intensity || x.intensity,
    );
  });
  const retentionTimes = [...rtToIntensity.keys()];
  const intensities = [...rtToIntensity.values()];

  /* Callbacks */
  const onDataZoom = x => {
    const start = x.batch ? x.batch[0].start : x.start;
    const end = x.batch ? x.batch[0].end : x.end;
    const rtStart =
      retentionTimes[
        Math.floor((retentionTimes.length * Math.round(start)) / 100)
      ];
    const rtEnd =
      retentionTimes[
        Math.ceil((retentionTimes.length * Math.round(end)) / 100)
      ];
    props.setRtHigh(rtEnd || Infinity);
    props.setRtLow(rtStart || 0);
  };

  /* Prepping Y axis */
  let intensity;
  if (props.relativeIntensity) {
    intensity = {
      name: 'Relative Intensity',
      nameGap: 50,
      nameLocation: 'center',
      type: 'value',
      axisLabel: {
        formatter: value =>
          (Math.round((value * 100) / props.maxIntensity) / 100).toFixed(3),
      },
      max: props.maxIntensity,
    };
  } else {
    intensity = {
      name: 'Intensity',
      nameGap: 50,
      nameLocation: 'center',
      type: 'value',
      axisLabel: {
        formatter: value => value.toPrecision(3),
      },
    };
  }

  const options = {
    // grid: { top: 8, right: 8, bottom: 24, left: 56 },
    grid: { bottom: '35%', left: '15%' },
    title: {
      left: 'center',
      text: props.chromatogramTitle,
      textStyle: {
        fontSize: 12,
      },
      subtext: props.chromatogramSubTitle,
      subtextStyle: {
        fontSize: 10,
      },
    },
    tooltip: {
      trigger: 'axis',
      position(pt) {
        return [pt[0], '10%'];
      },
      formatter: value => `Intensity: ${intensities[value[0].dataIndex]}
                <br/>
                Retention TIme: ${retentionTimes[value[0].dataIndex]}
                `,
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      name: 'Retention Time (seconds)',
      nameGap: 40,
      nameLocation: 'center',
      data: retentionTimes,
      type: 'category',
      axisLabel: {
        formatter: value => (Math.round(value * 1000) / 1000).toFixed(3),
      },
      boundaryGap: false,
    },
    yAxis: intensity,
    dataZoom: [
      {
        type: 'inside',
        start: 20,
        end: 50,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: 'Intensity',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)',
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)',
            },
          ]),
        },
        data: intensities,
      },
    ],
  };

  return (
    <ReactECharts
      option={options}
      onEvents={{ dataZoom: onDataZoom, ...props.onEvents }}
      style={{ height: '45vh', left: 24, top: 24, width: '60vw' }}
    />
  );
}

Chromatogram.propTypes = {
  history: PropTypes.object,
  rtSortedPeaks: PropTypes.array,
  maxIntensity: PropTypes.number,
  relativeIntensity: PropTypes.bool,
  onEvents: PropTypes.object,
  setRtHigh: PropTypes.func,
  setRtLow: PropTypes.func,
  chromatogramSubTitle: PropTypes.string,
  chromatogramTitle: PropTypes.string,
};

export default memo(Chromatogram);
