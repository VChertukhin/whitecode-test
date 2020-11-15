import { Platform } from 'react-native';

export const isWeb = () => Platform.OS === 'web';

/* cut sting to max length without touching words, adds ... if needed */
export const truncate = (str: string, maxLen: number) => (
    str.length <= maxLen
        ? str
        : `${str.substr(0, str.lastIndexOf('', maxLen - 3))}...`
);
