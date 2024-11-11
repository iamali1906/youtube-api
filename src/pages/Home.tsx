
import { Select } from "antd";
import { useState } from "react";
import VideoPreviewCard from "../components/VideoCard";
import { handleEnter, likeCount, publishedAt, searchValue, Video, VideoArray } from "../interfaces/interfaces";
import { sortByDateOptions, sortByRatingOptions } from "../utils/utils";
import Search from "../components/SearchBar";

const HomePage = () => {
    const [videos, setVideos] = useState<VideoArray>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const API_KEY = import.meta.env.VITE_API_Key
    const BASE_URL = import.meta.env.VITE_BASE_URL

    const fetchVideos = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}search?key=${API_KEY}&part=snippet&q=${searchTerm}`
            );
            const data = await response.json();
            const videoIds = data.items.map((item: { id: { videoId: string; }; }) => item.id.videoId).join(',');
            fetchVideoIds(videoIds)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchVideoIds = async (videoIds: string) => {
        try {
            const response = await fetch(`${BASE_URL}videos?key=${API_KEY}&part=statistics,snippet&id=${videoIds}`)
            const data = await response.json();
            setVideos(data.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (event: searchValue) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event: handleEnter) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchVideos();
        }
    };


    const sortVideos = (order: string) => {
        const sortedVideos = [...videos].sort((a: publishedAt, b: publishedAt) => {
            const dateA = new Date(a.snippet.publishedAt);
            const dateB = new Date(b.snippet.publishedAt);

            return order === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
        });

        setVideos(sortedVideos);
    };


    const sortByRating = (order: string) => {
        const sortedVideos = [...videos].sort((a: likeCount, b: likeCount) => {
            const likeCountA = Number(a.statistics.likeCount);
            const likeCountB = Number(b.statistics.likeCount);

            return order === 'highest' ? likeCountB - likeCountA : likeCountA - likeCountB;
        });

        setVideos(sortedVideos);
    };


    return (
        <div>
            <div className="search-container">
                <Search
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress} />

                {videos?.length > 0 && <div>
                    <Select
                        defaultValue="s"
                        style={{ width: 140, height: 46, marginLeft: 10 }}
                        onChange={sortVideos}
                        options={sortByDateOptions}
                    />

                    <Select
                        defaultValue={'s'}
                        style={{ width: 140, height: 46, marginLeft: 10 }}
                        onChange={sortByRating}
                        options={sortByRatingOptions}
                    />
                </div>}
            </div>

            {videos.length > 0 ? (
                <section className="video-grid">
                    {videos.map((item: Video, index) => (
                        <div key={index}>
                            <VideoPreviewCard item={item} />
                        </div>
                    ))}
                </section>
            ) : (
                <div className="empty-container">Video not found</div>
            )}
        </div>
    );
};

export default HomePage;
