import { Genre, StyledGenre } from "./styles";

interface IProps {
  genres: string[];
}

interface IRusGenresMap {
  comedy: string;
  drama: string;
  romance: string;
  action: string;
  adventure: string;
  horror: string;
  thriller: string;
  fantasy: string;
  family: string;
  animation: string;
  music: string;
  musical: string;
  crime: string;
  biography: string;
  war: string;
  western: string;
  mystery: string;
  documentary: string;
  history: string;

  
}

const rusGenresMap: IRusGenresMap = {
  comedy: "комедия",
  drama: "драма",
  romance: "романтика",
  action: "экшн",
  adventure: "приключения",
  horror: "ужасы",
  thriller: "триллер",
  fantasy: "фэнтези",
  family: "семейный",
  animation: "мультфильм",
  music: "мюзикл",
  crime: "криминальный",
  biography: "биографический",
  war: "война",
  western: "вестерн",
  musical: "мюзикл",
  mystery: "мистика",
  documentary: "документальный",
  history: "исторический",

};

export const MovieGenre = ({ genres }: IProps) => {
  return (
    <StyledGenre>
      {genres.map((genre: string) => {
        const rusGenre = rusGenresMap[genre.toLowerCase() as keyof IRusGenresMap] ?? genre;
        return <Genre key={genre}>{rusGenre}</Genre>;
      })}
    </StyledGenre>
  );
};
