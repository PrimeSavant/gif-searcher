import { GiphyFetch } from '@giphy/js-fetch-api';

// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY as string)

export default gf;