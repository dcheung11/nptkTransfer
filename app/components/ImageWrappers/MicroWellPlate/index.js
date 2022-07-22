import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Tooltip } from 'antd';
import SimplePlate from '../../../../public/images/simple_plate.png';

function MicroWellPlate({
  plate,
  selectedActivities,
  selectedShadingKey,
  selectedBioAssay,
  wellClickHandler,
  viewBoxWidth,
  viewBoxHeight,
  circleRadius,
  xInitialOffset,
  yInitialOffset,
  xOffset,
  yOffset,
  height,
  width,
}) {
  const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox={viewBox}
      xmlSpace="preserve"
      height={height}
      width={width}
    >
      <defs>
        <pattern
          id="figurebg"
          patternUnits="userSpaceOnUse"
          width={viewBoxWidth}
          height={viewBoxHeight}
        >
          <image
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref={SimplePlate}
            width={viewBoxWidth}
            height={viewBoxHeight}
          />
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        width={viewBoxWidth}
        height={viewBoxHeight}
        fill="url(#figurebg)"
      />
      {Object.values(plate)
        .filter(w =>
          selectedActivities.length > 0
            ? !!w.activities &&
              w.activities.some(activity =>
                selectedActivities.includes(activity),
              )
            : true,
        )
        .map(well => {
          const { extract_id, taxonomy_id, x, y, microwell_metadata } = well;
          let alpha;
          if (
            selectedBioAssay === 'default' ||
            selectedShadingKey === 'default'
          ) {
            alpha = 0.6;
          } else if (!!microwell_metadata && !!microwell_metadata.assay_data) {
            const thisBioAssay = microwell_metadata.assay_data
              .filter(assay => assay.type === selectedBioAssay)
              .pop();
            alpha =
              (!!thisBioAssay[selectedShadingKey] &&
                thisBioAssay[selectedShadingKey] / 100) ||
              0.0;
          }
          const cx = xInitialOffset + x * xOffset + x * circleRadius;
          const cy =
            yInitialOffset + (y - 1) * yOffset + (y - 1) * circleRadius;

          return (
            <Tooltip
              key={`${extract_id}-${x}-${y}`}
              title={`Extract ID: ${extract_id}
              Taxonomy ID: ${taxonomy_id}`}
              overlayStyle={{ whiteSpace: 'pre-line' }}
            >
              <g
                key={uuidv4()}
                id={`circle${extract_id}`}
                onClick={() => wellClickHandler(well)}
              >
                <circle
                  cy={cx}
                  cx={cy}
                  r={circleRadius}
                  fill="red"
                  fillOpacity={alpha}
                  style={{ strokeWidth: 0.5, cursor: 'pointer' }}
                  className="target-circle"
                />
              </g>
            </Tooltip>
          );
        })}
    </svg>
  );
}

MicroWellPlate.propTypes = {
  plate: PropTypes.object.isRequired,
  selectedActivities: PropTypes.array,
  selectedBioAssay: PropTypes.string,
  selectedShadingKey: PropTypes.string,
  wellClickHandler: PropTypes.func,
  viewBoxWidth: PropTypes.number,
  viewBoxHeight: PropTypes.number,
  circleRadius: PropTypes.number,
  xInitialOffset: PropTypes.number,
  yInitialOffset: PropTypes.number,
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
  height: PropTypes.any,
  width: PropTypes.any,
};

MicroWellPlate.defaultProps = {
  selectedActivities: [],
  // eslint-disable-next-line no-console
  wellClickHandler: console.log,
  viewBoxWidth: 562,
  viewBoxHeight: 382,
  circleRadius: 20.3,
  xInitialOffset: 44.5,
  yInitialOffset: 46,
  xOffset: 22.1,
  yOffset: 22.5,
  smilesFilter: {},
};

export default memo(MicroWellPlate);
