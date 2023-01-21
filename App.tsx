import React, { useEffect, useState } from 'react';
import { SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import BusInfo from './src/BusInfo';
import {
    BusInfo as BusInfoType,
    busStop,
    getBusNumColorByType,
    getRemainedTimeText,
    getSeatStatusText,
    getSections,
    ProcessedNextBusInfo,
} from './src/data';
import { COLOR } from './src/color';

const App = () => {
    const sections = getSections(busStop.buses);
    const [now, setNow] = useState(dayjs());

    useEffect(() => {
        const interval = setInterval(() => {
            const newNow = dayjs();
            setNow(newNow);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const renderSectionHeader = ({
        section: { title },
    }: {
        section: {
            title: '간선버스' | '지선버스' | '직행버스';
        };
    }) => (
        <View
            style={{
                paddingLeft: 13,
                paddingVertical: 3,
                backgroundColor: COLOR.GRAY_1,
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderTopColor: COLOR.GRAY_2,
                borderBottomColor: COLOR.GRAY_2,
            }}>
            <Text style={{ fontSize: 12, color: COLOR.GRAY_4 }}>{title}</Text>
        </View>
    );

    const renderItem = ({ item: bus }: { item: BusInfoType }) => {
        const numColor = getBusNumColorByType(bus.type);
        const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;
        const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
        const newNextBusInfos =
            !firstNextBusInfo && !secondNextBusInfo ? [null] : [firstNextBusInfo, secondNextBusInfo];

        const processedNextBusInfos: ProcessedNextBusInfo[] = newNextBusInfos.map(info => {
            if (!info) {
                return {
                    hasInfo: false,
                    remainedTimeText: '도착 정보 없음',
                };
            }

            const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
            const remainedTimeText = getRemainedTimeText(now, arrivalTime);
            const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);

            return {
                hasInfo: true,
                remainedTimeText,
                numOfRemainedStops,
                seatStatusText,
            };
        });

        return (
            <BusInfo
                isBookmarked={bus.isBookmarked}
                onPressBookmark={() => {}}
                num={bus.num}
                directionDescription={bus.directionDescription}
                numColor={numColor}
                processedNextBusInfo={processedNextBusInfos}
            />
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <SectionList
                    style={{ flex: 1, width: '100%' }}
                    sections={sections}
                    renderSectionHeader={renderSectionHeader}
                    renderItem={renderItem}
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
