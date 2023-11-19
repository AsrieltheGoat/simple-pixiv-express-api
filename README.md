# Pixiv Artwork API

This project is a simple Express.js server that fetches artwork from Pixiv based on a search query and returns the artwork and artist information along with the images in base64 format.

## Installation

1. Clone the repository
2. Install the dependencies using `npm install`

## Usage

Start the server using:

```bash 
npm start
```

 The server will start on port 3000.

You can make a GET request to the root endpoint (`/`) with an optional word query parameter to search for specific artwork. If no word is provided, the server will default to searching for "初音ミク" (Hatsune Miku). 

The response will be a JSON object containing the following information:

- `info`: An array containing an object with the following properties:
    - `artwork`: An array containing an object with the following properties:
        - `id`: The ID of the artwork
        - `title`: The title of the artwork
        - `created_time`: The creation date of the artwork
        - `page_count`: The number of pages in the artwork
        - `illust_r18`: Whether the artwork is R18
        - `illust_url`: The URL of the artwork on Pixiv
        - `image_url`: The URL of the artwork image
        - `tags`: An array of tags associated with the artwork
    - `artist`: An array containing an object with the following properties:
        - `artist`: The name of the artist
        - `artist_preferred_name`: The preferred name of the artist
        - `artist_url`: The URL of the artist's profile on Pixiv
        - `artist_id`: The ID of the artist
        - `artist_image_url`: The URL of the artist's profile image
- `image`: An array containing an object with the following properties:
    - `artwork`: The artwork image in base64 format
    - `artist`: The artist's profile image in base64 format

## Environment Variables

You need to provide your Pixiv refresh token as an environment variable named `REFRESH_TOKEN`. You can do this by creating a `.env` file in the root directory of the project with the following content:

