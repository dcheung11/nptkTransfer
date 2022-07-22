/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { memo, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import TaxonomyForm from '../../components/Forms/TaxonomyForm';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import taxonomySaga from '../test2/sagas';
import taxonomyReducer from '../test2/reducers';
import { createTaxonomyNodeRequest } from '../test2/actions';

const strainBody = require('../test2/sagatest.json');

function TaxonomyFormWithSubmission(props) {
  const key = 'test2';
  useInjectSaga({ key, saga: taxonomySaga });
  useInjectReducer({ key, reducer: taxonomyReducer });

  const [parentTaxonomyId, setParentTaxonomyId] = useState('');
  const [taxRank, setTaxRank] = useState('');
  const [taxName, setTaxName] = useState('');
  const [showTaxonomyForm, setShowTaxonomyForm] = useState(props.showTaxonomyForm);

  const numParentTaxonomyId = Number(parentTaxonomyId);

  const currentForm = {
    parent_taxonomy_id: numParentTaxonomyId,
    rank: taxRank,
    name: taxName,
  };
  const dispatch = useDispatch();
  /*
    Creating Items
  */

  const handleTaxonomySubmit = () => {
    setShowTaxonomyForm(false);
    props.setShowTaxonomyForm(showTaxonomyForm);
    dispatch(
      createTaxonomyNodeRequest({
        bearerToken: localStorage.token,
        ...currentForm,
      }),
    );
    setParentTaxonomyId();
    setTaxRank('');
    setTaxName('');
  };

  const handleTaxonomyCancel = () => {
    setShowTaxonomyForm(false);
    props.setShowTaxonomyForm(showTaxonomyForm);
  };

  /*
   Fetch Form Data for LIMS
 */

  return (
    <Modal
      title="Add Taxonomy Node"
      visible={props.showTaxonomyForm}
      width="60%"
      onOk={handleTaxonomySubmit}
      onCancel={handleTaxonomyCancel}
      okText="Submit"
    >
      <TaxonomyForm
        parentTaxonomyId={parentTaxonomyId}
        rank={taxRank}
        name={taxName}
        setParentTaxonomyId={setParentTaxonomyId}
        setRank={setTaxRank}
        setName={setTaxName}
      />
    </Modal>
  );
}

export default withRouter(memo(TaxonomyFormWithSubmission));
