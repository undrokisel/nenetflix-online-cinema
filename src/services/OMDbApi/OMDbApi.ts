import axios from "axios";
import { IMovieFull, IMovieShort, IRequestParams, Param } from "types/types";

class OMDbAPI {
  private readonly BASE_URL = process.env.REACT_APP_BASE_URL_OMDbAPI;

  private readonly API_KEY = process.env.REACT_APP_API_KEY;

  private readonly API = axios.create({ baseURL: this.BASE_URL });

  private getRandomParam() {
    const defaultParams = ["gun", "world", "life", "sea", "dark", "road"];
    return defaultParams[Math.floor(Math.random() * defaultParams.length)];
  }

  private getTrend() {
    const defaultParams = ["star wars", "man", "love"];
    return defaultParams[Math.floor(Math.random() * defaultParams.length)];
  }

  private initialParam = this.getRandomParam();
  readonly trend = this.getTrend();

  public async getRandomMovies(): Promise<{
    Search: IMovieShort[];
    params: IRequestParams;
  }> {
    const params = {
      [Param.ApiKey]: this.API_KEY,
      [Param.Search]: this.initialParam,
      [Param.Page]: "1",
    };

    const {
      data: { Search },
    } = await this.API.get("", {
      params,
    });
        
    return { Search, params };
  }

  public async getTrends(): Promise<{
    Search: IMovieShort[];
    params: IRequestParams;
  }> {
    const params = {
      [Param.ApiKey]: this.API_KEY,
      [Param.Search]: this.trend,
      [Param.Type]: "movie",
      [Param.Page]: "1",
    };
    const {
      data: { Search },
    } = await this.API.get("", {
      params,
    });

    return { Search, params };
  }

  public async getMovieById(id: string) {
    const params = {
      [Param.ApiKey]: this.API_KEY,
      [Param.Plot]: "full",
      [Param.Id]: id,
    };

    const { data } = await this.API.get<IMovieFull>("", {
      params,
    });

    return data;
  }

  public async getRecommendations(searchQuerry: string, type: string) {
    const params = {
      [Param.ApiKey]: this.API_KEY,
      [Param.Search]: searchQuerry,
      [Param.Type]: type,
      [Param.Page]: "1",
    };
    const {
      data: { Search },
    } = await this.API.get<{ Search: IMovieShort[] }>("", {
      params,
    });
    return Search;
  }

  public async searchMovies(searchRequest: IRequestParams) {
    const params = {
      [Param.ApiKey]: this.API_KEY,
      [Param.Search]: searchRequest.s,
      [Param.Type]: searchRequest.type,
      [Param.Year]: searchRequest.y,
      [Param.Page]: "1",
    };

    return await this.API.get<{
      Search: IMovieShort[];
      params: IRequestParams;
    }>("", {
      params,
    });
  }

  public async loadMoreMovies(initialParams: IRequestParams) {
    const { s, page, y, type } = initialParams;
    const params = {
      [Param.ApiKey]: this.API_KEY,
      [Param.Search]: s,
      [Param.Type]: type,
      [Param.Year]: y,
      [Param.Page]: (Number(page) + 1).toString(),
    };
    return await this.API.get<{
      Search: IMovieShort[];
      params: IRequestParams;
    }>("", {
      params,
    });
  }
}

export const OMDbApi = new OMDbAPI();
