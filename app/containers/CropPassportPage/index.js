import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import CropPassport from '../../components/Passports/CropPassport';
import CropReducer from '../../data/cactus/crop/reducers';
import CropSaga from '../../data/cactus/crop/sagas';
import {
  makeSelectDiseaseMetadata,
  makeSelectCropDiseaseLoading,
  makeSelectCropDetailLoading,
  makeSelectCropDetails,
  makeSelectCropMetagenomic,
  makeSelectCropMetagenomicLoading,
} from '../../data/cactus/crop/selectors';
import {
  fetchCropDisease,
  fetchCropDetails,
  fetchCropMetagenomic,
} from '../../data/cactus/crop/actions';

function CropPassportPage(props) {
  const { cropId } = useParams();
  useInjectSaga({ key: 'crop', saga: CropSaga });
  useInjectReducer({ key: 'crop', reducer: CropReducer });
  const dispatch = useDispatch();

  /* Fetch Data */
  useEffect(() => {
    dispatch(
      fetchCropDisease({
        bearerToken: localStorage.token,
        cropId,
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(
      fetchCropDetails({
        bearerToken: localStorage.token,
        cropId,
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(
      fetchCropMetagenomic({
        bearerToken: localStorage.token,
        cropId,
      }),
    );
  }, []);

  /* Selectors */
  const selectCropDiseaseLoading = makeSelectCropDiseaseLoading();
  const diseaseLoading = useSelector(selectCropDiseaseLoading);
  const selectCropDisease = makeSelectDiseaseMetadata();
  const diseaseMetadata = useSelector(selectCropDisease)[cropId];

  const selectCropDetailLoading = makeSelectCropDetailLoading();
  const cropDetailLoading = useSelector(selectCropDetailLoading);
  const selectCropDetails = makeSelectCropDetails();
  const cropDetails = useSelector(selectCropDetails);

  const selectCropMetagenomicLoading = makeSelectCropMetagenomicLoading();
  const cropMetagenomicLoading = useSelector(selectCropMetagenomicLoading);
  const selectCropMetagenomic = makeSelectCropMetagenomic();
  const cropMetagenomic = useSelector(selectCropMetagenomic);

  return (
    <CropPassport
      cropId={parseInt(cropId)}
      cropName={cropDetails.common_name || 'Crop'}
      cropDetailLoading={cropDetailLoading}
      cropMetadata={cropDetails}
      diseaseLoading={diseaseLoading}
      diseaseMetadata={diseaseMetadata}
      cropMetagenomic={cropMetagenomic}
      cropMetagenomicLoading={cropMetagenomicLoading}
    />
  );
}

export default memo(CropPassportPage);
