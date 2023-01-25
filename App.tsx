import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, SectionList, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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
import { useTheme } from './src/useTheme';

const busStopBookmarkSize = 20;
const busStopBookmarkPadding = 6;

const App = () => {
    const sections = getSections(busStop.buses);
    const [now, setNow] = useState(dayjs());
    const [refreshing, setRefreshing] = useState(false);
    const { isDark, NEW_COLOR, toggleIsDark } = useTheme();

    const onRefresh = () => {
        setRefreshing(true);
    };

    useEffect(() => {
        if (refreshing) {
            setNow(dayjs());
            setRefreshing(false);

            // setTimeout(() => {
            //   // API refetch 완료되는 시점.
            //   setRefreshing(false);
            // }, 3000);
        }
    }, [refreshing]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newNow = dayjs();
            setNow(newNow);
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const onPressBusStopBookmark = () => {
        // TODO
    };

    const ListHeaderComponent = useCallback(
        () => (
            <View
                style={{
                    backgroundColor: COLOR.GRAY_3,
                    height: 170,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                {/* 정류소 번호, 이름, 방향 */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Margin height={10} />
                    <Text style={{ color: NEW_COLOR.WHITE_BLACK, fontSize: 13 }}>{busStop.id}</Text>
                    <Margin height={4} />
                    <Text style={{ color: NEW_COLOR.WHITE_BLACK, fontSize: 20 }}>{busStop.name}</Text>
                    <Margin height={4} />
                    <Text style={{ color: NEW_COLOR.GRAY_1_GRAY_2, fontSize: 14 }}>{busStop.directionDescription}</Text>
                    <Margin height={20} />
                    {/* 북마크 */}
                    <BookmarkButton
                        color={NEW_COLOR}
                        size={busStopBookmarkSize}
                        isBookmarked={busStop.isBookmarked}
                        onPress={onPressBusStopBookmark}
                        style={{
                            borderWidth: 0.3,
                            borderColor: NEW_COLOR.GRAY_1_GRAY_4,
                            borderRadius: (busStopBookmarkSize + busStopBookmarkPadding * 2) / 2,
                            padding: busStopBookmarkPadding,
                        }}
                    />
                    <Switch
                        value={isDark}
                        onValueChange={() => {
                            toggleIsDark();
                        }}
                    />
                </View>
            </View>
        ),
        [NEW_COLOR, isDark, toggleIsDark],
    );

    const ItemSeparatorComponent = () => (
        <View style={{ width: '100%', height: 1, backgroundColor: NEW_COLOR.GRAY_1_GRAY_4 }} />
    );

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
                backgroundColor: NEW_COLOR.GRAY_1_GRAY_4,
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderTopColor: NEW_COLOR.GRAY_2_GRAY_3,
                borderBottomColor: NEW_COLOR.GRAY_2_GRAY_3,
            }}>
            <Text style={{ fontSize: 12, color: NEW_COLOR.GRAY_4_GRAY_1 }}>{title}</Text>
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
                color={NEW_COLOR}
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
            <View
                style={{
                    ...styles.container,
                    backgroundColor: NEW_COLOR.WHITE_BLACK,
                }}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                {/* 뒤로가기, 홈 아이콘 */}
                <View
                    style={{
                        backgroundColor: COLOR.GRAY_3,
                        width: '100%',
                    }}>
                    <SafeAreaView
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity style={{ padding: 10 }}>
                            <SimpleLineIcons name="arrow-left" size={20} color={NEW_COLOR.WHITE_BLACK} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 10 }}>
                            <SimpleLineIcons name="home" size={20} color={NEW_COLOR.WHITE_BLACK} />
                        </TouchableOpacity>
                    </SafeAreaView>
                    {/* 헤더와 리스트 사이에 간극 채우기 위한 View */}
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: 500,
                            backgroundColor: COLOR.GRAY_3,
                            zIndex: -1,
                        }}
                    />
                </View>
                <SectionList
                    style={{ flex: 1, width: '100%' }}
                    sections={sections}
                    ListHeaderComponent={ListHeaderComponent}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    ListFooterComponent={ListFooterComponent}
                    renderSectionHeader={renderSectionHeader}
                    renderItem={renderItem}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
