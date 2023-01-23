import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from './color';

const BookmarkButton = ({
    isBookmarked,
    onPress,
    style,
    size,
}: {
    isBookmarked: boolean;
    onPress: () => void;
    style: StyleProp<ViewStyle>;
    size: number;
}) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Ionicons name="star" size={size} color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1} />
        </TouchableOpacity>
    );
};

export default BookmarkButton;
