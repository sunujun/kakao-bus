import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BusInfo from './src/BusInfo';
import { COLOR } from './src/color';

const App = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <BusInfo
                    isBookmarked={true}
                    onPressBookmark={() => {}}
                    num={146}
                    directionDescription="강남역.강남역사거리"
                    numColor={COLOR.BUS_B}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
