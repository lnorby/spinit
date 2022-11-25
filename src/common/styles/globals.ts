import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    html {
        font-family: ${(p) => p.theme.fonts.primary};
        color: ${(p) => p.theme.colors.text.normal};
        background: #121212;
    }
`;

export default GlobalStyles;
