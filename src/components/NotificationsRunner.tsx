/*
 * we need this components since we need dispatch
 * which can be use inside Redux and React-Navigation context only
 * so it should be placed in screens
 */
import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
    GetNotificationClickHandler,
    FeedItem,
    Screens,
} from '@interfaces';
import { AppActions } from '@redux/actions';
import { getPushNotificationPermissions } from '@utils';

const NotificationsRunner: FunctionComponent = () => {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    // initialize notifications and refresh 
    useEffect(() => {
        getPushNotificationPermissions();

        const interval = setInterval(() => {
            const getNotificationClickHandler = (item: FeedItem) => (
                () => {
                    navigate(Screens.NewsFeedElement, { title: item.title });
                }
            );

            dispatch(AppActions.FeedActions.refreshFeed(getNotificationClickHandler));
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (<React.Fragment />);
};

export default NotificationsRunner;
