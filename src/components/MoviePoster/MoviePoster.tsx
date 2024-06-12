import { checkIfInFavorites } from "utils";
import { FavoriteBadge, TrendingBadge } from "components";
import { Badges, Poster, StyledLink, StyledMoviePoster } from "./styles";
import { noPoster } from "assets";
import { useAppSelector } from "store";
import { generatePath } from "react-router-dom";
import { ROUTE } from "router";

interface IProps {
  poster: string;
  id: string;
  isLinkDisabled?: boolean;
}

export const MoviePoster = ({ poster, id, isLinkDisabled }: IProps) => {
  const { favorites } = useAppSelector(({ persistedReducer }) => persistedReducer.user);
  const { movieList } = useAppSelector(({ persistedReducer }) => persistedReducer.trends);
  const isInFavorites = checkIfInFavorites(favorites, id);
  const isInTrends = checkIfInFavorites(movieList, id);

  return (
    <Poster>
      <Badges>
        {isInFavorites && <FavoriteBadge id={id} />}
        {isInTrends && <TrendingBadge />}
      </Badges>
      {isLinkDisabled ? (
        <StyledMoviePoster
          maxHeight={{ S: "279px", XL: "357px" }}
          src={poster === "N/A" ? noPoster : poster}
        />
      ) : (
        <StyledLink to={generatePath(`/${ROUTE.MOVIE}`, { imdbID: id })}>
          <StyledMoviePoster
            maxHeight={{ S: "279px", XL: "357px" }}
            src={poster === "N/A" ? noPoster : poster}
          />
        </StyledLink>
      )}
    </Poster>
  );
};
