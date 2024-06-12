import { StyledBadge } from "./styles";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "store";
import { removeFromCart } from "store/slices/userSlice";

interface IProps {
  id: string;
}

export const FavoriteBadge = ({ id }: IProps) => {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector(({ persistedReducer }) => persistedReducer.user);

  const handleRemoveFromCart = async () => {
    if (!token) {
      return;
    }
    try {
      dispatch(removeFromCart({ imdbID: id, token: token }));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StyledBadge onClick={handleRemoveFromCart}>
      <BsFillBookmarkFill size={20} />
    </StyledBadge>
  );
};
