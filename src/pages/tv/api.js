const getTvSeriesApi = async (tv_series_id, tmdbToken) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tmdbToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tv_series_id}?language=en-US`, requestOptions);
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

const getTvSeriesCastApi = async (tv_series_id, tmdbToken) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tmdbToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tv_series_id}/credits?language=en-US`, requestOptions);
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

const getConfigurationSizesApi = async (tmdbToken) => {

  const url = 'https://api.themoviedb.org/3/configuration';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbToken}`
    }
  };

  try {

    const response = await fetch(url, options);
    const result = await response.json();
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


export { getTvSeriesApi, getTvSeriesCastApi, getConfigurationSizesApi };