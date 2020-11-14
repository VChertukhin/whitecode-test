import { combineReducers } from 'redux';

import { IFeed, AppActionTypes, AppActionInterfaces } from '@interfaces';

const defaultFeed: IFeed = {
    feed: {},
    items: [],
}

const feedReducer = (
    feedStore = defaultFeed,
    action: AppActionInterfaces.FeedActionsInterfaces.IUpdateFeed,
) => {
    const { FeedActions } = AppActionTypes;

    switch (action.type) {
        case FeedActions.UPDATE:
            return action.payload;
        default:
            return feedStore;
    }
}

export default combineReducers({
    feed: feedReducer,
});
