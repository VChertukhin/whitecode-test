import React, {
    FunctionComponent,
    useState,
    useEffect,
} from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Icon,
    Divider,
    Layout,
    TopNavigation,
    TopNavigationAction,
    Text,
    Card,
} from '@ui-kitten/components';

import { Screens } from '@interfaces';
import { openedFeedItemSelector } from '@redux/selectors';
import { isWeb } from '@utils';

const BackIcon = (style: ViewStyle) => (
    <Icon {...style} name='arrow-back' />
);

interface ICustomHeaderProps {
    imgSrc: string | null;
    title: string;
}

const CustomHeader: FunctionComponent<ICustomHeaderProps> = ({ imgSrc, title }) => (
    <React.Fragment>
        {imgSrc && (
            <Image
                style={styles.headerImage}
                source={{ uri: imgSrc }}
            />
        )}

        <Text
            style={styles.headerText}
            category='h6'
        >
            {title}
        </Text>
    </React.Fragment>
);

const NewsFeedElement: FunctionComponent = () => {
    const { navigate } = useNavigation();
    const openedFeedItem = useSelector(openedFeedItemSelector);

    if (openedFeedItem) {
        const { title, enclosures, description, categories } = openedFeedItem;

        const lauoutStyle = [
            styles.scrollable,
            isWeb() ? styles.centrify : { flex: 1 },
        ]

        const coverPhotoURL: string | null = (
            enclosures.length !== 0
                ? enclosures[0].url
                : null
        )

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
                    <Card header={() => <CustomHeader imgSrc={coverPhotoURL} title={title} />}>
                        <Text>
                            {description}
                        </Text>
                    </Card>
                </Layout>
            </SafeAreaView>
        );
    }

    return (<React.Fragment />);
};

const styles = StyleSheet.create({
    headerText: {
        marginHorizontal: 24,
        marginVertical: 16,
    },
    headerImage: {
        flex: 1,
        height: 192,
    },
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
