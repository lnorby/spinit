import {createGlobalStyle} from 'styled-components';
import theme from '@styles/theme';

const GlobalStyles = createGlobalStyle<{ theme: typeof theme }>`
    html {
        font-family: ${(p) => p.theme.fonts.primary};
        color: ${(p) => p.theme.colors.text.normal};
        background: #121212;
    }
`;

export default GlobalStyles;
