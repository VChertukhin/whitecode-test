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
    Card,
    Text,
    Divider,
    Layout,
    TopNavigation,
} from '@ui-kitten/components';

import { Screens } from '@interfaces';
import { AppActions } from '@redux/actions';
import {
    feedSelector,
    openedFeedItemSelector,
    networkErrorSelector,
} from '@redux/selectors';
import { Loader, NewsFeedList, NotificationsRunner } from '@components';
import { isWeb } from '@utils';

const NewsFeed: FunctionComponent = () => {
    const { navigate } = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { items } = useSelector(feedSelector);
    const openedFeedItem = useSelector(openedFeedItemSelector);
    const networkError = useSelector(networkErrorSelector);

    useEffect(() => {
        dispatch(AppActions.FeedActions.fetchFeed());
    }, []);

    useEffect(() => {
        if (isLoading && items.length !== 0) {
            setIsLoading(false);
        }
    }, [items]);

    const recentlyViewedPressHandler = () => navigate(
        Screens.NewsFeedElement,
        { title: openedFeedItem?.title },
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NotificationsRunner />

            <TopNavigation
                title="Новостная лента"
                alignment="center"
            />

            <Divider />

            {networkError && (
                <Layout style={styles.centrify}>
                    <Text style={styles.networkErrorText}>
                        Ошибка сети
                    </Text>
                </Layout>
            )}

            {isLoading
                ? (<Loader />)
                : (
                    <Layout style={isWeb() ? styles.centrify : {}}>
                        {openedFeedItem && (
                            <Card header={() => (
                                <Layout>
                                    <Text style={styles.cardHeaderText}>
                                        Недавно просмотренное:
                                    </Text>

                                    <Divider />
                                </Layout>
                            )}>
                                <Text onPress={recentlyViewedPressHandler}>
                                    {openedFeedItem.title}
                                </Text>
                            </Card>
                        )}

                        <NewsFeedList feedItems={items} />
                    </Layout>
                )
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    networkErrorText: {
        color: '#FF0000',
    },
    cardHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
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
