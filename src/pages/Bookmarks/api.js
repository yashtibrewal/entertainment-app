import { BASE_LOCAL_URL } from "../../constants";
import { tokens } from "../../store/localstorage";

export const getBookmarkedMovies = async () => {

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${tokens.entertainmentAppToken}`);

  const requestOptions = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(`${BASE_LOCAL_URL}movie/bookmarks?language=en-US`, requestOptions);
    const result = await response.json()
    return {
      isSuccess: true,
      result: result
    };

  } catch (error) {
    console.error('Error: ', error);
    return {
      isSuccess: false,
      message: error.message
    }
  }
}


export const getBookmarkedTVSeries = async () => {

  const entertainmentAppToken = tokens.entertainmentAppToken;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${entertainmentAppToken}`);

  const requestOptions = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(`${BASE_LOCAL_URL}tv/bookmarks?language=en-US`, requestOptions);
    const result = await response.json()
    return {
      isSuccess: true,
      result: result
    };
  } catch (error) {
    console.error('Error: ', error);
    return {
      isSuccess: false,
      message: error.message
    }
  }
}

