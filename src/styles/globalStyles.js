import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root{
        --primary-cyan-800: #46B6E6;
        --primary-blue-800: #1B1464;
        --green-cyan: #11BCBB;
        --secondary-blue-600: #11BCBB;
        --danger: #E64646;

        --primary-dark-800: #111111;
        --primary-dark-700: #3A3A3A;
        --primary-dark-600: #585858;
        --primary-dark-500: #7A7A7A;
        --primary-dark-400: #989898;
        --primary-dark-300: #B5B5B5;
        --primary-dark-200: #D2D2D2;
        --primary-dark-100: #E8E8E8;
        --primary-dark-000: #FAFAFA;
        --white: #FFFFFF;

        --radius-lg: 5px;
        --radius-sm: 2px;

        --spacing-xxl: 3rem;
        --spacing-xl: 1.5rem;
        --spacing-lg: 1rem;
        --spacing-sm: .5rem;
        --spacing-xsm: .25rem;
    
        --boxShadow: rgba(0, 0, 0, 0.32) 1px 1px 14px -10px;

    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body,
    h1,
    h2,
    h3,
    h4,
    p,
    figure,
    blockquote,
    dl,
    dd {
        margin: 0;
    }

    ul[role='list'],
    ol[role='list'] {
        list-style: none;
    }

    html:focus-within {
        scroll-behavior: smooth;
    }

    body {
        min-height: 100vh;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
        font-family: 'Raleway', sans-serif;
        background-color: var(--primary-dark-100);
    }

    // a:not([class]) {
    //     text-decoration-skip-ink: auto;
    // }
    
    a {
        text-decoration:  none;
    }

    img,
    picture {
        max-width: 100%;
        display: block;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    @media (prefers-reduced-motion: reduce) {
    html:focus-within {
        scroll-behavior: auto;
    }
    
   

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }

    
`;

export default GlobalStyles;
