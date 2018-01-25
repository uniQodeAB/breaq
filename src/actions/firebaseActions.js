import firebase from '../firebase';
import { endAddCompany, endEditCompany } from './appActions';

export const DELETE_COMPANY = 'DELETE_COMPANY';
export function deleteCompany(user, companyId) {
  firebase.ref(`/users/${user.uid}/companies/${companyId}`).remove();

  return dispatch => {
    dispatch({ type: DELETE_COMPANY });
  };
}

export function addCompany(user, company) {
  return dispatch =>
    firebase
      .push(`/users/${user.uid}/companies/`, {
        ...company
      })
      .then(() => dispatch(endAddCompany()));
}

export function updateCompany(user, company) {
  return dispatch =>
    firebase
      .ref(`/users/${user.uid}/companies/${company.id}`)
      .update({
        ...company
      })
      .then(() => dispatch(endEditCompany(company.id)));
}
