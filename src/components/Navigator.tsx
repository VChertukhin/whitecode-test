import * as Linking from 'expo-linking';
import React, { Fragment, FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Screens } from '@interfaces';
import { NotificationsRunner } from '@components';
import { NewsFeed, NewsFeedElement } from '@components/screens';

const StackNavigator = createStackNavigator();
const linkingConfig = {
    prefixes: [Linking.makeUrl('/')],
};

const Navigator: FunctionComponent = () => (
    <NavigationContainer linking={linkingConfig}>
        <StackNavigator.Navigator
            initialRouteName={Screens.NewsFeed}
            headerMode="none"
        >
            <StackNavigator.Screen
                name={Screens.NewsFeed}
                component={NewsFeed}
            />

            <StackNavigator.Screen
                name={Screens.NewsFeedElement}
                component={NewsFeedElement}
            />
        </StackNavigator.Navigator>
    </NavigationContainer>
);

export default Navigator;
