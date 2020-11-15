import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';

const Loader: FunctionComponent = () => (
    <Layout style={styles.centrify}>
        <Spinner size="giant" />
    </Layout>
);

const styles = StyleSheet.create({
    centrify: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Loader;
