import { StatusBar } from 'expo-status-bar';
import React, { FunctionComponent } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import store from '@redux/store';
import { Navigator } from '@components';

const App: FunctionComponent = () => (
    <ReduxProvider store={store}>
        <SafeAreaProvider>
            <IconRegistry icons={EvaIconsPack} />

            <ApplicationProvider {...eva} theme={eva.light}>
                <Navigator />

                <StatusBar />
            </ApplicationProvider>
        </SafeAreaProvider>
    </ReduxProvider>
);

export default App;
