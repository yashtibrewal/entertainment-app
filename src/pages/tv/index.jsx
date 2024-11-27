import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import LinkIcon from '@mui/icons-material/Link';

import { getConfigurationSizesApi, getTvSeriesApi, getTvSeriesCastApi } from "./api";
import { useAuth } from "../../store/auth";
import Caste from '../../components/common-media/Caste';
import ReviewStars from '../../components/common-media/ReviewStars';
import TitleValue from '../../components/common-media/TitleValue';
import Genere from '../../components/common-media/Genre';

function TV() {

  const { id } = useParams();
  const { state } = useAuth()
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tvSeriesResponse, setTvSeriesResponse] = useState({});
  const [casteResponse, setCasteResponse] = useState({});
  const [configurationResponse, setConfigurationResponse] = useState({});

  useEffect(() => {
    setLoading(true);

    Promise.all([
      getTvSeriesApi(id, state.tmdbToken),
      getTvSeriesCastApi(id, state.tmdbToken)
    ])
      .then(([tvSeriesResponse, castResults]) => {
        setTvSeriesResponse(tvSeriesResponse.result);
        setRating(tvSeriesResponse.result.vote_average);
        setCasteResponse(castResults.result);
        getConfigurationSizesApi(state.tmdbToken)
          .then((response) => {
            setConfigurationResponse(response.result);
          })
          .finally(() => setLoading(false))
      })
      .catch(error => console.log(error))

  }, [id, state.tmdbToken]);

  return (
    loading ? <div>Loading</div> :
      <div className="flex bg-black gap-x-10 min-h-screen px-12 lg:px-24 xl:px-48 lg:py-6 2xl:py-12">
        <div className="w-1/3">
          <img alt="poster image" className="rounded" src={configurationResponse?.images?.base_url + "/" +
            configurationResponse?.images?.poster_sizes?.[6] + "/" +
            tvSeriesResponse?.poster_path
          }></img>
        </div>
        <div className="w-2/3 space-y-10">
          <h1 className="text-4xl text-white">{tvSeriesResponse?.name}</h1>
          <h2 className="text-2xl text-white"><ReviewStars rating={rating}></ReviewStars></h2>
          <div className="flex justify-between">
            <TitleValue
              title="Language"
              value={tvSeriesResponse?.original_language}
            ></TitleValue>
            <TitleValue
              title="First Air"
              value={tvSeriesResponse?.first_air_date}
            ></TitleValue>
            <TitleValue
              title="Last Air"
              value={tvSeriesResponse?.last_air_date}
            ></TitleValue>
            <TitleValue
              title="Status"
              value={tvSeriesResponse?.status}
            ></TitleValue>
          </div>
          <div className="w-full space-y-3">
            <h3 className="text-xl text-white">Genres</h3>
            <div className="flex flex-wrap gap-x-2">
              {
                tvSeriesResponse?.genres?.map((genere) => {
                  return (<Genere key={genere.id}>{genere.name}</Genere>)
                })
              }
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl text-white">Genres</h3>
            <div className="text-white leading-tight tracking-tight">{tvSeriesResponse?.overview}</div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl text-white">Casts</h3>
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {
                casteResponse?.cast?.map((caste) => {
                  return (<Caste key={caste.id}>{caste.name}</Caste>)
                })
              }
            </div>
          </div>
          <div>
            <button
              onClick={() => window.open(tvSeriesResponse?.homepage, "_blank")}
              className="bg-blue-700 hover:bg-blue-800 text-white rounded py-2 px-5 flex items-center"
            >
              Website <LinkIcon className="-rotate-45 ml-2" />
            </button>
          </div>
        </div>
      </div>
  )

}

export default TV;