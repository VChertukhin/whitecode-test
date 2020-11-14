import Parser from 'rss-parser';

import { IFeed, IFetchNewsFeedServiceResponse } from '@interfaces';

export namespace NewsServices {
    /**
     * service beats CORS and fetches lenta.ru rss feeed,
     * parses it and returns feed data
     */
    export const fetchNewsFeed = async (): Promise<IFetchNewsFeedServiceResponse> => {
        // we have to overcome CORS on lenta.ru :)
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
        const RSS_FEED_URL = 'https://lenta.ru/rss/news';
        const parser = new Parser();
        try {
            const feed = await parser.parseURL(
                CORS_PROXY + RSS_FEED_URL
            ) as IFeed;

            return {
                newsfeed: feed,
                error: false,
            }
        } catch (e) {
            return {
                newsfeed: {
                    feed: {},
                    items: [],
                },
                error: true,
            }
        }
    };
};
