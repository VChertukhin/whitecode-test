import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    Divider,
    List,
    ListItem,
} from '@ui-kitten/components';

import { Screens, FeedItem } from '@interfaces';
import { AppActions } from '@redux/actions';
import { isWeb, truncate } from '@utils';

interface INewsFeedListProps {
    feedItems: FeedItem[];
}

const NewsFeedList: FunctionComponent<INewsFeedListProps> = ({ feedItems }) => {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();

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
        <List
            data={feedItems}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={Divider}
        />
    );
};

export default NewsFeedList;
