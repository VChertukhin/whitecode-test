import { ThunkAction } from 'redux-thunk';

import {
    IAppState,
    AppActionInterfaces,
    AppActionTypes,
    IFeed,
} from '@interfaces';
import { NewsServices } from '@services';

export namespace AppActions {

    export namespace FeedActions {
        export const updateFeed = (feed: IFeed): AppActionInterfaces.FeedActionsInterfaces.IUpdateFeed => ({
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
    }
}
