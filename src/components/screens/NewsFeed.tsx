import React, { FunctionComponent } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Screens } from '@interfaces';

const NewsFeed: FunctionComponent = () => {
    const { navigate } = useNavigation();

    const pressHandler = () => navigate(Screens.NewsFeedElement);

    return (
        <View style={styles.newsfeedView}>
            <Button
                title="move to element"
                onPress={pressHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    newsfeedView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default NewsFeed;
