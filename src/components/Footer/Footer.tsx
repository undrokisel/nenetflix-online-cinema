import { useLocation } from "react-router-dom";
import { useToggle } from "hooks";
import { useAppDispatch, useAppSelector, loadMoreTrends, loadMoreMovies } from "store";
import { ROUTE } from "router";
import { IRequestParams } from "types";
import { Color } from "ui";
import { CustomSpinner } from "components";
import { LoadMore, StyledFooter, Text } from "./styles";

interface IProps {
  requestParams: IRequestParams;
}

export const Footer = ({ requestParams }: IProps) => {
  const { isLightMode } = useAppSelector(({ persistedReducer }) => persistedReducer.user);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useToggle();

  const { pathname } = useLocation();

  const handleClick = async () => {
    setIsLoading();

    if (pathname === ROUTE.HOME) {
      return await dispatch(loadMoreMovies(requestParams)).then(() => setIsLoading());
    } else if (pathname === `/${ROUTE.TRENDS}`) {
      return await dispatch(loadMoreTrends(requestParams)).then(() => setIsLoading());
    }
  };

  return (
    <StyledFooter gridColumn={{ XL: "2/3" }}>
      <LoadMore type="button" onClick={handleClick} $isLightMode={isLightMode}>
        <Text>Загрузить еще</Text>
        {isLoading && <CustomSpinner color={Color.White} still={false} size="20px" />}
      </LoadMore>
    </StyledFooter>
  );
};
