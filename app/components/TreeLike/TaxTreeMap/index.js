import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { Divider, Tag } from 'antd';
import { darkTheme } from './themes/dark';
import { infographic } from './themes/infographic';
import { macarons } from './themes/macarons';
import { roma } from './themes/roma';
import { vintage } from './themes/vintage';
import { shine } from './themes/shine';
import TaxInfo from '../../Metadata/TaxonomyMetadata/TaxInfo';
echarts.registerTheme('dark', darkTheme);
echarts.registerTheme('infographic', infographic);
echarts.registerTheme('macarons', macarons);
echarts.registerTheme('roma', roma);
echarts.registerTheme('macarons', macarons);
echarts.registerTheme('vintage', vintage);
echarts.registerTheme('shine', shine);

function TaxTreeMap(props) {
  const [selected, setSelected] = useState([]);

  const [drawerData, setDrawerData] = useState({});

  const onChartClick = params => {
    if (params.treePathInfo.length === 9) {
      setDrawerData(params);
      // drawerData.current = params;
    }
  };

  const onEvents = {
    click: onChartClick,
  };

  const treeMapOption = {
    tooltip: {
      formatter(info) {
        const { size } = info.data;
        const { name } = info;
        let display;
        if (!(info.treeAncestors.length === 9)) {
          display = [
            `<div class="tooltip-title">${echarts.format.addCommas(
              name,
            )}</div>`,
            `strains: ${echarts.format.addCommas(size)}` + '<br>',
          ].join('');
        } else {
          const { taxonomy_id } = info.data.info;
          display = [
            `<div class="tooltip-title">${echarts.format.addCommas(
              name,
            )}</div>`,
            `taxonomy id: ${echarts.format.addCommas(taxonomy_id)}` + '<br>',
          ].join('');
        }
        return display;
      },
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    title: {
      top: 5,
      left: 'center',
      text: 'Strain/Species Treemap',
    },
    series: [
      {
        name: 'Start',
        type: 'treemap',
        breadcrumb: {
          top: '40',
        },
        data: props.data,
        leafDepth: props.depth,
        roam: true,
        size: '100%',
        height: 600,
        visualMax: 100,
        upperLabel: {
          show: props.showLabel,
          padding: 0.01,
          fontSize: 8,
          color: 'white',
          formatter(info) {
            // const levelInd = info.treeAncestors.length;
            return info.data.name;
          },
        },
        levels: [
          {
            itemStyle: {
              borderColor: '#111',
              borderWidth: 4,
              gapWidth: 4,
            },
          },
          {
            colorSaturation: [0.3, 0.9],
            itemStyle: {
              borderColorSaturation: 0.7,
              borderWidth: 3.5,
              gapWidth: 2,
            },
          },
          {
            colorSaturation: [0.3, 0.5],
            itemStyle: {
              borderColorSaturation: 0.6,
              borderWidth: 3,
              gapWidth: 1,
            },
          },
          {
            colorSaturation: [0.3, 0.4],
            itemStyle: {
              borderColorSaturation: 0.5,
              borderWidth: 2.5,
              gapWidth: 1,
            },
          },
          {
            colorSaturation: [0.3, 0.3],
            itemStyle: {
              borderColorSaturation: 0.4,
              borderWidth: 2,
              gapWidth: 1,
            },
          },
          {
            colorSaturation: [0.3, 0.2],
            itemStyle: {
              borderColorSaturation: 0.4,
              borderWidth: 1.5,
              gapWidth: 1,
            },
          },
          {
            colorSaturation: [0.3, 0.1],
            itemStyle: {
              borderColorSaturation: 0.4,
              borderWidth: 1,
              gapWidth: 1,
            },
          },
          {
            colorSaturation: [0.3, 0.05],
            itemStyle: {
              borderColorSaturation: 0.4,
              borderWidth: 0.5,
              gapWidth: 1,
            },
          },
          {
            colorSaturation: [0.3, 0.025],
            itemStyle: {
              borderColorSaturation: 0.4,
              borderWidth: 0.2,
              gapWidth: 1,
            },
          },
        ],
      },
    ],
  };
  const sunburstOption = {
    title: {
      top: 5,
      left: 'center',
      text: 'Strain/Species Sunburst',
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    tooltip: {
      formatter(info) {
        const { size } = info.data;
        const { name } = info;
        let display;
        if (!(info.treePathInfo.length === 9)) {
          display = [
            `<div class="tooltip-title">${echarts.format.addCommas(
              name,
            )}</div>`,
            `strains: ${echarts.format.addCommas(size)}` + '<br>',
          ].join('');
        } else {
          const { taxonomy_id } = info.data.info;
          display = [
            `<div class="tooltip-title">${echarts.format.addCommas(
              name,
            )}</div>`,
            `taxonomy id: ${echarts.format.addCommas(taxonomy_id)}` + '<br>',
          ].join('');
        }
        return display;
      },
    },
    series: [
      {
        type: 'sunburst',
        radius: [0, '80%'],
        animationDurationUpdate: 1000,
        nodeClick: 'rootToNode',
        data: props.data,
        // universalTransition: true,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,.5)',
        },
        label: {
          rotate: 'tangential',
          show: props.showLabel,
          // minAngle: 100,
          fontSize: 4,
          width: 10,
          overflow: 'truncate',
        },
        // select: {
        //   label: ,
        // },
      },
    ],
  };
  let option;
  if (props.option === 'treemap') {
    option = treeMapOption;
  } else if (props.option === 'sunburst') {
    option = sunburstOption;
  }

  return (
    <>
      <ReactECharts
        onEvents={onEvents}
        option={option}
        style={{ height: '750px' }}
        theme={props.theme}
      />
      <Divider />
      {/* {props.selected.map(tag => {
        <Tag color="magenta">{tag}</Tag>;
      })} */}

      <TaxInfo drawerData={drawerData} />
    </>
  );
}

TaxTreeMap.propTypes = {
  data: PropTypes.array,
  depth: PropTypes.number,
  showLabel: PropTypes.bool,
  theme: PropTypes.string,
};

export default memo(TaxTreeMap);
