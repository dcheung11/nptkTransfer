import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import Chromatogram from '../Chromatogram';
import MassSpectrum from '../MassSpectrum';

function FilterableMassSpectrumChromatogram(props) {
  const [rtH, setRtHigh] = useState(props.rtMax);
  const [rtL, setRtLow] = useState(props.rtMin);
  const [showSymbols, setShowSymbols] = useState(true);
  function filterExtractByRt(hit, rtLow, rtHigh) {
    return hit.filter(x => x.rt < rtHigh && x.rt > rtLow);
  }
  const switchHandler = x => setShowSymbols(x);
  return (
    <>
      <div id="chromatogram">
        <Chromatogram
          rtSortedPeaks={props.rtSortedPeaks}
          maxIntensity={props.maxIntensity}
          setRtHigh={setRtHigh}
          setRtLow={setRtLow}
          relativeIntensity
          chromatogramTitle={`Extract ${props.extractId}`}
          chromatogramSubTitle="Chromatogram of all interesting peaks computed with MAPLE"
          s
        />
      </div>
      <br />
      <div id="massSpectrum">
        <MassSpectrum
          showSymbols={showSymbols}
          relativeIntensity
          onEvents={props.massSpecOnEvents}
          peaks={filterExtractByRt(props.rtSortedPeaks, rtL, rtH)}
          chemotypeLookup={props.chemotypeLookup}
          smallMoleculeLookup={props.smallMoleculeLookup}
          massSpecTitle={`Extract ${props.extractId}`}
          massSpecSubtitle={`Mass spectrum with peaks limited to a retention time between ${Math.round(
            rtL * 1000,
          ) / 1000} and ${Math.round(rtH * 1000) / 1000} seconds `}
        />
        Show Symbols:
        <Switch
          checkedChildren={<EnvironmentOutlined />}
          defaultChecked
          onChange={switchHandler}
        />
      </div>
      <div id="tandemMassSpectra">
        <MassSpectrum
          showSymbols={showSymbols}
          relativeIntensity
          onEvents={{}}
          peaks={props.ms2Peaks}
          chemotypeLookup={props.ms2Lookup}
          smallMoleculeLookup={{}}
          massSpecTitle={`MS2 Spectra of Extract ${props.extractId}`}
          massSpecSubtitle={`Tandem Mass Spectra for Peak ID ${
            props.selectedMs1Peak.maple_peak_id
          } with a retention time of ${Math.round(
            props.selectedMs1Peak.rt * 1000,
          ) / 1000}s and an m/z of ${props.selectedMs1Peak.mz}`}
          defaultColor={
            (!!props.selectedMs1Peak.itemStyle &&
              props.selectedMs1Peak.itemStyle.color) ||
            undefined
          }
        />
      </div>
    </>
  );
}

FilterableMassSpectrumChromatogram.propTypes = {
  extractId: PropTypes.number,
  rtSortedPeaks: PropTypes.array,
  maxIntensity: PropTypes.number,
  rtMin: PropTypes.number,
  rtMax: PropTypes.number,
  massSpecOnEvents: PropTypes.object,
  chemotypeLookup: PropTypes.object,
  smallMoleculeLookup: PropTypes.object,
  // MS2 Peak Additions
  ms2Peaks: PropTypes.array,
  selectedMs1Peak: PropTypes.object,
  ms2Lookup: PropTypes.object,
};

export default memo(FilterableMassSpectrumChromatogram);
