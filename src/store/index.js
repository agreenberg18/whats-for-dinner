import { createStore } from 'vuex'

export default createStore({
  state: {
    data: {},
    restaurants: [],
    website: {},
    dataReceived: 0,
    winner: {},
    loadingStatus: false
  },
  mutations: {
    resetData(state) {
      state.data = {}
      state.restaurants = []
      state.website = {}
      state.winner = {}
      state.stars = []
      state.dataReceived = 0
    },
    loadingStatus(state, newLoadingStatus) {
      state.loadingStatus = newLoadingStatus
    },

    getData(state, data) {
      //console.log(data)
      state.data = data
      for (var i = 0; i < data.businesses.length; i++) {
        if (i == data.businesses.length - 1) {
          state.dataReceived = 1
        }
        if (state['stars'].includes(data.businesses[i].rating.toString()) === true){
        state.restaurants.push(data.businesses[i].name)
        state.website[data.businesses[i].name] = data.businesses[i].url
        }
      }
      state.loadingStatus = false
    },
    setStars(state, stars){
      state.stars = stars.split(',')
      console.log(state.stars)
    },
    setWinner(state, theWinner) {
      state.winner = theWinner
    }
  },
  actions: {
    getRestaurants(context, yelpParams) {
      var meters = parseInt(yelpParams['range']) * 1609
      var stars = yelpParams.stars
      context.commit('resetData')
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      var params = ""
      var params = "location=" + yelpParams['location'] + "&" + "price=" + yelpParams['price'] + "&open_now=" + yelpParams['openOnly'] + "&radius=" + meters + "&limit=50&sort_by=rating" 
      
      fetch("https://dinnerspinner.io/testing/getRestaurants?" + params, requestOptions)
        .then(context.commit('loadingStatus', true))
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {
          console.log(data)
          console.log('stars in actions, ', stars)
          context.commit('setStars', stars)
          context.commit('getData', data)
        })
        .catch(e => console.log(e))

    },
    setWinner(context, theWinner) {
      console.log(theWinner)
      context.commit('setWinner', theWinner)
    }
  },
  getters: {
    allRestaurants: (state) => {
      //console.log(state.restaurants)
      return state.restaurants
    },
    restaurantUrls: (state) => {
      //console.log(state.restaurants)
      return state.website
    },
    getWinner: (state) => {
      return state.winner
    },
    dataReceived: (state) => {
      return state.dataReceived
    },
    loadingStatus: (state) => {
      return state.loadingStatus
    }
  }
})