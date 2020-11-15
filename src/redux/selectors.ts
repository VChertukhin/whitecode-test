import { IAppState } from '@interfaces';

export const feedSelector = (state: IAppState) => state.feed;

export const openedFeedItemSelector = (state: IAppState) => state.openedFeedItem;
