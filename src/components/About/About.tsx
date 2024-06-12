import {
  ContainerSketch,
  Text,
  LastMoviesButton,
  Container,
} from "./styles";
import { useAppSelector } from "store";

import { ABOUT_TEXT, ABOUT_TITLE_TEXT } from "assets/texts/contstants";
import { StarWarsSketch } from "components/StarWarsSketch";



export const About = () => {
  const { isLightMode } = useAppSelector(({ persistedReducer }) => persistedReducer.user);

  return (
    <Container>
      <ContainerSketch $isLightMode={isLightMode}>
        <StarWarsSketch titleText={ABOUT_TITLE_TEXT} summaryText={ABOUT_TEXT} />
      </ContainerSketch>

      <LastMoviesButton
        type="button"
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          })
        }
        $isLightMode={isLightMode}
      >
        <Text>Обзор новинок</Text>
      </LastMoviesButton>
    </Container>
  );
};
