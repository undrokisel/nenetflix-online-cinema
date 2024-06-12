import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "router";
import { signUserOut, useAppDispatch, useAppSelector } from "store";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    screenWidth: 0,
    screenHeight: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export const useInput = (initialValue: string = "") => {
  const [value, setInputValue] = useState<string>(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return {
    value,
    onChange,
    setInputValue,
  };
};

export const useAuth = () => {
  const { name, email, isLogged } = useAppSelector(({ persistedReducer }) => persistedReducer.user);
  return { name, email, isLogged };
};

export const useToggle = (initialState: boolean = false): [boolean, any] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback((): void => setState((state) => !state), []);
  return [state, toggle];
};

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await dispatch(signUserOut());
    navigate(ROUTE.ABOUT_US);
  };

  return handleSignOut;
};
