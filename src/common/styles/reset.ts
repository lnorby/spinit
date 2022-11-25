import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        color: inherit;
        word-wrap: break-word;
    }

    html {
        height: 100%;
        font-size: 100%;
        line-height: 1.2;
        -webkit-text-size-adjust: 100%;
        overflow-y: scroll;
    }

    body {
        min-height: 100%;
    }

    ul, ol {
        list-style: none;
    }

    a {
        -webkit-tap-highlight-color: transparent;
        background-color: transparent;
        text-decoration: none;
    }

    sub, sup {
        font-size: 65%;
        line-height: 0;
    }

    abbr[title] {
        border-bottom: none;
        text-decoration: underline dotted;
    }

    q::before, q::after {
        content: none;
    }

    img, video {
        display: block;
        max-width: 100%;
        height: auto;
    }

    hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    legend {
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
    }

    button, input, select, textarea {
        max-width: 100%;
        background: none;
        vertical-align: middle;
    }

    button, input {
        overflow: visible;
    }

    button, [type="button"], [type="reset"], [type="submit"] {
        cursor: pointer;
        -webkit-appearance: button;
        -webkit-tap-highlight-color: transparent;

        &::-moz-focus-inner {
            padding: 0;
            border-style: none;
        }

        &:-moz-focusring {
            outline: 1px dotted ButtonText;
        }
    }

    input:-webkit-autofill, select:-webkit-autofill, textarea:-webkit-autofill {
        transition: color 0s 10000s ease, background-color 0s 10000s ease;
    }

    textarea {
        resize: vertical;
        overflow: auto;
    }

    [type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {
        height: auto;
    }

    [type="search"] {
        -webkit-appearance: textfield;
        outline-offset: -2px;

        &::-webkit-search-decoration {
            appearance: none;
        }
    }

    ::placeholder {
        opacity: 1;
    }

    ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
    }
`;

export default Reset;
