import React, { FunctionComponent } from 'react';
import { ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    Divider,
    List,
    ListItem,
} from '@ui-kitten/components';

import { Screens, FeedItem } from '@interfaces';
import { AppActions } from '@redux/actions';
import { isWeb, truncate, isStringEmpty } from '@utils';

interface INewsFeedListProps {
    feedItems: FeedItem[];
    style?: ViewStyle;
}

const NewsFeedList: FunctionComponent<INewsFeedListProps> = ({ feedItems, style }) => {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();

    const pressHandler = (feedItem: FeedItem) => () => {
        dispatch(AppActions.OpenedFeedItenActions.updateOpenedFeedItem(feedItem));
        navigate(Screens.NewsFeedElement, { title: feedItem.title });
    };

    const fontFamily = isWeb() ? '' : 'normal';

    const renderItem = ({ item }: { item: FeedItem }) => {
        const description = truncate(item.description, 75);
        // follow lenta.ru format
        const emptyCaseStr = '\n\xa0\xa0\xa0\xa0Подробнее...';

        return (
            <ListItem
                title={item.title}
                description={
                    isStringEmpty(description)
                        ? emptyCaseStr
                        : description
                }
                onPress={pressHandler(item)}
                titleStyle={{ fontFamily }}
                descriptionStyle={{ fontFamily }}
            />
        );
    };

    const keyExtractor = (item: FeedItem) => `${item.title}-${item.published}`;

    return (
        <List
            style={style}
            data={feedItems}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={Divider}
        />
    );
};

NewsFeedList.defaultProps = {
    style: {},
};

export default NewsFeedList;
