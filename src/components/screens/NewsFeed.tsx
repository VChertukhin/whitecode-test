import React, {
    FunctionComponent,
    useState,
    useEffect,
} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Screens } from '@interfaces';
import { AppActions } from '@redux/actions';
import { feedSelector } from '@redux/selectors';

const NewsFeed: FunctionComponent = () => {
    const { navigate } = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { items } = useSelector(feedSelector);

    useEffect(() => {
        dispatch(AppActions.FeedActions.fetchFeed());
    }, []);

    useEffect(() => {
        if (isLoading && items.length !== 0) {
            setIsLoading(false);
        }
    }, [items]);

    const pressHandler = () => navigate(Screens.NewsFeedElement);

    if (isLoading) {
        return (
            <View style={styles.loaderView}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
        >
            {items.map((item) => (
                <Text key={`${item.title}-${item.isoDate}`}>
                    {item.title}
                </Text>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        overflow: 'scroll',
        flex: 1,
    },
    contentContainer: {
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default NewsFeed;
