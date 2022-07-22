import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Tooltip } from 'antd';
import scrollIntoView from 'scroll-into-view';
import bacteriaLegend from './metadata/bacteria/legend.json';
import bacteriaPoints from './metadata/bacteria/points.json';
import bacteriaFigure from './metadata/bacteria/figure.png';
import fungiLegend from './metadata/fungi/legend.json';
import fungiPoints from './metadata/fungi/points.json';
import fungiFigure from './metadata/fungi/figure.png';
import insectLegend from './metadata/insect/legend.json';
import insectPoints from './metadata/insect/points.json';
import insectFigure from './metadata/insect/figure.png';
import plantLegend from './metadata/plant/legend.json';
import plantPoints from './metadata/plant/points.json';
import plantFigure from './metadata/plant/figure.png';

function TargetFigure({ staticContext, target, ...props }) {
  const [viewBoxHeight, setViewBoxHeight] = useState(288);
  const viewBoxWidth = 576;
  const circleRadius = 5.5;
  const targetMoleculesExist = () => true;
  const targetLookup = {
    plant: {
      legend: plantLegend,
      figure: plantFigure,
      points: plantPoints,
    },
    insect: {
      legend: insectLegend,
      figure: insectFigure,
      points: insectPoints,
    },
    fungi: {
      legend: fungiLegend,
      figure: fungiFigure,
      points: fungiPoints,
    },
    bacteria: {
      legend: bacteriaLegend,
      figure: bacteriaFigure,
      points: bacteriaPoints,
    },
  };

  const img = new Image();
  img.addEventListener('load', () => {
    const ratio = img.naturalWidth / img.naturalHeight;
    setViewBoxHeight(viewBoxWidth / ratio);
  });

  img.src = targetLookup[target].figure;

  const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;
  const figureSvg = (
    <svg
      version="1.1"
      id="Layer_1"
      className="figure"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox={viewBox}
      xmlSpace="preserve"
      {...props}
    >
      <defs>
        <pattern
          id={`${target}-figurebg`}
          patternUnits="userSpaceOnUse"
          width={viewBoxWidth}
          height={viewBoxHeight}
        >
          <image
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref={targetLookup[target].figure}
            style={{ width: '100%' }}
          />
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill={`url(#${target}-figurebg)`}
      />
      {targetLookup[target].points.circles.map(({ legend, x, y }) => (
        <Tooltip
          key={`${target}-${legend}`}
          title={
            targetLookup[target].legend
              .filter(s => s.number === legend)
              .map(v => v.label)[0]
          }
        >
          <g
            key={legend}
            id={`circle${legend}`}
            onClick={() => {
              /* Insert the redirection */
              scrollIntoView(
                document.querySelector(`.${target}-record-${legend}`),
                {
                  align: {
                    top: 0,
                  },
                },
              );
            }}
          >
            <circle
              cx={x}
              cy={y}
              r={circleRadius}
              fill={targetMoleculesExist(legend) ? '#bf1111' : '#fff'}
              stroke="#000"
              style={{ strokeWidth: 0.5, cursor: 'pointer' }}
              className="target-circle"
            />
            <text
              x={parseInt(x, 10) - 3}
              y={parseInt(y, 10) + 1.5}
              style={{
                fontSize: '5px',
                fontFamily: 'Verdana',
                cursor: 'pointer',
              }}
            >
              {legend}
            </text>
          </g>
        </Tooltip>
      ))}
    </svg>
  );

  return figureSvg;
}

TargetFigure.propTypes = {
  target: PropTypes.string,
};

export default withRouter(memo(TargetFigure));
