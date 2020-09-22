const URL = "http://localhost:3000/tweets";

const onEnter = (e) => {
    if (e.key == "Enter") {
        getTwitterData();
    }
}

/**
 * Retrive Twitter Data from API
 */
const getTwitterData = () => {
    const query = document.getElementById('search-bar').value;
    if (!query) return;
    //encodes qurey so it does not break URL
    const encodedQuery = encodeURIComponent(query)
    const fullUrl = `${URL}?q=${encodedQuery}&count=10`;
    fetch(fullUrl).then((response) => {
        return response.json();
    }).then((data) => {
        buildTweets(data.statuses);    
    })
    
    
}


/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {
}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {
}

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
    console.log(tweets)
    let twitterContent = "";
    tweets.map((tweet) => {
        
        twitterContent += `
        <div class="tweet-container">
        <div class="tweet-user-info">

            <div class="user-profile" style="background-image: url(${tweet.user.profile_image_url_https})"></div>

            <div class="user-name-container">
                <div class="full-name">${tweet.user.name}</div>
                <div class="user-name">@${tweet.user.screen_name}</div>
            </div>
        </div>
        `
        
        if (tweet.extended_entities &&
            tweet.extended_entities.media && 
            tweet.extended_entities.media.length > 0) {
                twitterContent += buildImages(tweet.extended_entities.media);
                twitterContent += buildVideo(tweet.extended_entities.media);
        }
        
        twitterContent += `
        <div class="text-container">
        ${tweet.full_text}
        </div>
        <div class="date-container">
        20 hours ago
        </div>
        </div>`
    })
    document.querySelector(".tweets-list").innerHTML = twitterContent;
}

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {
    let imageContent = `<div class="image-container">`
    let imageExists = false
    mediaList.map((media)=> {
        if (media.type == 'photo') {
            imageExists = true
            imageContent += `<div class="tweet-image" style='background-image: url(${media.media_url_https})'></div>`

        }
    })
    imageContent += `</div>`
    return imageExists ? imageContent : '';
}

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {
    let videoContent = `<div class="video-container">`
    let videoExists = false
    mediaList.map((media)=> {
        if (media.type == 'video') {
            videoExists = true
            videoContent += `<video controls>
            <source src="${media.video_info.variants[0].url}" type ="video/mp4">
            </video>`

        } else if (media.type == 'animated_gif'){
            videoExists = true
            videoContent += `<video loop autoplay>
            <source src="${media.video_info.variants[0].url}" type ="video/mp4">
            </video>`
        }
    })
    videoContent += `</div>`
    return videoExists ? videoContent : '';
}
