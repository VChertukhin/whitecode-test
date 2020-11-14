import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { composeWithDevTools as composeWithRemoteDevTools } from 'remote-redux-devtools';

import { isWeb } from '@utils';
import rootReducer from '@redux/reducer';

const store = (
    isWeb()
        ? createStore(rootReducer, composeWithDevTools(applyMiddleware(
            ThunkMiddleware,
        )))
        : createStore(rootReducer, composeWithRemoteDevTools(applyMiddleware(
            ThunkMiddleware,
        )))
);

export default store;
