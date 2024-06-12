import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { IFilters, MovieType, MovieTypeOption } from "types";
import {
  Body,
  Cancel,
  Control,
  Field,
  FieldTitle,
  InputField,
  RadioGroup,
  Save,
  selectStyles,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledRadio,
  Title,
} from "./styles";
import { useAppDispatch, useAppSelector, setFilters } from "store";
import { ErrorMessage } from "components";

interface IProps {
  setIsOpen: () => void;
}

export const FiltersForm = ({ setIsOpen }: IProps) => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IFilters>();

  const { isLightMode } = useAppSelector(({ persistedReducer }) => persistedReducer.user);

  const dispatch = useAppDispatch();

  const onSumbit: SubmitHandler<IFilters> = (data) => {
    setIsOpen();
    dispatch(setFilters(data));
  };

  const MovieTypeOptions: MovieTypeOption[] = [
    { value: "", label: "все" },
    { value: MovieType.Movie, label: "фильм" },
    { value: MovieType.Series, label: "сериал" },
    { value: MovieType.Episode, label: "эпизод" },
  ];

  return (
    <StyledForm onSubmit={handleSubmit(onSumbit)}>
      <Title $isLightMode={isLightMode}>Фильтры</Title>
      <FieldTitle $isLightMode={isLightMode}>Фильтры и сортировка</FieldTitle>
      <Field>
        <Body $isLightMode={isLightMode}>
          <InputField>
            <FieldTitle $isLightMode={isLightMode}>Сортировать по</FieldTitle>
            <RadioGroup>
              <StyledRadio type="radio" id="title" value="title" {...register("sortBy")} />
              <StyledLabel htmlFor="title">Названию</StyledLabel>
              <StyledRadio type="radio" id="year" value="year" {...register("sortBy")} />
              <StyledLabel htmlFor="year">Году выпуска</StyledLabel>
            </RadioGroup>
          </InputField>
        </Body>
      </Field>
      <Field>
        <Body $isLightMode={isLightMode}>
          <InputField>
            <FieldTitle $isLightMode={isLightMode}>Выбрать формат</FieldTitle>
            <Controller
              control={control}
              defaultValue={""}
              name="type"
              render={({ field: { onChange } }) => (
                <Select
                  options={MovieTypeOptions}
                  isMulti={false}
                  isSearchable={false}
                  styles={selectStyles}
                  defaultValue={MovieTypeOptions[0]}
                  // onChange={(options) => options && onChange(options.value)}
                  onChange={(options) =>
                    options &&
                    onChange(
                      options.value === "фильм"
                        ? "movie"
                        : options.value === "сериал"
                        ? "series"
                        : options.value === "эпизод"
                        ? "episode"
                        : options.value,
                    )
                  }
                />
              )}
            />
          </InputField>
        </Body>
      </Field>
      <Field>
        <Body $isLightMode={isLightMode}>
          <InputField>
            <FieldTitle $isLightMode={isLightMode}>Год выпуска</FieldTitle>
            <StyledInput
              $isLightMode={isLightMode}
              type="string"
              placeholder="Ввведите год выпуска"
              {...register("year", {
                pattern: {
                  value: /^(19|20)[\d]{2,2}$/,
                  message: "введите правильную дату",
                },
              })}
            />
            {errors.year && errors.year.message && <ErrorMessage message={errors.year.message} />}
          </InputField>
        </Body>
      </Field>
      <Control>
        <Cancel
          type="button"
          onClick={() => {
            setIsOpen();
          }}
        >
          Отменить
        </Cancel>
        <Save type="submit">Сохранить</Save>
      </Control>
    </StyledForm>
  );
};
