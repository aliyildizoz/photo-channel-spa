export default {
    categories: [],
    selectedCategories: [],
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
        isLoading: true,
        detail: {}
    },
    isLoading: true,
    currentChannel: {
        channelDetail: {},
        categories: [],
        channelPhotos: [],
        photoGallery: [],
        subscribers: [],
        isSubs: false,
        isOwner: false,
        channelIsLoading: true
    },
    home: {
        mostPhotos: [],
        mostComments: [],
        mostChannels: [],
        feed: []
    },
    search: {
        searchTextRes: {},
        searchCategory: []
    }
}