import styled from "styled-components";
import { LayoutProps, SpaceProps, layout, space } from "styled-system";
import { Body1, Color, Space } from "ui";

interface IProps {
  $isLightMode: boolean;
}

export const Text = styled(Body1)`
  text-align: center;
  color: ${Color.Black};

  @media (max-width: 750px) {
    font-size: 14px;
    line-height: 1.4rem;
  }
  @media (max-width: 560px) {
    font-size: 12px;
    line-height: 1.3rem;
  }

  @media (max-width: 500px) {
    font-size: 10px;
    line-height: 1.2rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContainerSketch = styled.div<LayoutProps & SpaceProps & IProps>`
  min-height: 380px;

  display: flex;
  flex-direction: column;

  padding: ${Space.S};
  ${layout};
  ${space};

  margin: 0;
  margin-top: 8rem;
`;

export const LastMoviesButton = styled.button<IProps>`
  display: flex;
  justify-content: center;
  gap: 8px;

  margin: 1rem auto;

  padding: ${Space.XS} ${Space.S};
  background-color: ${Color.Light};
  border: none;
  border-radius: 40px;
  cursor: pointer;
`;
