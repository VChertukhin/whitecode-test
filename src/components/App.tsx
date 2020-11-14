import { StatusBar } from 'expo-status-bar';
import React, { FunctionComponent } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import store from '@redux/store';
import { Navigator } from '@components';

const App: FunctionComponent = () => {
    return (
        <ReduxProvider store={store}>
            <SafeAreaProvider>
                <Navigator />
                <StatusBar />
            </SafeAreaProvider>
        </ReduxProvider>
    );
};

export default App;
