import {
  FAILED_ACTIVITIES,
  FAILED_ACTIVITY_COUNTS,
  FETCH_ACTIVITIES,
  FETCH_ACTIVITY_COUNTS,
  SUCCESS_ACTIVITIES,
  SUCCESS_ACTIVITY_COUNTS,
  FAILED_EXTRACT_COUNTS,
  FETCH_EXTRACT_COUNTS,
  SUCCESS_EXTRACT_COUNTS,
} from './constants';

export function fetchActivities(query) {
  return {
    type: FETCH_ACTIVITIES,
    query,
  };
}

export function fetchActivityCounts(query) {
  return {
    type: FETCH_ACTIVITY_COUNTS,
    query,
  };
}

export function fetchExtractCounts(query) {
  return {
    type: FETCH_EXTRACT_COUNTS,
    query,
  };
}

export function failedActivities(err) {
  return {
    type: FAILED_ACTIVITIES,
    err,
  };
}

export function failedActivityCounts(err) {
  return {
    type: FAILED_ACTIVITY_COUNTS,
    err,
  };
}

export function failedExtractCounts(err) {
  return {
    type: FAILED_EXTRACT_COUNTS,
    err,
  };
}

export function successActivities(activitiesData) {
  return {
    type: SUCCESS_ACTIVITIES,
    activitiesData,
  };
}

export function successActivityCounts(countData) {
  return {
    type: SUCCESS_ACTIVITY_COUNTS,
    countData,
  };
}

export function successExtractCounts(countData) {
  return {
    type: SUCCESS_EXTRACT_COUNTS,
    countData,
  };
}
