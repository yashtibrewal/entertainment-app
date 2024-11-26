import { useEffect, useState } from "react"
import getTvSeriesApi from "./api";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import TitleValue from "./TitleValue";
import Genere from "./Genre";
import Caste from "./Caste";
import LinkIcon from '@mui/icons-material/Link';
import ReviewStars from "./ReviewStars";

function TV() {

  const { id } = useParams();
  const { state } = useAuth()
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tvSeriesResponse, setTvSeriesResponse] = useState({});
  // requires tv series id
  // const tvSeriesResponse = {
  //   "adult": false,
  //   "backdrop_path": "/uj2ZzCO1p5ZxvcRo7wtXtKebLxS.jpg",
  //   "created_by": [
  //     {
  //       "id": 117443,
  //       "credit_id": "525743f5760ee36aaa0e0ff8",
  //       "name": "Dick Wolf",
  //       "original_name": "Dick Wolf",
  //       "gender": 2,
  //       "profile_path": "/tRMEuYNVFjXYJ7gh1sGJSxq9Vwq.jpg"
  //     }
  //   ],
  //   "episode_run_time": [
  //     43
  //   ],
  //   "first_air_date": "1999-09-20",
  //   "genres": [
  //     {
  //       "id": 80,
  //       "name": "Crime"
  //     },
  //     {
  //       "id": 18,
  //       "name": "Drama"
  //     },
  //     {
  //       "id": 9648,
  //       "name": "Mystery"
  //     }
  //   ],
  //   "homepage": "http://www.nbc.com/law-and-order-special-victims-unit",
  //   "id": 2734,
  //   "in_production": true,
  //   "languages": [
  //     "en"
  //   ],
  //   "last_air_date": "2024-11-21",
  //   "last_episode_to_air": {
  //     "id": 5698461,
  //     "name": "Cornered",
  //     "overview": "Carisi tries to protect two women taken hostage in a tense standoff between police and a violent thief. Benson and Rollins devise a risky plan to get everyone to safety.",
  //     "vote_average": 10,
  //     "vote_count": 1,
  //     "air_date": "2024-11-21",
  //     "episode_number": 8,
  //     "episode_type": "mid_season",
  //     "production_code": "",
  //     "runtime": null,
  //     "season_number": 26,
  //     "show_id": 2734,
  //     "still_path": "/ltYtocKvI4kaJGbRoFldsZNL5ks.jpg"
  //   },
  //   "name": "Law & Order: Special Victims Unit",
  //   "next_episode_to_air": {
  //     "id": 5772729,
  //     "name": "Episode 9",
  //     "overview": "",
  //     "vote_average": 0,
  //     "vote_count": 0,
  //     "air_date": "2025-01-16",
  //     "episode_number": 9,
  //     "episode_type": "standard",
  //     "production_code": "",
  //     "runtime": null,
  //     "season_number": 26,
  //     "show_id": 2734,
  //     "still_path": null
  //   },
  //   "networks": [
  //     {
  //       "id": 6,
  //       "logo_path": "/cm111bsDVlYaC1foL0itvEI4yLG.png",
  //       "name": "NBC",
  //       "origin_country": "US"
  //     }
  //   ],
  //   "number_of_episodes": 560,
  //   "number_of_seasons": 26,
  //   "origin_country": [
  //     "US"
  //   ],
  //   "original_language": "en",
  //   "original_name": "Law & Order: Special Victims Unit",
  //   "overview": "In the criminal justice system, sexually-based offenses are considered especially heinous. In New York City, the dedicated detectives who investigate these vicious felonies are members of an elite squad known as the Special Victims Unit. These are their stories.",
  //   "popularity": 802.977,
  //   "poster_path": "/abWOCrIo7bbAORxcQyOFNJdnnmR.jpg",
  //   "production_companies": [
  //     {
  //       "id": 25545,
  //       "logo_path": "/jH9KNT9C9fYMrGqD4IKLlRL6MYN.png",
  //       "name": "Wolf Entertainment",
  //       "origin_country": "US"
  //     },
  //     {
  //       "id": 26727,
  //       "logo_path": "/jeTxdjXhzgKZyLr3l9MllkTn3fy.png",
  //       "name": "Universal Television",
  //       "origin_country": "US"
  //     },
  //     {
  //       "id": 56401,
  //       "logo_path": null,
  //       "name": "Studios USA",
  //       "origin_country": "US"
  //     },
  //     {
  //       "id": 8301,
  //       "logo_path": "/zrcVDabl14MNfPwxL8DC2IyR12t.png",
  //       "name": "Universal Media Studios",
  //       "origin_country": "US"
  //     }
  //   ],
  //   "production_countries": [
  //     {
  //       "iso_3166_1": "US",
  //       "name": "United States of America"
  //     }
  //   ],
  //   "seasons": [
  //     {
  //       "air_date": null,
  //       "episode_count": 6,
  //       "id": 8888,
  //       "name": "Specials",
  //       "overview": "",
  //       "poster_path": null,
  //       "season_number": 0,
  //       "vote_average": 0
  //     },
  //     {
  //       "air_date": "1999-09-20",
  //       "episode_count": 22,
  //       "id": 8878,
  //       "name": "Season 1",
  //       "overview": "",
  //       "poster_path": "/3JDK3vC9SuRv1He9tYCGUqFvtQG.jpg",
  //       "season_number": 1,
  //       "vote_average": 7.2
  //     },
  //     {
  //       "air_date": "2000-10-20",
  //       "episode_count": 21,
  //       "id": 8877,
  //       "name": "Season 2",
  //       "overview": "",
  //       "poster_path": "/unbMXpSvJ8TTfnDZyKDGfw8UzPy.jpg",
  //       "season_number": 2,
  //       "vote_average": 7.8
  //     },
  //     {
  //       "air_date": "2001-09-28",
  //       "episode_count": 23,
  //       "id": 8876,
  //       "name": "Season 3",
  //       "overview": "",
  //       "poster_path": "/tPzDrjnHxEob8WffmAUyRkHzd6F.jpg",
  //       "season_number": 3,
  //       "vote_average": 7.8
  //     },
  //     {
  //       "air_date": "2002-09-27",
  //       "episode_count": 25,
  //       "id": 8885,
  //       "name": "Season 4",
  //       "overview": "",
  //       "poster_path": "/mVFYHevnP7rHzmWQDrd4Ht6xSeM.jpg",
  //       "season_number": 4,
  //       "vote_average": 7.4
  //     },
  //     {
  //       "air_date": "2003-09-23",
  //       "episode_count": 25,
  //       "id": 8881,
  //       "name": "Season 5",
  //       "overview": "",
  //       "poster_path": "/yTEy3OaaFhHvytThSh0W1psQddl.jpg",
  //       "season_number": 5,
  //       "vote_average": 7.5
  //     },
  //     {
  //       "air_date": "2004-09-21",
  //       "episode_count": 23,
  //       "id": 8880,
  //       "name": "Season 6",
  //       "overview": "",
  //       "poster_path": "/p3iU1fLz9h8O1d6g4KrOzKbU2vq.jpg",
  //       "season_number": 6,
  //       "vote_average": 7.3
  //     },
  //     {
  //       "air_date": "2005-09-20",
  //       "episode_count": 22,
  //       "id": 8884,
  //       "name": "Season 7",
  //       "overview": "",
  //       "poster_path": "/xWrvoQnxC7qUdVFmJuXhLd4bMfu.jpg",
  //       "season_number": 7,
  //       "vote_average": 7.4
  //     },
  //     {
  //       "air_date": "2006-09-18",
  //       "episode_count": 22,
  //       "id": 8879,
  //       "name": "Season 8",
  //       "overview": "",
  //       "poster_path": "/mvNHgkbvREA6ty5lJpW4Dj0ks7L.jpg",
  //       "season_number": 8,
  //       "vote_average": 7.3
  //     },
  //     {
  //       "air_date": "2007-09-25",
  //       "episode_count": 19,
  //       "id": 8882,
  //       "name": "Season 9",
  //       "overview": "",
  //       "poster_path": "/hSJbnNHL2Hlm6HO2JzrT0s4vNVZ.jpg",
  //       "season_number": 9,
  //       "vote_average": 7.6
  //     },
  //     {
  //       "air_date": "2008-09-22",
  //       "episode_count": 22,
  //       "id": 8883,
  //       "name": "Season 10",
  //       "overview": "",
  //       "poster_path": "/j2qRsT11WL8sX1ULWWxS7opu8Dj.jpg",
  //       "season_number": 10,
  //       "vote_average": 7.5
  //     },
  //     {
  //       "air_date": "2009-09-23",
  //       "episode_count": 24,
  //       "id": 8886,
  //       "name": "Season 11",
  //       "overview": "",
  //       "poster_path": "/bcuIWfuiH7Tq9YGSQQZfZmf8UYJ.jpg",
  //       "season_number": 11,
  //       "vote_average": 7.3
  //     },
  //     {
  //       "air_date": "2010-09-21",
  //       "episode_count": 24,
  //       "id": 8887,
  //       "name": "Season 12",
  //       "overview": "",
  //       "poster_path": "/igsSNddE8ROWQ19pl88Frx8hKOa.jpg",
  //       "season_number": 12,
  //       "vote_average": 7.3
  //     },
  //     {
  //       "air_date": "2011-09-21",
  //       "episode_count": 23,
  //       "id": 8889,
  //       "name": "Season 13",
  //       "overview": "Season 13 dealt with the departure of Detective Elliot Stabler from the Special Victims Unit after a shooting in the squad room.",
  //       "poster_path": "/noc79PeGMcZw2qCiVbyQV8B6q42.jpg",
  //       "season_number": 13,
  //       "vote_average": 7.5
  //     },
  //     {
  //       "air_date": "2012-09-26",
  //       "episode_count": 24,
  //       "id": 8890,
  //       "name": "Season 14",
  //       "overview": "",
  //       "poster_path": "/mkdMIq9YYfKQXVB48otcbSr3m04.jpg",
  //       "season_number": 14,
  //       "vote_average": 7.9
  //     },
  //     {
  //       "air_date": "2013-09-25",
  //       "episode_count": 24,
  //       "id": 8891,
  //       "name": "Season 15",
  //       "overview": "",
  //       "poster_path": "/9unR6QVh6WBiAv0CK1admWtM8Tx.jpg",
  //       "season_number": 15,
  //       "vote_average": 8.2
  //     },
  //     {
  //       "air_date": "2014-09-24",
  //       "episode_count": 23,
  //       "id": 62900,
  //       "name": "Season 16",
  //       "overview": "",
  //       "poster_path": "/fxONX6Mav1LUxtEfMVfRnThUoUw.jpg",
  //       "season_number": 16,
  //       "vote_average": 8.1
  //     },
  //     {
  //       "air_date": "2015-09-23",
  //       "episode_count": 23,
  //       "id": 68816,
  //       "name": "Season 17",
  //       "overview": "",
  //       "poster_path": "/ncwK9fT1cxV5LIZkRLhScd0ksFO.jpg",
  //       "season_number": 17,
  //       "vote_average": 8.3
  //     },
  //     {
  //       "air_date": "2016-09-21",
  //       "episode_count": 21,
  //       "id": 79484,
  //       "name": "Season 18",
  //       "overview": "",
  //       "poster_path": "/4QdKXQf1NhxpcTYZJ8Frf7RwHV4.jpg",
  //       "season_number": 18,
  //       "vote_average": 7.8
  //     },
  //     {
  //       "air_date": "2017-09-27",
  //       "episode_count": 24,
  //       "id": 91257,
  //       "name": "Season 19",
  //       "overview": "",
  //       "poster_path": "/yzMQBlirydvKp4Zgr5FbXlsrRmw.jpg",
  //       "season_number": 19,
  //       "vote_average": 7.9
  //     },
  //     {
  //       "air_date": "2018-09-27",
  //       "episode_count": 24,
  //       "id": 105509,
  //       "name": "Season 20",
  //       "overview": "",
  //       "poster_path": "/yb8dhag59L0JKAVh1Yz1i1MJW4f.jpg",
  //       "season_number": 20,
  //       "vote_average": 7.4
  //     },
  //     {
  //       "air_date": "2019-09-26",
  //       "episode_count": 20,
  //       "id": 129334,
  //       "name": "Season 21",
  //       "overview": "",
  //       "poster_path": "/7k7T2rL0WoSJiSFFI6zUsq5a0GS.jpg",
  //       "season_number": 21,
  //       "vote_average": 7.5
  //     },
  //     {
  //       "air_date": "2020-11-12",
  //       "episode_count": 16,
  //       "id": 160634,
  //       "name": "Season 22",
  //       "overview": "",
  //       "poster_path": "/jDCgWVlejIo8sQYxw3Yf1cVQUIL.jpg",
  //       "season_number": 22,
  //       "vote_average": 8.3
  //     },
  //     {
  //       "air_date": "2021-09-23",
  //       "episode_count": 22,
  //       "id": 202465,
  //       "name": "Season 23",
  //       "overview": "",
  //       "poster_path": "/ywBt4WKADdMVgxTR1rS2uFwMYTH.jpg",
  //       "season_number": 23,
  //       "vote_average": 8.3
  //     },
  //     {
  //       "air_date": "2022-09-22",
  //       "episode_count": 22,
  //       "id": 299109,
  //       "name": "Season 24",
  //       "overview": "",
  //       "poster_path": "/e8cx3BVz6jJDLEgW02UQhEBtsZw.jpg",
  //       "season_number": 24,
  //       "vote_average": 8.3
  //     },
  //     {
  //       "air_date": "2024-01-18",
  //       "episode_count": 13,
  //       "id": 366618,
  //       "name": "Season 25",
  //       "overview": "",
  //       "poster_path": "/cK6Pn91ZwwO2osSjRNkDPK9qWa2.jpg",
  //       "season_number": 25,
  //       "vote_average": 8.1
  //     },
  //     {
  //       "air_date": "2024-10-03",
  //       "episode_count": 9,
  //       "id": 401572,
  //       "name": "Season 26",
  //       "overview": "",
  //       "poster_path": "/abWOCrIo7bbAORxcQyOFNJdnnmR.jpg",
  //       "season_number": 26,
  //       "vote_average": 8.3
  //     }
  //   ],
  //   "spoken_languages": [
  //     {
  //       "english_name": "English",
  //       "iso_639_1": "en",
  //       "name": "English"
  //     }
  //   ],
  //   "status": "Returning Series",
  //   "tagline": "Hope in the darkness.",
  //   "type": "Scripted",
  //   "vote_average": 7.93,
  //   "vote_count": 3822
  // }

  // requires tv series id
  const ratingResponse = {
    "id": 2734,
    "page": 1,
    "results": [
      {
        "author": "MovieGuys",
        "author_details": {
          "name": "",
          "username": "MovieGuys",
          "avatar_path": null,
          "rating": 3
        },
        "content": "This series is a poster child for the way the US wants the world, to perceive its justice system.\r\n\r\nHard working, earnest police, backed by an imperfect but mostly well meaning, justice system. \r\n\r\nOf course, if you look behind the veil nothing could be further from the truth. The justice system and not just in the US, mind you is abuse and broken. More often than not failing victims and on a certain level, criminals, who often started out as victims of its indifference and outright cruelty.\r\n\r\nI find long running series like this one annoying, in so much as they largely, shore up establishment narratives, rather than exposing them, for what they are.\r\n\r\nActing is reasonable but feels a little forced and unrealistic, at times. Its not helped by rather predictably, formulaic characterisations. \r\n\r\nIn summary, I rate this series down not just because its somewhat formulaic and bland but because, in my view, it does the truth of the world we live in, a disservice. Things can only improve when reality is exposed for what it is, not buried beneath pro establishment, \"the system mostly works\" narratives.",
        "created_at": "2024-08-17T23:29:34.195Z",
        "id": "66c1325eecbb1915cc898af9",
        "updated_at": "2024-08-17T23:31:04.886Z",
        "url": "https://www.themoviedb.org/review/66c1325eecbb1915cc898af9"
      },
      {
        "author": "Nicki",
        "author_details": {
          "name": "Nicki",
          "username": "nickicole365",
          "avatar_path": null,
          "rating": 9
        },
        "content": "**26 SEASONS** there's a reason SVU is the longest-running primetime live-action series on American television. Every year this show is a must watch. The storylines are compelling and the actors are usually current, former or up-and-coming stars. Some \"fans\" have complained about the changing of cast members but I think it's what keeps the show fresh. Hoping for many more seasons with Benson to come.",
        "created_at": "2024-10-11T08:08:59.951Z",
        "id": "6708dd1b8d487f6541286af6",
        "updated_at": "2024-10-16T16:36:51.402Z",
        "url": "https://www.themoviedb.org/review/6708dd1b8d487f6541286af6"
      }
    ],
    "total_pages": 1,
    "total_results": 2
  }

  // requires tv series id, and season number,
  // Using lastest season number
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

    console.log(id);
    console.log(state.token);
    getTvSeriesApi(id, state.token).then((result) => {
      setTvSeriesResponse(result);
      setLoading(false);
    })

    if (ratingResponse?.results?.[0]?.author_details?.rating) {
      setRating(ratingResponse.results[0].author_details.rating);
    }

  },[]);

  return (
    loading ? <div>Loading</div> :
      <div className="flex bg-black gap-x-10 min-h-screen px-12 lg:px-24 xl:px-48 lg:py-6 2xl:py-12">
        <div className="w-1/3">
          <img className="rounded" src={configurationResponse?.images?.base_url + "/" +
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