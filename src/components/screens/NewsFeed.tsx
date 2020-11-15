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
    List,
    ListItem,
} from '@ui-kitten/components';

import { Screens, FeedItem } from '@interfaces';
import { AppActions } from '@redux/actions';
import { feedSelector } from '@redux/selectors';
import { Loader } from '@components';
import { isWeb, truncate } from '@utils';

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

    const pressHandler = (feedItem: FeedItem) => () => {
        dispatch(AppActions.OpenedFeedItenActions.updateOpenedFeedItem(feedItem));
        navigate(Screens.NewsFeedElement);
    };

    const renderItem = ({ item }: { item: FeedItem }) => (
        <ListItem
            title={item.title}
            description={truncate(item.description, 75)}
            onPress={pressHandler(item)}
            titleStyle={{ fontFamily: isWeb() ? '' : 'normal' }}
            descriptionStyle={{ fontFamily: isWeb() ? '' : 'normal' }}
        />
    );

    const keyExtractor = (item: FeedItem) => `${item.title}-${item.published}`;

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
                        <List
                            data={items}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            ItemSeparatorComponent={Divider}
                        />
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
