const getTvSeriesApi = async (tv_series_id, tmdbToken) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tmdbToken}`);
  // myHeaders.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDVkMjhhZDc4YjVlMjM2MWY0NmRkODAyOWZjMzczNyIsIm5iZiI6MTczMjY4NjkwOS4wNDE5NzYsInN1YiI6IjY3M2FkYTI1NzNhNDVlNTE4NGJmOWViZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ETg8616Z00EQlFWDu7SawqH6ixU2qphdL-nM6505URA`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tv_series_id}`, requestOptions);
    const result = await response.json()

    if (response.status === 200) {
      result.isSuccess = true;
    } else {
      result.isSuccess = false;
    }
    return result;

  } catch (error) {
    console.error('Error: ', error);
    return {
      isSuccess: false,
      message: error.message
    }
  }

}

export default getTvSeriesApi;