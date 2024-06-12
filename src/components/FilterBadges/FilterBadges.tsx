import { Close, Container, StyledBadge } from "./styles";
import { VscClose } from "react-icons/vsc";
import {
  resetSorting,
  resetTypeFilter,
  resetYearFilter,
  useAppDispatch,
  useAppSelector,
} from "store";
import { useEffect, useRef, useState } from "react";
export const FilterBadges = () => {
  const { filters } = useAppSelector(({ persistedReducer }) => persistedReducer.search);

  const { isLightMode } = useAppSelector(({ persistedReducer }) => persistedReducer.user);

  const dispatch = useAppDispatch();

  const FilterBadgesRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState<number>(0);
  useEffect(() => {
    if (FilterBadgesRef.current) setOffset(FilterBadgesRef.current.offsetTop);
  }, []);

  if (filters.type || filters.year || filters.sortBy)
    return (
      <Container
        offset={offset}
        ref={FilterBadgesRef}
        gridColumn={{
          S: "1/2",
          XL: "2/3",
        }}
        $isLightMode={isLightMode}
      >
        {filters.sortBy && (
          <StyledBadge>
            Soring by: {filters.sortBy}
            <Close type="button" onClick={() => dispatch(resetSorting())}>
              <VscClose />
            </Close>
          </StyledBadge>
        )}
        {filters.type && (
          <StyledBadge>
            {filters.type}
            <Close type="button" onClick={() => dispatch(resetTypeFilter())}>
              <VscClose />
            </Close>
          </StyledBadge>
        )}
        {filters.year && (
          <StyledBadge>
            {filters.year}
            <Close type="button" onClick={() => dispatch(resetYearFilter())}>
              <VscClose />
            </Close>
          </StyledBadge>
        )}
      </Container>
    );
  return <></>;
};
