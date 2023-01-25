import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AlarmButton = ({
    onPress,
    style,
    color,
}: {
    onPress: () => void;
    style: StyleProp<ViewStyle>;
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
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Ionicons name="alarm-outline" size={24} color={color.GRAY_3_GRAY_2} />
        </TouchableOpacity>
    );
};

export default AlarmButton;
