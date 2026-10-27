import registerRootComponent from 'expo/build/launch/registerRootComponent';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './src/store/store';

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

registerRootComponent(Root);
