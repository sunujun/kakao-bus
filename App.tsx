import React, { useEffect, useState } from 'react';
import { SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
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
import BookmarkButton from './src/BookmarkButton';
import Margin from './src/Margin';

const busStopBookmarkSize = 20;
const busStopBookmarkPadding = 6;

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

    const onPressBusStopBookmark = () => {
        // TODO
    };
    const ListHeaderComponent = () => (
        <View
            style={{
                backgroundColor: COLOR.GRAY_3,
                height: 250,
                paddingTop: StatusBar.currentHeight,
            }}>
            {/* 뒤로가기, 홈 아이콘 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ padding: 10 }}>
                    <SimpleLineIcons name="arrow-left" size={20} color={COLOR.WHITE} />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }}>
                    <SimpleLineIcons name="home" size={20} color={COLOR.WHITE} />
                </TouchableOpacity>
            </View>
            {/* 정류소 번호, 이름, 방향 */}
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Margin height={10} />
                <Text style={{ color: COLOR.WHITE, fontSize: 13 }}>{busStop.id}</Text>
                <Margin height={4} />
                <Text style={{ color: COLOR.WHITE, fontSize: 20 }}>{busStop.name}</Text>
                <Margin height={4} />
                <Text style={{ color: COLOR.GRAY_1, fontSize: 14 }}>{busStop.directionDescription}</Text>
                <Margin height={20} />
                {/* 북마크 */}
                <BookmarkButton
                    size={busStopBookmarkSize}
                    isBookmarked={busStop.isBookmarked}
                    onPress={onPressBusStopBookmark}
                    style={{
                        borderWidth: 0.3,
                        borderColor: COLOR.GRAY_1,
                        borderRadius: (busStopBookmarkSize + busStopBookmarkPadding * 2) / 2,
                        padding: busStopBookmarkPadding,
                    }}
                />
                <Margin height={25} />
            </View>
        </View>
    );
    const ItemSeparatorComponent = () => <View style={{ width: '100%', height: 1, backgroundColor: COLOR.GRAY_1 }} />;
    const ListFooterComponent = () => <Margin height={30} />;

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
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <SectionList
                    style={{ flex: 1, width: '100%' }}
                    sections={sections}
                    ListHeaderComponent={ListHeaderComponent}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    ListFooterComponent={ListFooterComponent}
                    renderSectionHeader={renderSectionHeader}
                    renderItem={renderItem}
                />
            </View>
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
