import { ThunkAction } from 'redux-thunk';

import {
    IAppState,
    AppActionInterfaces,
    AppActionTypes,
    IFeed,
    FeedItem,
    GetNotificationClickHandler
} from '@interfaces';
import { NewsServices } from '@services';
import { sendNewsUpdatePushNotification } from '@utils';

export namespace AppActions {
    export namespace FeedActions {
        export const updateFeed = (
            feed: IFeed,
        ): AppActionInterfaces.FeedActionsInterfaces.IUpdateFeed => ({
            type: AppActionTypes.FeedActions.UPDATE,
            payload: feed,
        });

        export const fetchFeed = (): ThunkAction<
            Promise<void>,
            IAppState,
            null,
            AppActionInterfaces.FeedActionsInterfaces.IUpdateFeed
        > => {
            return async (dispatch) => {
                const { error, newsfeed } = await NewsServices.fetchNewsFeed();

                if (error) {
                    // set network error
                } else {
                    dispatch(updateFeed(newsfeed));
                }

            }
        };

        export const refreshFeed = (
            getNotificationClickHandler: GetNotificationClickHandler = (() => () => { }),
        ): ThunkAction<
            Promise<void>,
            IAppState,
            null,
            AppActionInterfaces.FeedActionsInterfaces.IUpdateFeed
        > => {
            return async (dispatch, getState) => {
                const { error, newsfeed } = await NewsServices.fetchNewsFeed();

                if (error) {
                    // set network error
                } else {
                    const { feed: { items: prevItems } } = getState();

                    dispatch(updateFeed(newsfeed));

                    const { feed: { items: currItems } } = getState();

                    const prevFirstTitle = (
                        prevItems.length !== 0
                            ? prevItems[0].title
                            : ''
                    );
                    const currFirstTitle = (
                        currItems.length !== 0
                            ? currItems[0].title
                            : ''
                    );
                    prevFirstTitle !== currFirstTitle && currItems.length !== 0
                    if (true) {
                        const item = currItems[0];
                        const { title, description, enclosures } = item;

                        sendNewsUpdatePushNotification(
                            title,
                            description,
                            enclosures.length !== 0 ? enclosures[0].url : '',
                            getNotificationClickHandler(item),
                        );
                    }
                }
            }
        };
    }

    export namespace OpenedFeedItenActions {
        export const updateOpenedFeedItem = (
            openedFeedItem: FeedItem | null,
        ): AppActionInterfaces.OpenedFeedItemActionsinterfaces.IUpdateOpenedFeedItem => ({
            type: AppActionTypes.OpenedFeedItemActions.UPDATE,
            payload: openedFeedItem,
        })
    }
}
