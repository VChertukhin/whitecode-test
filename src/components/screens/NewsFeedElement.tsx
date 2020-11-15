import React, {
    FunctionComponent,
    useEffect,
    useRef,
    useMemo,
} from 'react';
import { StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, Route } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Icon,
    Divider,
    Layout,
    TopNavigation,
    TopNavigationAction,
    Text,
} from '@ui-kitten/components';

import { Screens } from '@interfaces';
import {
    getFeedItemByTitleSelector,
    getTaggedFeedItemsSelector,
} from '@redux/selectors';
import {
    NewsCard,
    NewsFeedList,
} from '@components'
import { isWeb } from '@utils';

const BackIcon = (style: ViewStyle) => (
    <Icon {...style} name='arrow-back' />
);

interface INewsFeedElement {
    route: Route<Screens, { title: string }>;
}

const NewsFeedElement: FunctionComponent<INewsFeedElement> = ({ route }) => {
    const { navigate } = useNavigation();
    const openedFeedItem = useSelector(getFeedItemByTitleSelector(route?.params?.title));

    // redirect back to news if no specified
    useEffect(() => {
        if (!openedFeedItem) {
            navigate(Screens.NewsFeed);
        }
    }, []);

    const scrollRef = useRef<ScrollView>(null);

    // scroll to the top on news change
    useEffect(() => (
        scrollRef.current?.scrollTo(0)
    ), [openedFeedItem]);

    const emptyCategory = 'Без категории';

    const mainCategory: string = useMemo(() => (
        openedFeedItem
            ? (
                openedFeedItem.categories.length !== 0
                    ? (openedFeedItem.categories[0]?.name ?? emptyCategory)
                    : emptyCategory
            )
            : ''
    ), [openedFeedItem]);

    const taggedFeedItems = useSelector(getTaggedFeedItemsSelector(mainCategory));

    if (openedFeedItem) {
        const handleNavigationAction = () => navigate(Screens.NewsFeed);

        const backControl = () => (
            <TopNavigationAction
                icon={BackIcon}
                onPress={handleNavigationAction}
            />
        )

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation
                    alignment="center"
                    leftControl={backControl()}
                />

                <Divider />

                <ScrollView ref={scrollRef} style={{ backgroundColor: '#FFFFFF' }}>
                    <Layout style={isWeb() ? styles.centrify : { flex: 1 }}>
                        <Layout style={{ maxWidth: 600 }}>
                            <NewsCard feedItem={openedFeedItem} />
                        </Layout>

                        {(mainCategory !== emptyCategory) && (
                            <>

                                <Text style={{ alignSelf: 'center' }}>
                                    {`Так же в категории "${mainCategory}"`}
                                </Text>

                                <Divider />

                                <NewsFeedList
                                    feedItems={taggedFeedItems}
                                    style={{ overflow: 'visible', maxHeight: 300 }}
                                />
                            </>
                        )}
                    </Layout>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (<React.Fragment />);
};

const styles = StyleSheet.create({
    centrify: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollable: {
        overflow: 'scroll',
    },
});

export default NewsFeedElement;
