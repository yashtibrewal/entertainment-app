const TMDB_BASE_URL = 'https://api.themoviedb.org/3/';

const getMovieApi = async (movie_id, tmdbToken) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tmdbToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${TMDB_BASE_URL}movie/${movie_id}?language=en-US`, requestOptions);
  //  console.log(response);
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

  // const url = 'https://api.themoviedb.org/3/movie/974576?language=en-US';
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDVkMjhhZDc4YjVlMjM2MWY0NmRkODAyOWZjMzczNyIsIm5iZiI6MTczMjcxMTA0MS4zNTA2NDE1LCJzdWIiOiI2NzNhZGEyNTczYTQ1ZTUxODRiZjllYmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lMh45dPbE3l8w04KHxVh4QCos5hMTe7yRQ9nbwamV9g'
  //   }
  // };
  
  // fetch(url, options)
  //   .then(res => res.json())
  //   .then(json => console.log(json))
  //   .catch(err => console.error(err));

}

const getMovieCastApi = async (movie_id, tmdbToken) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tmdbToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${TMDB_BASE_URL}movie/${movie_id}/credits?language=en-US`, requestOptions);
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

  const url = `${TMDB_BASE_URL}configuration`;
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


export { getMovieApi, getMovieCastApi, getConfigurationSizesApi };