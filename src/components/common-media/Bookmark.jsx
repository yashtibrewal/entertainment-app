import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { MEDIA_TYPE } from "../../constants";
import { toggleMovieBookmark, toggleTVSeriesBookmark } from "../Content/api";
import { useEffect, useState } from "react";
import styles from './content.module.css';

export function Bookmark({id, media_type, bookmark, bookmarkClickEmit}) {
    
    const [isBookmarked, setIsBookmarked] = useState(bookmark || false);

    const bookmarkContent = (event) => {
        console.log('clicked bookmark');
        event.stopPropagation();
            if (media_type === MEDIA_TYPE.MOVIES) {
                toggleMovieBookmark(id, isBookmarked).then(({ result }) => {
                    setIsBookmarked(result.bookmark);
            });
            } else if (media_type === MEDIA_TYPE.TV_SERIES) {
                toggleTVSeriesBookmark(id, isBookmarked).then(({ result }) => {
                    setIsBookmarked(result.bookmark);
            });
        }
        bookmarkClickEmit && bookmarkClickEmit();
    }

    useEffect(() => {
        setIsBookmarked(bookmark);
      }, [bookmark]);

    return (<span
        onClick={bookmarkContent}
        className={styles.bookmark}>
        {isBookmarked ? (
            <FaBookmark className="text-white" />
        ) : (
            <FaRegBookmark className="text-white" />
        )}
    </span>)
    
}