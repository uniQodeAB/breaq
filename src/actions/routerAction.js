export default function route(path) {
  return dispatch => {
    dispatch({ type: 'ROUTE', payload: path });
  };
}
