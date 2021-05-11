import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import radioReducer from './radio/reducer';
import { IReduxRadioState } from './radio/types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface ApplicationState {
  radio: IReduxRadioState;
}

export type AppThunk<R = void> = ThunkAction<
  R,
  ApplicationState,
  null,
  AnyAction
>;

const rootReducer = combineReducers({
  radio: radioReducer,
});

const composeEnhancers =
  (process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
