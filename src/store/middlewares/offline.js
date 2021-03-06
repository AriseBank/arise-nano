import actionsType from '../../constants/actions';
import { successToastDisplayed, errorToastDisplayed } from '../../actions/toaster';
import { loadingStarted, loadingFinished } from '../../utils/loading';

const getErrorMessage = (errorCode, address) => {
  let message = `Failed to connect to node ${address}`;
  switch (errorCode) {
    case 'EUNAVAILABLE':
      message = `Failed to connect: Node ${address} is not active`;
      break;
    case 'EPARSE':
      message += ' Make sure that you are using the latest version of Arise Nano.';
      break;
    default: break;
  }
  return message;
};

const offlineMiddleware = store => next => (action) => {
  const state = store.getState();
  switch (action.type) {
    case actionsType.activePeerUpdate:
      if (action.data.online === false && state.peers.status.online === true) {
        const address = `${state.peers.data.currentPeer}:${state.peers.data.port}`;
        const label = getErrorMessage(action.data.code, address);
        store.dispatch(errorToastDisplayed({ label }));
        loadingStarted('offline');
      } else if (action.data.online === true && state.peers.status.online === false) {
        store.dispatch(successToastDisplayed({ label: 'Connection re-established' }));
        loadingFinished('offline');
      }
      if (action.data.online !== state.peers.status.online) {
        next(action);
      }
      break;
    default:
      next(action);
      break;
  }
};

export default offlineMiddleware;
