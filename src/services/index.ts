import * as RSSParser from 'react-native-rss-parser';

import { IFeed, IFetchNewsFeedServiceResponse } from '@interfaces';
import { isWeb } from '@utils';

export namespace NewsServices {
    /**
     * service beats CORS and fetches lenta.ru rss feeed,
     * parses it and returns feed data
     */
    export const fetchNewsFeed = async (): Promise<IFetchNewsFeedServiceResponse> => {
        // we have to overcome CORS on lenta.ru :) for web
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
        const RSS_FEED_URL = 'https://lenta.ru/rss/news';

        const REQUEST_URL = (
            isWeb()
                ? CORS_PROXY + RSS_FEED_URL
                : RSS_FEED_URL
        );


        try {
            const res = await fetch(REQUEST_URL);

            if (!res.ok) {
                throw Error('NetworkError');
            }

            const rawFeed = await res.text();
            const feed = await RSSParser.parse(rawFeed) as IFeed;

            return {
                newsfeed: feed,
                error: false,
            }
        } catch (e) {
            return {
                newsfeed: {
                    items: [],
                },
                error: true,
            }
        }
    };
};
