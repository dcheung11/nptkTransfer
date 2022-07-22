import produce from 'immer';
import {
  FETCH_ACTIVITY_COUNTS,
  FETCH_ACTIVITIES,
  FAILED_ACTIVITIES,
  FAILED_ACTIVITY_COUNTS,
  SUCCESS_ACTIVITIES,
  SUCCESS_ACTIVITY_COUNTS,
  FETCH_EXTRACT_COUNTS,
  SUCCESS_EXTRACT_COUNTS,
  FAILED_EXTRACT_COUNTS,
} from './constants';

export const initialState = {
  activitiesLoading: false,
  activities: [],
  activityCountsLoading: false,
  activityCounts: [],
  extractCountsLoading: false,
  extractCounts: [],
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const taxonomyLoaderBoardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_ACTIVITIES:
        draft.activitiesLoading = true;
        break;
      case FETCH_ACTIVITY_COUNTS:
        draft.activityCountsLoading = true;
        break;
      case FETCH_EXTRACT_COUNTS:
        draft.extractCountsLoading = true;
        break;
      case SUCCESS_ACTIVITIES:
        draft.activitiesLoading = false;
        draft.activities = action.activitiesData;
        break;
      case SUCCESS_ACTIVITY_COUNTS:
        draft.activityCountsLoading = false;
        draft.activityCounts = action.countData;
        break;
      case SUCCESS_EXTRACT_COUNTS:
        draft.extractCountsLoading = false;
        draft.extractCounts = action.countData;
        break;
      case FAILED_ACTIVITIES:
        draft.activitiesLoading = false;
        draft.error = action.err;
        break;
      case FAILED_ACTIVITY_COUNTS:
        draft.activityCountsLoading = false;
        draft.error = action.err;
        break;
      case FAILED_EXTRACT_COUNTS:
        draft.extractCountsLoading = false;
        draft.error = action.err;
        break;
    }
  });

export default taxonomyLoaderBoardReducer;
