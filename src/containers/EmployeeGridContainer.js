import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import EmployeeGrid from '../components/EmployeeGrid';

export default compose(
  firestoreConnect((props, store) => {
    const { auth } = store.getState().firebase;
    const { companyId } = props;

    return auth
      ? [
          {
            path: `employees/${companyId}`,
            collection: `users/${auth.uid}/employees`,
            where: ['belongsToCompany', '==', companyId],
            storeAs: `employees/${companyId}`
          }
        ]
      : [];
  }),
  connect(({ firestore: { ordered } }, { companyId }) => ({
    employees: ordered[`employees/${companyId}`] || []
  }))
)(EmployeeGrid);
