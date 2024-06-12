import { useEffect, useRef, useState } from "react";
import { getRecommendations, useAppDispatch, useAppSelector } from "store";
import { MovieListItem, SearchError, SearchSpinner } from "components";
import { Arrow, Header, ItemContainer, Slider, Title, Wrapper } from "./styles";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

export const Recommendations = () => {
  const { recommendedMovies, areRecommendationsLoading, recommendationsError, recommendation } =
    useAppSelector(({ persistedReducer }) => persistedReducer.movie);

  const { isLightMode } = useAppSelector(({ persistedReducer }) => persistedReducer.user);

  const dispatch = useAppDispatch();

  const [offset, setOffset] = useState<number>(0);
  const [scrollConstraint, setScrollConstraint] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getRecommendations(recommendation));
    if (wrapperRef.current) {
      setScrollConstraint(wrapperRef.current.scrollWidth - wrapperRef.current.offsetWidth);
    }
  }, [dispatch, recommendation, recommendedMovies.length]);

  if (areRecommendationsLoading) {
    return <SearchSpinner />;
  }

  if (recommendationsError) {
    return <SearchError message={recommendationsError} />;
  }

  return (
    <Wrapper ref={wrapperRef}>
      <Header>
        <Title>Рекоммендации</Title>
        <Arrow
          $isLightMode={isLightMode}
          disabled={offset >= 0}
          type="button"
          onClick={() => {
            setOffset((offset) => {
              return offset + 272;
            });
          }}
        >
          <IoMdArrowRoundBack size={20} />
        </Arrow>
        <Arrow
          $isLightMode={isLightMode}
          disabled={offset + scrollConstraint <= 0}
          type="button"
          onClick={() => {
            setOffset((offset) => {
              return offset - 272;
            });
          }}
        >
          <IoMdArrowRoundForward size={20} />
        </Arrow>
      </Header>
      <Slider as={motion.div} animate={{ x: `${offset}px` }}>
        {recommendedMovies.map((movieListItem) => {
          return (
            <ItemContainer key={movieListItem.imdbID}>
              <MovieListItem movie={movieListItem} />
            </ItemContainer>
          );
        })}
      </Slider>
    </Wrapper>
  );
};
