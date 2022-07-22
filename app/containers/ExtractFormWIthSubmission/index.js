import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import ExtractForm from '../../components/Forms/ExtractForm';
import { useInjectSaga } from '../../utils/injectSaga';
import limsSaga from '../../data/cactus/lims/sagas';
import { useInjectReducer } from '../../utils/injectReducer';
import limsReducer from '../../data/cactus/lims/reducers';
import {
  makeSelectCreateExtractionMethodLoading,
  makeSelectCreateExtractionSolventLoading,
  makeSelectExtractionMethods,
  makeSelectMe,
  makeSelectSolvents,
} from '../../data/cactus/lims/selectors';
import {
  fetchExtractionMethods,
  fetchExtractionSolvents,
  fetchMe,
  createExtractionSolvent,
  createExtractionMethod,
  createExtract,
} from '../../data/cactus/lims/actions';

function ExtractFormWithSubmission(props) {
  useInjectSaga({ key: 'lims', saga: limsSaga });
  useInjectReducer({ key: 'lims', reducer: limsReducer });
  const dispatch = useDispatch();

  /* Build Form for Submission */
  const [extractionDate, setExtractDate] = useState(moment());
  const [comments, setComments] = useState('');
  const [extractionMethod, setExtractionMethod] = useState({});
  const [extractionSolventVolume, setExtractSolventVolume] = useState(0);
  const [extractionSolvent, setExtractSolvent] = useState({});
  const [researcher, setResearcher] = useState({});
  const currentForm = [
    {
      culture_id: props.cultureId,
      extract: {
        extraction_date:
          !!extractionDate && extractionDate.format('YYYY-MM-DD'),
        comments,
        extract_extraction_method_id:
          !!extractionMethod && extractionMethod.extract_extraction_method_id,
        extract_extraction_solvent_id:
          extractionSolvent.extract_extraction_solvent_id,
        extraction_solvent_volume: extractionSolventVolume,
        organization_id: props.organizationId,
        researcher_id: researcher.user_details_id,
      },
    },
  ];

  /*
  Submission Methods
  */
  const handleExtractSubmit = () => {
    props.setShowExtractForm(false);
    dispatch(
      createExtract({ bearerToken: localStorage.token, formData: currentForm }),
    );
  };

  const handleExtractCancel = () => {
    props.setShowExtractForm(false);
  };

  /* Select Data from Redux Store */

  const selectExtractionMethods = makeSelectExtractionMethods();
  const extractionMethods = useSelector(selectExtractionMethods);

  const selectExtractionSolvents = makeSelectSolvents();
  const extractionSolvents = useSelector(selectExtractionSolvents);

  const selectMe = makeSelectMe();
  const me = useSelector(selectMe);

  const selectCreateExtractionSolventLoading = makeSelectCreateExtractionSolventLoading();
  const createExtractionSolventLoading = useSelector(
    selectCreateExtractionSolventLoading,
  );

  const selectCreateExtractionMethodLoading = makeSelectCreateExtractionMethodLoading();
  const createExtractionMethodLoading = useSelector(
    selectCreateExtractionMethodLoading,
  );

  useEffect(() => setResearcher(me), [me]);

  /*
  Fetch Form Data for LIMS
  */
  const getExtractionMethods = () =>
    dispatch(
      fetchExtractionMethods({
        bearerToken: localStorage.token,
        permissions: props.permissions,
      }),
    );

  useEffect(() => {
    getExtractionMethods();
    return undefined;
  }, [props.permissions, createExtractionMethodLoading]);

  const getExtractionSolvents = () =>
    dispatch(
      fetchExtractionSolvents({
        bearerToken: localStorage.token,
        permissions: props.permissions,
      }),
    );

  useEffect(() => {
    getExtractionSolvents();
    return undefined;
  }, [props.permissions, createExtractionSolventLoading]);

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

  /* Creating Items Functions */

  function createSolvent(extractionSolventLabel) {
    dispatch(
      createExtractionSolvent({
        bearerToken: localStorage.token,
        solventName: extractionSolventLabel,
      }),
    );
    getExtractionSolvents();
  }

  function createMethod(extractionMethodLabel) {
    dispatch(
      createExtractionMethod({
        bearerToken: localStorage.token,
        methodName: extractionMethodLabel,
      }),
    );
    getExtractionMethods();
  }

  return (
    <Modal
      title="Create Extract"
      visible={props.showExtractForm}
      width="60%"
      onOk={handleExtractSubmit}
      onCancel={handleExtractCancel}
      okText="Submit"
    >
      <ExtractForm
        cultureId={props.cultureId}
        extractionMethods={extractionMethods}
        extractionSolvents={extractionSolvents}
        extractionDate={extractionDate}
        setExtractDate={setExtractDate}
        extractMethod={extractionMethod}
        setExtractMethod={setExtractionMethod}
        createExtractionMethodLoading={createExtractionMethodLoading}
        createExtractionMethod={createMethod}
        extractSolvent={extractionSolvent}
        setExtractSolvent={setExtractSolvent}
        createExtractionSolventLoading={createExtractionSolventLoading}
        createExtractionSolvent={createSolvent}
        extractVolume={extractionSolventVolume}
        setExtractVolume={setExtractSolventVolume}
        comments={comments}
        setComments={setComments}
      />
    </Modal>
  );
}

ExtractFormWithSubmission.propTypes = {
  permissions: PropTypes.array,
  cultureId: PropTypes.number,
  setShowExtractForm: PropTypes.func,
  showExtractForm: PropTypes.bool,
  organizationId: PropTypes.string,
};

export default memo(ExtractFormWithSubmission);
