import React from 'react';
import styled from 'styled-components';

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CongratulationsBanner = styled.div<{isCongratsBannerVisible: string}>`
  display: ${props => props.isCongratsBannerVisible || 'none'};
  justify-content: center;
`;

export interface TodoStatusBarProps {
  className?: string;
  total: number;
  totalDone: number;
  congratsBannerVisibility: string;
}

const _TodoStatusBar: React.FC<TodoStatusBarProps> = ({
  className,
  total,
  totalDone,
  congratsBannerVisibility,
}) => (
  <div data-cy='TodoStatusBar' className={className}>
    <InfoBar>
      <span>Total: {total}</span>
      <span>Done: {totalDone}</span>
    </InfoBar>
    <CongratulationsBanner isCongratsBannerVisible={congratsBannerVisibility}>
      <span>
        Congratulations, you're all set! You've done everything on your list.
      </span>
    </CongratulationsBanner>
  </div>
);

export const TodoStatusBar = styled(_TodoStatusBar)`
  display: flex;
  flex-direction: column;
`;
