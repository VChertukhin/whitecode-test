import React, {
    FunctionComponent,
    useState,
    useEffect,
} from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Divider,
    Layout,
    TopNavigation,
} from '@ui-kitten/components';

import { AppActions } from '@redux/actions';
import { feedSelector } from '@redux/selectors';
import { Loader, NewsFeedList } from '@components';
import { isWeb } from '@utils';

const NewsFeed: FunctionComponent = () => {
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation
                title="Новостная лента"
                alignment="center"
            />

            <Divider />

            {isLoading
                ? (<Loader />)
                : (
                    <Layout style={isWeb() ? styles.centrify : {}}>
                        <NewsFeedList feedItems={items} />
                    </Layout>
                )
            }
        </SafeAreaView>
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
    centrify: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default NewsFeed;
