let MAIN_PAGE_PHOTOS = []
export const BASE_URL = "https://api.unsplash.com";

/* this is the default topic id if the user did not choose an topic */
export const DISCOVER = 0 

/*
    i think to make a class for this
*/
export const fetchFilter = {
    // empty then there is not a specific topic 'general search'
    tobicId : "",
    first_time : true
}

export const topics = []

export const mainLayout = {
    FIRSTFETCH : 0,
    SECONDFETCH : 1
}

export default MAIN_PAGE_PHOTOS