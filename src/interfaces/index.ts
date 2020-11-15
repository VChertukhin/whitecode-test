/**
 * place to put all reusable types, interfaces and constants
 * may be splitted as soon as app will grow bigger
 */
import { FeedItem as Item } from 'react-native-rss-parser';

export interface IKeyValue {
    [key: string]: any;
}

export enum Screens {
    NewsFeed = 'newsfeed',
    NewsFeedElement = 'newsfeed-element',
}

export interface IAppState {
    feed: IFeed;
    networkError: boolean;
}

export namespace AppActionTypes {
    export enum FeedActions {
        // update feed in store
        UPDATE = '@FEED/UPDATE',
    }
};

export namespace AppActionInterfaces {
    export namespace FeedActionsInterfaces {
        export interface IUpdateFeed {
            type: AppActionTypes.FeedActions.UPDATE;
            payload: IFeed;
        }
    }
}

export type FeedItem = Item;

// add to make extra manipulations with feed
export interface IFeed extends IKeyValue {
    items: FeedItem[];
}

export interface IFetchNewsFeedServiceResponse {
    newsfeed: IFeed;
    error: boolean;
}
