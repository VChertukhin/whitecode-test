import { Platform } from 'react-native';
import * as Permissions from 'expo-permissions';

export const isWeb = () => Platform.OS === 'web';

/* cut sting to max length without touching words, adds ... if needed */
export const truncate = (str: string, maxLen: number) => (
    str.length <= maxLen
        ? str
        : `${str.substr(0, str.lastIndexOf(' ', maxLen - 3))}...`
);

export const getPushNotificationPermissions = async (): Promise<Permissions.PermissionStatus> => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    return finalStatus
}
