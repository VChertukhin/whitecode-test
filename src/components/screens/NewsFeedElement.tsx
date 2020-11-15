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
} from '@ui-kitten/components';

import { Screens } from '@interfaces';
import { openedFeedItemSelector } from '@redux/selectors';
import { NewsCard } from '@components'
import { isWeb } from '@utils';

const BackIcon = (style: ViewStyle) => (
    <Icon {...style} name='arrow-back' />
);

const NewsFeedElement: FunctionComponent = () => {
    const { navigate } = useNavigation();
    const openedFeedItem = useSelector(openedFeedItemSelector);

    // redirect back to news if no specified
    useEffect(() => {
        if (!openedFeedItem) {
            navigate(Screens.NewsFeed);
        }
    }, []);

    if (openedFeedItem) {
        const { categories } = openedFeedItem;

        const lauoutStyle = [
            styles.scrollable,
            isWeb() ? styles.centrify : { flex: 1 },
        ]

        const mainCategory: string = (
            categories.length !== 0
                ? (categories[0]?.name ?? 'Без категории')
                : 'Без Категории'
        )

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
                    title={`В категории: ${mainCategory}`}
                    alignment="center"
                    leftControl={backControl()}
                />

                <Divider />

                <Layout style={lauoutStyle}>
                    <NewsCard feedItem={openedFeedItem} />
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
