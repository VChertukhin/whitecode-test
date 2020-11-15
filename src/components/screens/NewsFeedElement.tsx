import React, {
    FunctionComponent,
    useEffect,
} from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
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
    openedFeedItemSelector,
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

const NewsFeedElement: FunctionComponent = () => {
    const { navigate } = useNavigation();
    const openedFeedItem = useSelector(openedFeedItemSelector);

    const emptyCategory = 'Без категории';

    const mainCategory: string = (
        openedFeedItem
            ? (
                openedFeedItem.categories.length !== 0
                    ? (openedFeedItem.categories[0]?.name ?? emptyCategory)
                    : emptyCategory
            )
            : ''
    );

    const taggedFeedItems = useSelector(getTaggedFeedItemsSelector(mainCategory));

    // redirect back to news if no specified
    useEffect(() => {
        if (!openedFeedItem) {
            navigate(Screens.NewsFeed);
        }
    }, []);

    if (openedFeedItem) {
        const lauoutStyle = [
            styles.scrollable,
            isWeb() ? styles.centrify : { flex: 1 },
        ]

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

                <Layout style={lauoutStyle}>
                    <Layout style={{ maxWidth: 600 }}>
                        <NewsCard feedItem={openedFeedItem} />
                    </Layout>

                    {(mainCategory !== emptyCategory) && (
                        <>

                            <Text style={{ alignSelf: 'center' }}>
                                {`Так же в категории ${mainCategory}`}
                            </Text>

                            <Divider />

                            <NewsFeedList
                                feedItems={taggedFeedItems}
                                style={{ overflow: 'visible', maxHeight: 300 }}
                            />
                        </>
                    )}
                </Layout>
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
