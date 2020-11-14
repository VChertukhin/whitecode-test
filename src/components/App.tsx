import { StatusBar } from 'expo-status-bar';
import React, { FunctionComponent } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigator } from '@components';

const App: FunctionComponent = () => {
    return (
        <SafeAreaProvider>
            <Navigator />
            <StatusBar />
        </SafeAreaProvider>
    );
};

export default App;
