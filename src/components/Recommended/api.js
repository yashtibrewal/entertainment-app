

const toggleMovieBookmark = async (movie_id, bookmarked) => {

  const headers = new Headers();

  const entertainmentAppToken = localStorage.getItem('entertainmentAppToken');

  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${entertainmentAppToken}`);

  const raw = JSON.stringify({
    bookmark: !bookmarked
  });

  const url = `http://localhost:4000/movie/bookmark/${movie_id}`


  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return {
      isSuccess: true,
      result
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  toggleMovieBookmark
}