import { Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

export const isWeb = () => Platform.OS === 'web';

/* cut sting to max length without touching words, adds ... if needed */
export const truncate = (str: string, maxLen: number) => (
    str.length <= maxLen
        ? str
        : `${str.substr(0, str.lastIndexOf(' ', maxLen - 3))}...`
);

export const isStringEmpty = (s: string) => /^(\s|\n)+$/.test(s);

export const getPushNotificationPermissions = async (): Promise<Permissions.PermissionStatus> => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    return finalStatus
}

export const sendNewsUpdatePushNotification = async (
    title: string,
    body: string,
    image: string,
    notificationClickHandler?: () => void,
): Promise<void> => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status === Permissions.PermissionStatus.GRANTED) {
        if (isWeb()) {
            if ("Notification" in window) {
                const notifier = new Notification(title, { body, image, icon: image });
                if (notificationClickHandler) {
                    notifier.onclick = notificationClickHandler;
                }
            }
        } else {
            Notifications.scheduleNotificationAsync({
                content: {
                    title,
                    body,
                },
                trigger: {
                    seconds: 0,
                    repeats: false,
                },
            });
        }
    }
};