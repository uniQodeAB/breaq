import React from 'react';
import SearchBox from '../components/SearchBox';
import { isEmpty } from 'react-redux-firebase';

const SearchBoxControls = ({
  cancelEditMode,
  onChangePlace,
  address,
  editMode
}) => {
  return (
    <div>
      {(isEmpty(address) || editMode) && (
        <div>
          <SearchBox onChangePlace={onChangePlace} />

          {editMode && <button onClick={cancelEditMode}>Cancel</button>}
        </div>
      )}
    </div>
  );
};

export default SearchBoxControls;
