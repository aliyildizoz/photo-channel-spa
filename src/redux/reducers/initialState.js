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
        isOwner: false
    },
    currentUser: {},
    isLoading: true,
    userUpdateRes: {},
    currentChannel: {
        channelDetail: {},
        categories: [],
        channelPhotos: [],
        photoGallery: [],
        subscribers: [],
        isSubs: false,
        isOwner: false
    },
    // channels: [],
    channelCRUDState: {
        channelUpdateResult: {},
        channelCreateResult: {}
    },
    isStateEmpty: false
}