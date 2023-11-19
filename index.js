const express = require("express");
const dotenv = require("dotenv").config();
const imageToBase64 = require("image-to-base64");

const PixivApi = require("pixiv-api-client");
const pixiv = new PixivApi();

const app = express();

app.get("/", (req, res) => {
    const word = req.query.word || "初音ミク"; // "Hatsune Miku" in kanji as a default

    pixiv.refreshAccessToken(process.env.REFRESH_TOKEN).then(() => {
        return pixiv.searchIllust(word).then(async (json) => {
            const illust =
                json.illusts[Math.floor(Math.random() * json.illusts.length)];
            const ori_url = illust.image_urls.large;
            const url = ori_url.replace(
                "https://i.pximg.net/",
                "https://i.pixiv.cat/"
            );

            const artist_ori_url = illust.user.profile_image_urls.medium;
            const artist_url = artist_ori_url.replace(
                "https://i.pximg.net/",
                "https://i.pixiv.cat/"
            );

            // Convert image to base64
            const artwork_base64 = await imageToBase64(url);
            const artist_base64 = await imageToBase64(artist_url);

            // console.log(illust);
            const outJson = {
                info: [
                    {
                        artwork: [
                            {
                                id: illust.id,
                                title: illust.title,
                                created_time: illust.create_date,
                                page_count: illust.page_count,
                                illust_r18: illust.x_restrict,
                                illust_url:
                                    "https://www.pixiv.net/en/artworks/" +
                                    illust.id,
                                image_url: url,
                                tags: illust.tags.map((tag) => tag.name),
                            },
                        ],

                        artist: [
                            {
                                artist: illust.user.name,
                                artist_preferred_name: illust.user.account,
                                artist_url:
                                    "https://www.pixiv.net/member.php?id=" +
                                    illust.user.id,
                                artist_id: illust.user.id,
                                artist_image_url: artist_url,
                            },
                        ],
                    },
                ],

                image: [
                    {
                        artwork: artwork_base64,
                        artist: artist_base64,
                    },
                ],
            };

            // console.log(outJson);
            res.send(outJson);
        });
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
