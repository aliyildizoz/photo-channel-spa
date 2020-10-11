export default {
    categories: [],
    currentCategory: {},
    apiResponse: { message: "", status: 0 },
    isLogged: false,
    user: {
        subscriptions: [],
        userChannels: [],
        likedPhotos: [],
        userPhotos: [],
        userDetail: {},
        commentsPhotos: [],
        isOwner: false,
        userIsLoading: true
    },
    currentUser: {
        currentUserIsLoading: true
    },
    isLoading: true,
    //--> currentUSer objesinin içine
    currentChannel: {
        channelDetail: {},
        categories: [],
        channelPhotos: [],
        photoGallery: [],
        subscribers: [],
        isSubs: false,
        isOwner: false,
        channelIsLoading: true
    }
}