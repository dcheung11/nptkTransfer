import { createSelector } from 'reselect';
import { initialState } from './reducers';

/**
 * Direct selector to the auth state domain
 */

const selectAuthDomain = state => state.auth || initialState;

/**
 * Other specific selectors
 */

const makeSelectSignInErrorMessage = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.error,
  );

const makeSelectUser = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.user,
  );

const makeSelectEmail = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.user.email,
  );

const makeSelectExpiry = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.user.exp,
  );

const makeSelectFirstName = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.user.first_name,
  );

const makeSelectLastName = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.user.last_name,
  );

const makeSelectInitials = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.user.initials,
  );

const makeSelectisActive = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.user.is_active,
  );

const makeSelectOrganizationId = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.user.organizationId,
  );

const makeSelectRole = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.user.role,
  );

const makeSelectUsername = () =>
  createSelector(
    selectAuthDomain,
    substate => substate.user.username,
  );

/**
 * Default selector used by Auth
 */

const makeSelectAuth = () =>
  createSelector(
    selectAuthDomain,
    substate => substate,
  );

export default makeSelectAuth;
export {
  selectAuthDomain,
  makeSelectSignInErrorMessage,
  makeSelectUser,
  makeSelectOrganizationId,
  makeSelectEmail,
  makeSelectExpiry,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectInitials,
  makeSelectisActive,
  makeSelectRole,
  makeSelectUsername,
};
