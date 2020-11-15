import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import {
    Icon,
    Text,
    Card,
} from '@ui-kitten/components';

import { FeedItem } from '@interfaces';
import { isStringEmpty } from '@utils';

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

interface INewsCardProps {
    feedItem: FeedItem;
}

const NewsCard: FunctionComponent<INewsCardProps> = ({ feedItem }) => {

    const { title, enclosures, description } = feedItem;

    const coverPhotoURL: string | null = (
        enclosures.length !== 0
            ? enclosures[0].url
            : null
    )

    return (
        <Card header={() => (
            <CustomHeader
                imgSrc={coverPhotoURL}
                title={title}
            />
        )}>
            <Text>
                {isStringEmpty(description) ? 'Подробнее...' : description}
            </Text>
        </Card>
    );

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
});

export default NewsCard;