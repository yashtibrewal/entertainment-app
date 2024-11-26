const getTvSeriesApi = async (tv_series_id, token) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type","application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {

    const response = await fetch(`http://localhost:4000/tv/${tv_series_id}`, requestOptions);
    const result = await response.json()

    if(response.status === 200){
      result.isSuccess = true;
    }else{
      result.isSuccess = false;
    }
    return result;
    
  } catch(error) {
    console.error('Error: ', error);
    return {
      isSuccess: false,
      message: error.message
    }
  }

}

export default getTvSeriesApi;