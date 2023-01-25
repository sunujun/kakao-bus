import React from 'react';
import { Text, View } from 'react-native';
import { COLOR } from './color';

const NextBusInfo = ({
    hasInfo,
    remainedTimeText,
    numOfRemainedStops,
    seatStatusText,
    color,
}: {
    hasInfo: boolean;
    remainedTimeText: string;
    numOfRemainedStops?: number;
    seatStatusText?: string;
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
}) => {
    if (!hasInfo) {
        return <Text style={{ color: color.GRAY_2_GRAY_3 }}>도착 정보 없음</Text>;
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: color.BLACK_WHITE, marginRight: 10 }}>{remainedTimeText}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 0.5,
                    borderColor: color.GRAY_1_GRAY_4,
                    borderRadius: 3,
                    padding: 2,
                }}>
                <Text style={{ color: color.GRAY_3_GRAY_2, marginRight: 3 }}>{numOfRemainedStops}번째전</Text>
                <Text style={{ color: COLOR.CORAL }}>{seatStatusText}</Text>
            </View>
        </View>
    );
};

export default NextBusInfo;
