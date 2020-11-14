export const isWeb = () => typeof window !== 'undefined';

/* cut sting to max length without touching words, adds ... if needed */
export const truncate = (str: string, maxLen: number) => (
    str.length <= maxLen
        ? str
        : `${str.substr(0, str.lastIndexOf('', maxLen - 3))}...`
);
