import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from './color';

const BookmarkButton = ({
    isBookmarked,
    onPress,
    style,
}: {
    isBookmarked: boolean;
    onPress: () => void;
    style: StyleProp<ViewStyle>;
}) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Ionicons name="star" size={24} color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1} />
        </TouchableOpacity>
    );
};

export default BookmarkButton;
