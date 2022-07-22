import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import scrollIntoView from 'scroll-into-view';
import MicroWellPlatePassport from '../../components/Passports/MicroWellPlatePassport';
import { useInjectSaga } from '../../utils/injectSaga';
import plateSaga from '../../data/cactus/plate/sagas';
import { useInjectReducer } from '../../utils/injectReducer';
import plateReducer from '../../data/cactus/plate/reducers';
import { fetchPlate } from '../../data/cactus/plate/actions';
import {
  fetchExtractChemotypes,
  fetchExtractMetadata,
  fetchExtractSmallmolecules,
  fetchUniquePeaks,
} from '../../data/cactus/extract/actions';
import extractSaga from '../../data/cactus/extract/sagas';
import extractReducer from '../../data/cactus/extract/reducer';
import {
  makeSelectPlate,
  makeSelectPlateLoading,
} from '../../data/cactus/plate/selectors';
import {
  makeSelectExtractSmallMolecules,
  makeSelectSmallMoleculesLoading,
  makeSelectExtractChemotypes,
  makeSelectUniquePeaksLoading,
  makeSelectExtractUniquePeaks,
  makeSelectChemotypeLoading,
  makeSelectExtractMetadata,
  makeSelectMetadataLoading,
} from '../../data/cactus/extract/selectors';
import ms1Saga from '../../data/cactus/ms1_peak/sagas';
import ms1Reducer from '../../data/cactus/ms1_peak/reducer';
import { fetchMs2Ions } from '../../data/cactus/ms1_peak/actions';
import { makeSelectMs2Ions } from '../../data/cactus/ms1_peak/selectors';

function MicroWellPlatePassportPage(props) {
  const { plateId } = useParams();
  useInjectSaga({ key: 'plate', saga: plateSaga });
  useInjectReducer({ key: 'plate', reducer: plateReducer });
  useInjectSaga({ key: 'extract', saga: extractSaga });
  useInjectReducer({ key: 'extract', reducer: extractReducer });
  useInjectSaga({ key: 'ms1peak', saga: ms1Saga });
  useInjectReducer({ key: 'ms1peak', reducer: ms1Reducer });
  const dispatch = useDispatch();
  const [extractId, setExtractId] = useState(null);
  const [ms1Peak, setMs1Peak] = useState({});

  /* Selectors */
  /* MS2 */
  const selectMs2Ions = makeSelectMs2Ions();
  const ms2Ions = useSelector(selectMs2Ions);

  /* Plate */
  const selectPlateLoading = makeSelectPlateLoading();
  const plateLoading = useSelector(selectPlateLoading);
  const selectPlate = makeSelectPlate();
  const plate = useSelector(selectPlate);

  /* Unique Maple Peaks by extract ID */
  const selectUniquePeaksLoading = makeSelectUniquePeaksLoading();
  const uniquePeaksLoading = useSelector(selectUniquePeaksLoading);
  const selectExtractUniquePeaks = makeSelectExtractUniquePeaks(extractId);
  const extractUniquePeaks = useSelector(selectExtractUniquePeaks);

  /* Maple confident Small Molecules by Extract ID */
  const selectSmallMoleculesLoading = makeSelectSmallMoleculesLoading();
  const smallMoleculesLoading = useSelector(selectSmallMoleculesLoading);
  const selectExtractSmallMolecules = makeSelectExtractSmallMolecules(
    extractId,
  );
  const extractSmallMolecules = useSelector(selectExtractSmallMolecules);

  /* Pear Chemotyped Peaks by Extract ID */
  const selectChemotypeLoading = makeSelectChemotypeLoading();
  const chemotypeLoading = useSelector(selectChemotypeLoading);
  const selectExtractChemotypes = makeSelectExtractChemotypes(extractId);
  const extractChemotypes = useSelector(selectExtractChemotypes);

  /* All Extract Metadata */
  const selectMetaDataLoading = makeSelectMetadataLoading();
  const metadataLoading = useSelector(selectMetaDataLoading);
  const selectExtractMetadata = makeSelectExtractMetadata(extractId);
  const extractMetadata = useSelector(selectExtractMetadata);

  /* Fetch Plate */
  useEffect(() => {
    dispatch(
      fetchPlate({
        bearerToken: localStorage.token,
        plateId,
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

  /* Extract Info Fetching */
  useEffect(() => {
    dispatch(
      fetchUniquePeaks({
        extractId,
        bearerToken: localStorage.token,
      }),
    );
    dispatch(
      fetchExtractSmallmolecules({
        bearerToken: localStorage.token,
        extractId,
      }),
    );
    dispatch(
      fetchExtractChemotypes({
        bearerToken: localStorage.token,
        extractId,
      }),
    );
    dispatch(
      fetchExtractMetadata({
        bearerToken: localStorage.token,
        extractId,
      }),
    );
  }, [extractId]);

  /* Handlers */
  const wellClickHandler = microwell => {
    /* Set the extract */
    const microWellExtract = microwell.extract_id;
    setExtractId(microWellExtract);
  };

  /* Mass Spec Handlers */
  const massSpecOnEvents = {
    click: x => {
      if (x.componentType === 'markPoint') {
        scrollIntoView(
          document.querySelector(`.maple-peak-id-${x.data.maple_peak_id}`),
          {
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
    <MicroWellPlatePassport
      massSpecOnEvents={massSpecOnEvents}
      activity={
        (!!plate[plateId] &&
          !!plate[plateId][plateId] &&
          Object.values(plate[plateId][plateId])
            .filter(x => x.extract_id === extractId)
            .map(x => x.activities)[0]) ||
        []
      }
      plateId={plateId}
      plateWells={
        (!!plate[plateId] &&
          !!plate[plateId][plateId] &&
          plate[plateId][plateId]) ||
        {}
      }
      wellClickHandler={wellClickHandler}
      uniquePeaks={
        (!!extractUniquePeaks &&
          !!extractUniquePeaks[0] &&
          extractUniquePeaks[0].maple_peaks) ||
        []
      }
      chemotypeLookup={
        (!!extractChemotypes &&
          Object.fromEntries(
            new Map(extractChemotypes.map(x => [x.ms1_peak_id, x.chemotype])),
          )) ||
        {}
      }
      smallMoleculeLookup={
        (!!extractSmallMolecules &&
          !!extractSmallMolecules[0] &&
          Object.fromEntries(
            new Map(
              extractSmallMolecules[0].sm_matches.map(x => [
                x.maple_peak_id,
                x,
              ]),
            ),
          )) ||
        {}
      }
      extractsMetadata={
        (!!extractMetadata &&
          !!extractMetadata.culture &&
          Object.fromEntries(
            new Map(
              extractMetadata.culture.extract.map(x => [x.extract_id, x]),
            ),
          )) ||
        {}
      }
      cultureMetadata={
        (!!extractMetadata &&
          !!extractMetadata.culture &&
          Object.values(extractMetadata.culture.culture_has_strain)[0]) ||
        {}
      }
      extractId={extractId}
      rtMin={1200}
      rtMax={50}
      uniquePeaksLoading={uniquePeaksLoading}
      ms2Peaks={ms2Ions.ms2_ion || []}
      ms2Lookup={{}}
      selectedMs1Peak={ms1Peak}
    />
  );
}

MicroWellPlatePassportPage.propTypes = {};

export default memo(MicroWellPlatePassportPage);
