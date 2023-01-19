import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from './color';

const AlarmButton = ({ onPress, style }: { onPress: () => void; style: StyleProp<ViewStyle> }) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Ionicons name="alarm-outline" size={24} color={COLOR.GRAY_3} />
        </TouchableOpacity>
    );
};

export default AlarmButton;
