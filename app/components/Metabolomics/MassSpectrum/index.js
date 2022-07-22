import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';
import diamond from '../../../../public/images/diamond-square.png';

function MassSpectrum(props) {
  const colourLookup = {
    'type1pk | type2pk': '#ba0d30',
    'betalactam | nrps': '#fd6800',
    'nrps | nucleoside': '#ffcb00',
    'nucleoside | type1pk': '#47ff00',
    'nrps | type1pk': '#00ff88',
    alkaloid: '#126a7a',
    aminoglycoside: '#E79960',
    betalactam: '#42B269',
    nis: '#917d75',
    nrps: '#FF0000',
    nucleoside: '#a64d79',
    phenylpropanoid: '#95EA35',
    ripp: '#ff0000',
    terpene: '#5FDBAC',
    type1pk: '#4c8fd3',
    type2pk: '#915CC0',
  };

  /* Data Cleaning */
  const orderedPeaks = props.peaks.sort((a, b) => (a.mz > b.mz ? 1 : -1));
  const maxAbundance = Math.max(
    ...props.peaks.map(x => parseFloat(x.intensity)),
  );

  /* Generate Markers for small molecules */
  const smallMoleculeMarkers = [];
  if (props.showSymbols) {
    orderedPeaks.map((maplePeak, idx) => {
      const smData = props.smallMoleculeLookup[maplePeak.maple_peak_id];
      if (smData) {
        smallMoleculeMarkers.push({
          value: smData.smallmolecule_id,
          xAxis: idx,
          yAxis: maplePeak.intensity,
          ...maplePeak,
        });
      }
      return undefined;
    });
  }

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
          (Math.round((value * 100) / maxAbundance) / 100).toFixed(3),
      },
      max: maxAbundance,
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
    legend: { show: true },
    title: {
      left: 'center',
      text: props.massSpecTitle,
      textStyle: {
        fontSize: 12,
      },
      subtext: props.massSpecSubtitle,
      subtextStyle: {
        fontSize: 10,
      },
    },
    tooltip: {
      trigger: 'axis',
      position(pt) {
        return [pt[0], '10%'];
      },
      formatter: value => {
        const maplePeak = orderedPeaks[value[0].dataIndex];
        const chemotype = props.chemotypeLookup[maplePeak.maple_peak_id]
          ? props.chemotypeLookup[maplePeak.maple_peak_id].label
          : null;
        const smallMolecule = props.smallMoleculeLookup[maplePeak.maple_peak_id]
          ? props.smallMoleculeLookup[maplePeak.maple_peak_id].smallmolecule_id
          : null;
        return `
          Intensity: ${maplePeak.intensity}<br/>
          Mass-to-charge: ${Math.round(maplePeak.mz * 1000) / 1000}<br/>
          ${maplePeak.rt ? `Retention Time: ${maplePeak.rt}<br/>` : ''}
          ${chemotype ? `Chemotype: ${chemotype}<br/>` : ''}
          ${smallMolecule ? `Small Molecule ID: ${smallMolecule}` : ''}`;
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      name: 'Mass-to-charge ratio (m/z)',
      nameGap: 40,
      nameLocation: 'center',
      type: 'category',
      data: orderedPeaks.map(maplePeak => maplePeak.mz),
      axisLabel: {
        formatter: value => (Math.round(value * 1000) / 1000).toFixed(3),
      },
    },
    yAxis: intensity,
    series: [
      {
        data: orderedPeaks.map(maplePeak => ({
          value: maplePeak.intensity,
          itemStyle: {
            color: props.chemotypeLookup[maplePeak.maple_peak_id]
              ? colourLookup[
                props.chemotypeLookup[maplePeak.maple_peak_id].label
                ]
              : props.defaultColor || '#4c4a4a',
          },
          ...maplePeak,
        })),
        markPoint: {
          data: smallMoleculeMarkers,
          symbol: `image://${diamond}`,
          symbolSize: Math.min(
            Math.max(parseInt(3000 / orderedPeaks.length), 12),
            30,
          ),
          symbolOffset: [
            0,
            Math.min(Math.max(parseInt(-3000 / orderedPeaks.length), -15), -4),
          ],
          // label: { formatter: '{c}' },
          label: { formatter: '' },
        },
        type: 'bar',
        smooth: true,
      },
    ],
  };
  return (
    <div>
      <ReactECharts
        option={options}
        onEvents={props.onEvents}
        style={{ height: '45vh', left: 24, top: 24, width: '60vw' }}
      />
    </div>
  );
}

MassSpectrum.propTypes = {
  peaks: PropTypes.array,
  relativeIntensity: PropTypes.bool,
  onEvents: PropTypes.object,
  chemotypeLookup: PropTypes.object,
  smallMoleculeLookup: PropTypes.object,
  massSpecTitle: PropTypes.string,
  massSpecSubtitle: PropTypes.string,
  showSymbols: PropTypes.bool,
  defaultColor: PropTypes.string,
};

export default memo(MassSpectrum);
