import React, { useState } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from './color';

const useBookmark = (initialIsBookmarked: boolean) => {
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
    const toggleIsBookmarked = () => setIsBookmarked(prevState => !prevState);

    return {
        isBookmarked,
        toggleIsBookmarked,
    };
};

const BookmarkButton = ({
    isBookmarked: isBookmarkedProp,
    onPress,
    style,
    size,
    color,
}: {
    isBookmarked: boolean;
    onPress: () => void;
    style: StyleProp<ViewStyle>;
    size: number;
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
    const { isBookmarked, toggleIsBookmarked } = useBookmark(isBookmarkedProp);

    return (
        <TouchableOpacity
            style={style}
            onPress={() => {
                toggleIsBookmarked();
                onPress();
            }}>
            <Ionicons name="star" size={size} color={isBookmarked ? COLOR.YELLOW : color.GRAY_1_GRAY_4} />
        </TouchableOpacity>
    );
};

export default BookmarkButton;
