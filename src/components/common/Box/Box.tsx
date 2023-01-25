import styled, { css } from 'styled-components';
import {
  DisplayProps,
  display,
  FlexboxProps,
  flexbox,
  SpaceProps,
  space,
  color,
  FontWeightProps,
  fontWeight,
  ColorProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
} from 'styled-system';

interface Props
  extends DisplayProps,
    FlexboxProps,
    SpaceProps,
    ColorProps,
    LayoutProps,
    FontWeightProps,
    PositionProps {
  center?: boolean;
}

const Box = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  ${display}
  ${flexbox}
  ${space}
  ${color}
  ${layout}
  ${position}
  ${fontWeight}
  ${p =>
    p.center &&
    css`
      align-items: center;
      justify-content: center;
      flex: 1;
    `}
`;

export default Box;
