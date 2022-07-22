import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import scrollIntoView from 'scroll-into-view';
import { useInjectSaga } from '../../utils/injectSaga';
import extractSaga from '../../data/cactus/extract/sagas';
import ms1Saga from '../../data/cactus/ms1_peak/sagas';
import { useInjectReducer } from '../../utils/injectReducer';
import extractReducer from '../../data/cactus/extract/reducer';
import ms1Reducer from '../../data/cactus/ms1_peak/reducer';
import {
  fetchExtractMetadata,
  fetchExtractActivity,
  fetchExtractSmallmolecules,
  fetchUniquePeaks,
  fetchExtractChemotypes,
  fetchExtractMalariaAssay,
  fetchExtractTbAssay,
} from '../../data/cactus/extract/actions';
import { fetchMs2Ions } from '../../data/cactus/ms1_peak/actions';
import {
  makeSelectUniquePeaksLoading,
  makeSelectUniquePeaks,
  makeSelectSmallMoleculesLoading,
  makeSelectSmallMolecules,
  makeSelectMetadataLoading,
  makeSelectMetadata,
  makeSelectActivityLoading,
  makeSelectActivity,
  makeSelectChemotypeLoading,
  makeSelectChemotypes,
} from '../../data/cactus/extract/selectors';
import { makeSelectMs2Ions } from '../../data/cactus/ms1_peak/selectors';
import ExtractPassport from '../../components/Passports/ExtractPassport';

function ExtractPassportPage(props) {
  const { extractId } = useParams();
  useInjectSaga({ key: 'extract', saga: extractSaga });
  useInjectReducer({ key: 'extract', reducer: extractReducer });
  useInjectSaga({ key: 'ms1peak', saga: ms1Saga });
  useInjectReducer({ key: 'ms1peak', reducer: ms1Reducer });
  const dispatch = useDispatch();
  const [ms1Peak, setMs1Peak] = useState({});

  /* Fetch Metadata */

  useEffect(() => {
    dispatch(
      fetchExtractMetadata({
        bearerToken: localStorage.token,
        extractId,
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(
      fetchExtractActivity({
        bearerToken: localStorage.token,
        extractId,
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(
      fetchExtractSmallmolecules({
        bearerToken: localStorage.token,
        extractId,
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(
      fetchUniquePeaks({
        bearerToken: localStorage.token,
        extractId,
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(
      fetchExtractChemotypes({
        bearerToken: localStorage.token,
        extractId,
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(
      fetchExtractMalariaAssay({
        bearerToken: localStorage.token,
        extractId,
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(
      fetchExtractTbAssay({
        bearerToken: localStorage.token,
        extractId,
      }),
    );
  }, []);

  /* MS2 */
  useEffect(() => {
    !!ms1Peak.maple_peak_id &&
      dispatch(
        fetchMs2Ions({
          ms1PeakId: ms1Peak.maple_peak_id,
          bearerToken: localStorage.token,
        }),
      );
    return undefined;
  }, [ms1Peak]);

  /* Selectors */

  const selectUniquePeaksLoading = makeSelectUniquePeaksLoading();
  const uniquePeaksLoading = useSelector(selectUniquePeaksLoading);
  const selectUniquePeaks = makeSelectUniquePeaks();
  const uniquePeaks = useSelector(selectUniquePeaks);

  const selectSmallMoleculesLoading = makeSelectSmallMoleculesLoading();
  const smallMoleculesLoading = useSelector(selectSmallMoleculesLoading);
  const selectSmallMolecules = makeSelectSmallMolecules();
  const smallMolecules = useSelector(selectSmallMolecules);

  const selectMetadataLoading = makeSelectMetadataLoading();
  const metadataLoading = useSelector(selectMetadataLoading);
  const selectMetadata = makeSelectMetadata();
  const metadata = useSelector(selectMetadata);

  const selectActivityLoading = makeSelectActivityLoading();
  const activityLoading = useSelector(selectActivityLoading);
  const selectActivity = makeSelectActivity();
  const activity = useSelector(selectActivity);

  const selectChemotypeLoading = makeSelectChemotypeLoading();
  const chemotypeLoading = useSelector(selectChemotypeLoading);
  const selectChemotypes = makeSelectChemotypes();
  const chemotypes = useSelector(selectChemotypes);

  const selectMs2Ions = makeSelectMs2Ions();
  const ms2Ions = useSelector(selectMs2Ions);

  const massSpecOnEvents = {
    click: x => {
      if (x.componentType === 'markPoint') {
        // Reset Table Colours
        const table = document.querySelectorAll(`[style*='lightgrey']`);
        for (let i = 0; i < table.length; i += 1)
          table[i].style.backgroundColor = 'white';
        // Highlighting row in table
        const row = document.querySelector(
          `.maple-peak-id-${x.data.maple_peak_id}`,
        );
        if (row != null) row.style.backgroundColor = 'lightgrey';

        scrollIntoView(
          document.querySelector(`.maple-peak-id-${x.data.maple_peak_id}`),
          {
            time: 1500,
            align: {
              top: 0,
            },
          },
        );
      }
      if (x.componentType === 'series') {
        setMs1Peak(x.data);
      }
    },
  };

  return (
    <ExtractPassport
      massSpecOnEvents={massSpecOnEvents}
      activity={
        !!activity[extractId] && !!activity[extractId][extractId]
          ? activity[extractId][extractId].activities
          : []
      }
      chemotypeLookup={
        (!!chemotypes[extractId] &&
          Object.fromEntries(
            new Map(
              chemotypes[extractId].map(x => [x.ms1_peak_id, x.chemotype]),
            ),
          )) ||
        {}
      }
      peaks={
        (!!uniquePeaks[extractId] &&
          !!uniquePeaks[extractId][0] &&
          uniquePeaks[extractId][0].maple_peaks) ||
        []
      }
      smallMolecules={
        (!!smallMolecules[extractId] &&
          Object.fromEntries(
            new Map(
              smallMolecules[extractId].map(x => [extractId, x.sm_matches]),
            ),
          )[extractId]) ||
        []
      }
      extractsMetadata={
        (!!metadata[extractId] &&
          !!metadata[extractId].culture &&
          Object.fromEntries(
            new Map(
              metadata[extractId].culture.extract.map(x => [x.extract_id, x]),
            ),
          )) ||
        {}
      }
      cultureMetadata={
        !!metadata[extractId] && !!metadata[extractId].culture
          ? Object.values(metadata[extractId].culture.culture_has_strain)[0]
          : {}
      }
      extractId={extractId}
      rtMax={1200}
      rtMin={50}
      uniquePeaksLoading={uniquePeaksLoading}
      ms2Peaks={ms2Ions.ms2_ion || []}
      ms2Lookup={{}}
      selectedMs1Peak={ms1Peak}
    />
  );
}

export default memo(ExtractPassportPage);
