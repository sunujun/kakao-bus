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
}: {
    isBookmarked: boolean;
    onPress: () => void;
    style: StyleProp<ViewStyle>;
    size: number;
}) => {
    const { isBookmarked, toggleIsBookmarked } = useBookmark(isBookmarkedProp);

    return (
        <TouchableOpacity
            style={style}
            onPress={() => {
                toggleIsBookmarked();
                onPress();
            }}>
            <Ionicons name="star" size={size} color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1} />
        </TouchableOpacity>
    );
};

export default BookmarkButton;
