import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import CultureForm from '../../components/Forms/CultureForm';
import { useInjectSaga } from '../../utils/injectSaga';
import limsSaga from '../../data/cactus/lims/sagas';
import { useInjectReducer } from '../../utils/injectReducer';
import limsReducer from '../../data/cactus/lims/reducers';
import {
  createCulture,
  createOrganization,
  createExperimentalClass,
  createMediaType,
  fetchCultureMedium,
  fetchExperimentClasses,
  fetchOrganizationIds,
  fetchMe,
} from '../../data/cactus/lims/actions';
import {
  makeSelectCreateExperimentalClassLoading,
  makeSelectCreateMediaTypeLoading,
  makeSelectCreateOrganizationLoading,
  makeSelectCultureMedium,
  makeSelectExperimentalClass,
  makeSelectMe,
  makeSelectOrganizationIds,
} from '../../data/cactus/lims/selectors';

function CultureFormWithSubmission(props) {
  useInjectSaga({ key: 'lims', saga: limsSaga });
  useInjectReducer({ key: 'lims', reducer: limsReducer });
  const [culturalMedium, setCulturalMedium] = useState({});
  const [inoculationDate, setInoculationDate] = useState(moment());
  const [researcher, setResearcher] = useState({});
  const [organization, setOrganization] = useState({});
  const [experimentalClass, setExperimentalClass] = useState({});
  const [fermentationVolume, setFermentationVolume] = useState(0);
  const [fermentationTemperature, setFermentationTemperature] = useState(0);
  const [replicons, setReplicons] = useState(0);
  const [comments, setComments] = useState('');
  const currentForm = [
    {
      taxonomy: {
        taxonomy_id: parseInt(props.taxonomyId, 10),
      },
      culture: {
        medium_id: culturalMedium.culture_medium_id,
        inoculation_date:
          !!inoculationDate && inoculationDate.format('YYYY-MM-DD'),
        researcher_id: researcher.user_details_id,
        organization_id: organization.organization_id,
        experiment_class_id: experimentalClass.experiment_class_id,
        fermentation_volume: fermentationVolume,
        fermentation_temperature: fermentationTemperature,
        replicons,
        comments,
      },
    },
  ];
  const dispatch = useDispatch();
  /*
    Creating Items
  */

  function createCulturalMedium(name) {
    dispatch(
      createMediaType({
        bearerToken: localStorage.token,
        mediaName: name,
      }),
    );
    getCultureMedium();
  }

  function createNewOrganization(name) {
    dispatch(
      createOrganization({
        bearerToken: localStorage.token,
        organizationName: name,
      }),
    );
    getOrganizationIds();
  }

  function createNewExperimentalClass(name) {
    dispatch(
      createExperimentalClass({
        bearerToken: localStorage.token,
        className: name,
      }),
    );
    getExperimentClass();
  }

  const handleCultureSubmit = () => {
    props.setShowCultureForm(false);
    dispatch(
      createCulture({ bearerToken: localStorage.token, formData: currentForm }),
    );
    setCulturalMedium({});
    setInoculationDate(moment());
    setOrganization({});
    setExperimentalClass({});
    setFermentationVolume(0);
    setFermentationTemperature(0);
    setReplicons(0);
    setComments('');
  };

  const handleCultureCancel = () => {
    props.setShowCultureForm(false);
  };

  /*
  Selecting Data from Store
  */
  const selectCultureMedium = makeSelectCultureMedium();
  const cultureMedia = useSelector(selectCultureMedium);

  const selectExperimentalClass = makeSelectExperimentalClass();
  const experimentalClasses = useSelector(selectExperimentalClass);

  const selectOrganizationIds = makeSelectOrganizationIds();
  const organizationIds = useSelector(selectOrganizationIds);

  const selectCreateExperimentalClassLoading = makeSelectCreateExperimentalClassLoading();
  const createExperimentalClassLoading = useSelector(
    selectCreateExperimentalClassLoading,
  );

  const selectCreateMediaTypeLoading = makeSelectCreateMediaTypeLoading();
  const createMediaTypeLoading = useSelector(selectCreateMediaTypeLoading);

  const selectCreateOrganizationLoading = makeSelectCreateOrganizationLoading();
  const createOrganizationLoading = useSelector(
    selectCreateOrganizationLoading,
  );

  const selectMe = makeSelectMe();
  const me = useSelector(selectMe);

  useEffect(() => setResearcher(me), [me]);

  /*
   Fetch Form Data for LIMS
 */
  const getCultureMedium = () =>
    dispatch(
      fetchCultureMedium({
        bearerToken: localStorage.token,
        permissions: props.permissions,
      }),
    );
  useEffect(() => {
    getCultureMedium();
    return undefined;
  }, [props.permissions, createMediaTypeLoading]);

  const getExperimentClass = () =>
    dispatch(
      fetchExperimentClasses({
        bearerToken: localStorage.token,
        permissions: props.permissions,
      }),
    );
  useEffect(() => {
    getExperimentClass();
    return undefined;
  }, [props.permissions, createExperimentalClassLoading]);

  const getOrganizationIds = () =>
    dispatch(
      fetchOrganizationIds({
        bearerToken: localStorage.token,
        permissions: props.permissions,
      }),
    );
  useEffect(() => {
    getOrganizationIds();
    return undefined;
  }, [props.permissions, createOrganizationLoading]);

  const getMe = () =>
    dispatch(
      fetchMe({
        bearerToken: localStorage.token,
        permissions: props.permissions,
      }),
    );

  useEffect(() => {
    getMe();
    return undefined;
  }, [props.permissions]);

  return (
    <Modal
      title="Create Culture"
      visible={props.showCultureForm}
      width="60%"
      onOk={handleCultureSubmit}
      onCancel={handleCultureCancel}
      okText="Submit"
    >
      <CultureForm
        taxonomyId={props.taxonomyId}
        organizationIds={organizationIds}
        organization={organization}
        setOrganization={setOrganization}
        createOrganization={createNewOrganization}
        createOrganizationLoading={createOrganizationLoading}
        experimentalClasses={experimentalClasses}
        experimentalClass={experimentalClass}
        setExperimentalClass={setExperimentalClass}
        createExperimentalClass={createNewExperimentalClass}
        createExperimentalClassLoading={createExperimentalClassLoading}
        cultureMedia={cultureMedia || []}
        culturalMedium={culturalMedium}
        setCulturalMedium={setCulturalMedium}
        createCulturalMedium={createCulturalMedium}
        createCulturalMediumLoading={createMediaTypeLoading}
        inoculationDate={inoculationDate}
        setInoculationDate={setInoculationDate}
        researcher={researcher}
        fermentationVolume={fermentationVolume}
        setFermentationVolume={setFermentationVolume}
        fermentationTemperature={fermentationTemperature}
        setFermentationTemperature={setFermentationTemperature}
        replicons={replicons}
        setReplicons={setReplicons}
        comments={comments}
        setComments={setComments}
      />
    </Modal>
  );
}

CultureFormWithSubmission.propTypes = {
  setShowCultureForm: PropTypes.func,
  showCultureForm: PropTypes.bool,
  taxonomyId: PropTypes.string,
  permissions: PropTypes.array,
};

export default memo(CultureFormWithSubmission);
