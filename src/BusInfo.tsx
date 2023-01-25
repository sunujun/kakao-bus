import React from 'react';
import { Text, View } from 'react-native';
import AlarmButton from './AlarmButton';
import BookmarkButton from './BookmarkButton';
import { COLOR } from './color';
import { ProcessedNextBusInfo } from './data';
import NextBusInfo from './NextBusInfo';

const BusInfo = ({
    color,
    isBookmarked,
    onPressBookmark,
    num,
    numColor,
    directionDescription,
    processedNextBusInfo,
}: {
    color: {
        WHITE_BLACK: string;
        BLACK_WHITE: string;
        GRAY_1_GRAY_4: string;
        GRAY_2_GRAY_3: string;
        GRAY_3_GRAY_2: string;
        GRAY_4_GRAY_1: string;
        GRAY_1_GRAY_3: string;
        GRAY_1_GRAY_2: string;
    };
    isBookmarked: boolean;
    onPressBookmark: () => void;
    num: number;
    numColor: string;
    directionDescription: string;
    processedNextBusInfo: ProcessedNextBusInfo[];
}) => {
    return (
        <View style={{ flexDirection: 'row', height: 75, backgroundColor: color.WHITE_BLACK }}>
            <View
                style={{
                    flex: 0.85,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                {/* 북마크 */}
                <BookmarkButton
                    size={20}
                    color={color}
                    isBookmarked={isBookmarked}
                    onPress={onPressBookmark}
                    style={{ paddingHorizontal: 10 }}
                />
                {/* 버스 번호, 방향 */}
                <View style={{ flex: 1 }}>
                    <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
                    <Text style={{ fontSize: 13, color: COLOR.GRAY_3, marginRight: 5 }}>
                        {directionDescription} 방향
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                {/* M분 S초 / N번째 전 / 여유 */}
                <View style={{ flex: 1 }}>
                    {processedNextBusInfo.map((info, index) => (
                        <NextBusInfo
                            key={`next-bus-info-${index}`}
                            color={color}
                            hasInfo={info.hasInfo}
                            remainedTimeText={info.remainedTimeText}
                            numOfRemainedStops={info.numOfRemainedStops}
                            seatStatusText={info.seatStatusText}
                        />
                    ))}
                </View>
                {/* 알람 아이콘 */}
                <AlarmButton color={color} onPress={() => {}} style={{ paddingHorizontal: 15 }} />
            </View>
        </View>
    );
};

export default BusInfo;
