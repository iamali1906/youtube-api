import { FC } from "react"

const VideoPreviewCard: FC<any> = ({ item }) => {
    const YOUTUBE_PLAYER_URL = `https://www.youtube.com/watch?v=${item?.id}`

    return (
        <div className="video-preview">
            <div className="thumbnail-row">
                <a href={`${YOUTUBE_PLAYER_URL}`} target="_blank" className="video-title-link">
                    <img className="thumbnail" src={`${item?.snippet.thumbnails.high.url}`} alt={item.snippet.title} />
                </a>
            </div>
            <div className="video-info">
                <a href={`${YOUTUBE_PLAYER_URL}`} target="_blank" className="video-title-link">
                    <p className="video-title">{item?.snippet.title}</p>
                </a>
                <div className="video-info">
                    <p className="video-description">{item?.snippet.description}</p>
                    <p className="video-comments">comments &#183; {item.statistics.commentCount ?? "0"}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoPreviewCard