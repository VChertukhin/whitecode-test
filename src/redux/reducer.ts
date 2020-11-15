import { combineReducers } from 'redux';

import {
    AppActionTypes,
    AppActionInterfaces,
    IFeed,
    FeedItem,
} from '@interfaces';

const defaultFeed: IFeed = {
    feed: {},
    items: [],
}

const feedReducer = (
    feedStore = defaultFeed,
    action: AppActionInterfaces.FeedActionsInterfaces.IUpdateFeed,
): IFeed => {
    const { FeedActions } = AppActionTypes;

    switch (action.type) {
        case FeedActions.UPDATE:
            return action.payload;
        default:
            return feedStore;
    }
}

const openedFeedItemReducer = (
    openedFeedItemStore: FeedItem | null = null,
    action: AppActionInterfaces.OpenedFeedItemActionsinterfaces.IUpdateOpenedFeedItem,
): FeedItem | null => {
    const { OpenedFeedItemActions } = AppActionTypes;

    switch (action.type) {
        case OpenedFeedItemActions.UPDATE:
            return action.payload;
        default:
            return openedFeedItemStore;
    }
};

export default combineReducers({
    feed: feedReducer,
    openedFeedItem: openedFeedItemReducer,
});
