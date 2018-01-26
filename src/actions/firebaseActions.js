import firebase, { auth } from '../firebase';
import {
  endAddCompany,
  endEditCompany,
  endAddEmployee,
  endEditEmployee
} from './appActions';

function getUID() {
  return auth.currentUser.uid;
}

export function addCompany(company) {
  return dispatch =>
    firebase
      .push(`/users/${getUID()}/companies/`, {
        ...company
      })
      .then(() => dispatch(endAddCompany()));
}

export function updateCompany(company) {
  return dispatch =>
    firebase
      .ref(`/users/${getUID()}/companies/${company.id}`)
      .update({
        ...company
      })
      .then(() => dispatch(endEditCompany(company.id)));
}

export function deleteCompany(companyId) {
  return () =>
    firebase.ref(`/users/${getUID()}/companies/${companyId}`).remove();
}

export function addEmployee(companyId, employee) {
  return dispatch =>
    firebase
      .push(`/users/${getUID()}/companies/${companyId}/employees/`, {
        ...employee
      })
      .then(() => dispatch(endAddEmployee(companyId)));
}

export function updateEmployee(companyId, employee) {
  return dispatch =>
    firebase
      .ref(`/users/${getUID()}/companies/${companyId}/employees/${employee.id}`)
      .update({
        ...employee
      })
      .then(() => dispatch(endEditEmployee(companyId, employee.id)));
}

export function deleteEmployee(companyId, employeeId) {
  return () =>
    firebase
      .ref(`/users/${getUID()}/companies/${companyId}/employees/${employeeId}`)
      .remove();
}

export function login() {
  return () => firebase.login({ provider: 'google', type: 'popup' });
}

export function logout() {
  return () => firebase.logout();
}
