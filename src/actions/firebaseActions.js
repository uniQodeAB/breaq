import firebase, { auth, firestore } from '../firebase';
import {
  endAddCompany,
  endEditCompany,
  endAddEmployee,
  endEditEmployee
} from './appActions';

const getUID = () => auth.currentUser.uid;
const getUserRef = () => firestore.collection('users').doc(getUID());
const getCompaniesRef = () => getUserRef().collection('companies');
const getEmployeesRef = () => getUserRef().collection('employees');

export const addCompany = company => {
  const newCompanyRef = getCompaniesRef().doc();

  return dispatch =>
    newCompanyRef
      .set({
        ...company,
        id: newCompanyRef.id
      })
      .then(() => dispatch(endAddCompany()));
};

export const updateCompany = company => {
  const companyRef = getCompaniesRef().doc(company.id);

  return dispatch =>
    companyRef
      .update({
        ...company
      })
      .then(() => dispatch(endEditCompany(company.id)));
};

export const deleteCompany = companyId => () =>
  getCompaniesRef()
    .doc(companyId)
    .delete();

export const addEmployee = (companyId, employee) => {
  const employeeRef = getEmployeesRef().doc();

  return dispatch => {
    employeeRef
      .set({
        ...employee,
        id: employeeRef.id,
        belongsToCompany: companyId
      })
      .then(() => dispatch(endAddEmployee(companyId)));
  };
};

export const updateEmployee = (companyId, employee) => dispatch =>
  getEmployeesRef()
    .doc(employee.id)
    .update({
      ...employee
    })
    .then(() => dispatch(endEditEmployee(companyId, employee.id)));

export const deleteEmployee = (companyId, employeeId) => () =>
  getEmployeesRef()
    .doc(employeeId)
    .delete();

export const login = () => () =>
  firebase.login({ provider: 'google', type: 'popup' });
export const logout = () => () => firebase.logout();
