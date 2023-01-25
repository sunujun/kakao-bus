import { useState } from 'react';
import { DARK_COLOR, LIGHT_COLOR } from './color';

export const useTheme = () => {
    const [isDark, setIsDark] = useState(true);
    const toggleIsDark = () => setIsDark(prevState => !prevState);

    return {
        isDark,
        NEW_COLOR: isDark ? DARK_COLOR : LIGHT_COLOR,
        toggleIsDark,
    };
};
