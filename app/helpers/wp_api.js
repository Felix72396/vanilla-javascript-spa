
const NAME = "css-tricks",
DOMAIN = `https://${NAME}.com`,
SITE = `${DOMAIN}/wp-json`,
API_WP = `${SITE}/wp/v2`,
POST_COUNT = 12,
POSTS_URL = `${API_WP}/posts?_embed&per_page=${POST_COUNT}`,
POST_URL = `${API_WP}/posts`,
SEARCH_URL = `${API_WP}/search?_embed&per_page=${POST_COUNT}&search=`,
PAGES_URL = `${API_WP}/pages`,
TAGS_URL = `${API_WP}/tags`,
CATEGORIES_URL = `${API_WP}/categories`;

let page = 1;

export default {
    NAME,
    DOMAIN,
    SITE,
    API_WP,
    POST_COUNT,
    POSTS_URL,
    POST_URL,
    CATEGORIES_URL,
    SEARCH_URL,
    page
};






