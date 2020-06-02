/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './configureStore';
import Login from './screens/Login';

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate 
                    loading={null}
                    persistor={persistor}
                >
                    <Login/>
                </PersistGate>
            </Provider>
        );
    }
}