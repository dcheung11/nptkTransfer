import { createSelector } from 'reselect';
import { initialState } from './reducers';

/**
 * Direct selector to the submission state domain
 */

const selectSubmissionDomain = state => state.submission || initialState;

/**
 * Other specific selectors
 */

const makeSelectSubmissionId = () =>
  createSelector(
    selectSubmissionDomain,
    substate => substate.submissionId,
  );

const makeSelectReport = () =>
  createSelector(
    selectSubmissionDomain,
    substate => substate.report,
  );

const makeSelectResults = () =>
  createSelector(
    selectSubmissionDomain,
    substate => substate.report.results,
  );

const makeSelectPrismLoading = () =>
  createSelector(
    selectSubmissionDomain,
    substate => substate.prismLoading,
  );

const makeSelectMetadataLoading = () =>
  createSelector(
    selectSubmissionDomain,
    substate => substate.metadataLoading,
  );

const makeSelectMetadata = () =>
  createSelector(
    selectSubmissionDomain,
    substate => substate.metadata,
  );

const makeSelectOrfsLoading = () =>
  createSelector(
    selectSubmissionDomain,
    substate => substate.orfsLoading,
  );

const makeSelectOrfs = () =>
  createSelector(
    selectSubmissionDomain,
    substate => substate.orfs,
  );

const makeSelectClustersLoading = () =>
  createSelector(
    selectSubmissionDomain,
    substate => substate.clustersLoading,
  );

const makeSelectClusters = () =>
  createSelector(
    selectSubmissionDomain,
    substate => substate.clusters,
  );

/**
 * Default selector used by Submission
 */

const makeSelectSubmission = () =>
  createSelector(
    selectSubmissionDomain,
    substate => substate,
  );

export default makeSelectSubmission;
export {
  selectSubmissionDomain,
  makeSelectSubmissionId,
  makeSelectPrismLoading,
  makeSelectResults,
  makeSelectReport,
  makeSelectMetadataLoading,
  makeSelectMetadata,
  makeSelectOrfsLoading,
  makeSelectOrfs,
  makeSelectClustersLoading,
  makeSelectClusters,
};
