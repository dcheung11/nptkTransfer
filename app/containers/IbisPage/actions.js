import {
  LOAD_IBIS_RESPONSE,
  LOAD_IBIS_RESPONSE_ERROR,
  LOAD_IBIS_RESPONSE_SUCCESS,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_IBIS_RESPONSE
 */
export function loadIbisResponse(inputSequence) {
  return {
    type: LOAD_IBIS_RESPONSE,
    inputSequence,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {object} response The repository data
 *
 * @return {object}      An action object with a type of LOAD_IBIS_RESPONSE_ERROR passing the repos
 */
export function respLoaded(response) {
  return {
    type: LOAD_IBIS_RESPONSE_SUCCESS,
    response,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_IBIS_RESPONSE_SUCCESS passing the error
 */
export function respLoadingError(error) {
  return {
    type: LOAD_IBIS_RESPONSE_ERROR,
    error,
  };
}
