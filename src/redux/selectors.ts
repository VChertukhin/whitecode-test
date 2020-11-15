import { IAppState, FeedItem } from '@interfaces';

export const feedSelector = (state: IAppState) => state.feed;

export const openedFeedItemSelector = (state: IAppState) => state.openedFeedItem;

export const getTaggedFeedItemsSelector = (tag: string) => (state: IAppState) => {
    const { items } = feedSelector(state);

    const taggedFeedItems: FeedItem[] = [];

    items.forEach(item => (
        item.categories.forEach(category => {
            if (tag === category?.name) {
                taggedFeedItems.push(item)
            }
        })
    ));

    return taggedFeedItems;
};

export const getFeedItemByTitleSelector = (searchTitle: string) => (state: IAppState): FeedItem | null => {
    const { items } = feedSelector(state);

    let feedItem: FeedItem | null = null;

    items.forEach(item => {
        if (item.title === searchTitle) {
            feedItem = item;
        }
    });

    return feedItem;
}
