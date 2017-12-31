import React from 'react';
import SearchBox from '../components/SearchBox';
import { isEmpty } from 'react-redux-firebase';

const SearchBoxControls = ({
  cancelEditMode,
  onChangePlace,
  address,
  editMode,
  searchBoxPlaceholder
}) => {
  return (
    <div>
      {(isEmpty(address) || editMode) && (
        <div>
          <SearchBox
            onChangePlace={onChangePlace}
            placeholder={searchBoxPlaceholder}
          />

          {editMode && <button onClick={cancelEditMode}>Cancel</button>}
        </div>
      )}
    </div>
  );
};

export default SearchBoxControls;
