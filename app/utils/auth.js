import jwtDecode from 'jwt-decode';

export const getToken = () => localStorage.getItem('token');

export const getOrganizationId = () => localStorage.getItem('organizationId');

export const setToken = token => localStorage.setItem('token', token);

export const setOrganizationId = organizationId =>
  localStorage.setItem('organizationId', organizationId);

export const deleteToken = () => localStorage.removeItem('token');

export const deleteOrganizationId = () =>
  localStorage.removeItem('organizationId');

export const isAuthenticated = () => (getToken() ? verifyToken() : false);

export const verifyToken = () =>
  !!(Date.now() < jwtDecode(localStorage.token).exp * 1000);
