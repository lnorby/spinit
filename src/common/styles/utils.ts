import {css} from 'styled-components';

const breakpoints = {
   xs: 400,
   sm: 600,
   md: 900,
   lg: 1200,
   xl: 1600,
};

type Breakpoint = keyof typeof breakpoints;

export const media = {
   up(min: Breakpoint) {
      return `@media (min-width: ${breakpoints[min]}px)`;
   },
   down(max: Breakpoint) {
      return `@media (max-width: ${breakpoints[max] - 0.2}px)`;
   },
   between(min: Breakpoint, max: Breakpoint) {
      return `@media (min-width: ${breakpoints[min]}px) and (max-width: ${
         breakpoints[max] - 0.2
      }px)`;
   },
};

export const extendClickableArea = css`
   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
   }
`;

export const fluidFontSize = (
   min: number,
   max: number,
   minBreakpoint: Breakpoint = 'xs',
   maxBreakpoint: Breakpoint = 'xl'
) => {
   const minBreakpointInPixels = breakpoints[minBreakpoint];
   const maxBreakpointInPixels = breakpoints[maxBreakpoint];

   return css`
      ${media.down(minBreakpoint)} {
         font-size: ${min}px;
      }

      ${media.between(minBreakpoint, maxBreakpoint)} {
         font-size: calc(
            ${min}px + ${max - min} *
               (
                  (100vw - ${minBreakpointInPixels}px) /
                     ${maxBreakpointInPixels - minBreakpointInPixels}
               )
         );
      }

      ${media.up(maxBreakpoint)} {
         font-size: ${max}px;
      }
   `;
};

export const truncateText = css`
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;
