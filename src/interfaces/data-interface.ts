export interface EncodeUrlPayload {
    url: string;
}

export interface EncodeUrlResponse {
    shortUrl: string;
    id: string;
}

export interface UrlRecord {
    short_code: string,
    originalUrl: string,
    visits: number,
    createdAt: string,
    short_url: string,
    updatedAt: string,
    shortCode: string
}


export interface DecodeUrlResponse {
    url: string
}

export interface DecodeUrlPayload {
    url: string
}