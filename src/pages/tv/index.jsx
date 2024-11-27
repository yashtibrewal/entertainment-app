import { useEffect, useState } from "react"
import getTvSeriesApi from "./api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import LinkIcon from '@mui/icons-material/Link';
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
  const casteResponse = {
    "cast": [
      {
        "adult": false,
        "gender": 1,
        "id": 6240,
        "known_for_department": "Acting",
        "name": "Mariska Hargitay",
        "original_name": "Mariska Hargitay",
        "popularity": 24.204,
        "profile_path": "/7tULgPSy5hksTi7mBF9uOnrrzHX.jpg",
        "character": "Olivia Benson",
        "credit_id": "5431f1ec0e0a2646490047cf",
        "order": 0
      },
      {
        "adult": false,
        "gender": 2,
        "id": 21411,
        "known_for_department": "Acting",
        "name": "Ice-T",
        "original_name": "Ice-T",
        "popularity": 14.396,
        "profile_path": "/96TdPckI16ggfHcPrSFf6bHYLLe.jpg",
        "character": "Odafin 'Fin' Tutuola",
        "credit_id": "525743f3760ee36aaa0e0814",
        "order": 5
      },
      {
        "adult": false,
        "gender": 2,
        "id": 1217599,
        "known_for_department": "Acting",
        "name": "Peter Scanavino",
        "original_name": "Peter Scanavino",
        "popularity": 18.283,
        "profile_path": "/kQzX89Ar4rEC1wwHcuDMr0YxUve.jpg",
        "character": "Dominick 'Sonny' Carisi Jr.",
        "credit_id": "5431f2a30e0a2656e200307b",
        "order": 6
      },
      {
        "adult": false,
        "gender": 2,
        "id": 1478384,
        "known_for_department": "Acting",
        "name": "Octavio Pisano",
        "original_name": "Octavio Pisano",
        "popularity": 5.087,
        "profile_path": "/pGd6zEplbaI5oCJwwOXZ1Ueox1C.jpg",
        "character": "Joe Velasco",
        "credit_id": "61c4c0adefd3c2004196d4ce",
        "order": 15
      },
      {
        "adult": false,
        "gender": 2,
        "id": 1413757,
        "known_for_department": "Acting",
        "name": "Kevin Kane",
        "original_name": "Kevin Kane",
        "popularity": 8.594,
        "profile_path": "/e0yDVCropmYrjJxHaVX0gxCiYiL.jpg",
        "character": "Terry Bruno",
        "credit_id": "63c1e134a5743d00dd54f34f",
        "order": 22
      },
      {
        "adult": false,
        "gender": 1,
        "id": 2969415,
        "known_for_department": "Acting",
        "name": "Juliana Aidén Martinez",
        "original_name": "Juliana Aidén Martinez",
        "popularity": 5.342,
        "profile_path": "/qTbSpmvbrbOKRzgo3LxmuQ0yxkp.jpg",
        "character": "Kate Silva",
        "credit_id": "66ff6e96b146282f7b8501f7",
        "order": 23
      }
    ],
    "crew": [],
    "id": 401572
  }

  const configurationResponse = {
    "images": {
      "base_url": "http://image.tmdb.org/t/p/",
      "secure_base_url": "https://image.tmdb.org/t/p/",
      "backdrop_sizes": [
        "w300",
        "w780",
        "w1280",
        "original"
      ],
      "logo_sizes": [
        "w45",
        "w92",
        "w154",
        "w185",
        "w300",
        "w500",
        "original"
      ],
      "poster_sizes": [
        "w92",
        "w154",
        "w185",
        "w342",
        "w500",
        "w780",
        "original"
      ],
      "profile_sizes": [
        "w45",
        "w185",
        "h632",
        "original"
      ],
      "still_sizes": [
        "w92",
        "w185",
        "w300",
        "original"
      ]
    },
    "change_keys": [
      "adult",
      "air_date",
      "also_known_as",
      "alternative_titles",
      "biography",
      "birthday",
      "budget",
      "cast",
      "certifications",
      "character_names",
      "created_by",
      "crew",
      "deathday",
      "episode",
      "episode_number",
      "episode_run_time",
      "freebase_id",
      "freebase_mid",
      "general",
      "genres",
      "guest_stars",
      "homepage",
      "images",
      "imdb_id",
      "languages",
      "name",
      "network",
      "origin_country",
      "original_name",
      "original_title",
      "overview",
      "parts",
      "place_of_birth",
      "plot_keywords",
      "production_code",
      "production_companies",
      "production_countries",
      "releases",
      "revenue",
      "runtime",
      "season",
      "season_number",
      "season_regular",
      "spoken_languages",
      "status",
      "tagline",
      "title",
      "translations",
      "tvdb_id",
      "tvrage_id",
      "type",
      "video",
      "videos"
    ]
  }

  useEffect(() => {

    getTvSeriesApi(id, state.tmdbToken).then((result) => {
      setTvSeriesResponse(result);
      setRating(result.vote_average);
      setLoading(false);
    })

  }, [id]);

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
                  return (<Caste key={caste.id}>{caste.original_name}</Caste>)
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