// src/types/YouTubeSearchResult.ts

import { SetStateAction } from "react";

// types.ts

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}

export interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
}

export interface Localized {
    title: string;
    description: string;
}

export interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    categoryId: string;
    liveBroadcastContent: string;
    localized: Localized;
    tags?: string[];
}

export interface Statistics {
    viewCount: string;
    likeCount: number;
    favoriteCount: string;
    commentCount: number;
}

export interface Video {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
    statistics: Statistics;
}

export type VideoArray = Video[];

export type publishedAt = {
    snippet: {
        publishedAt: string;
    };
};
export type likeCount = {
    statistics: {
        likeCount: number;
    };
}

export type searchValue = { target: { value: SetStateAction<string>; }; }
export type handleEnter = { key: string; preventDefault: () => void; }