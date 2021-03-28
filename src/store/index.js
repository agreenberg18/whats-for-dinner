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
      state.dataReceived = 0
    },
    loadingStatus(state, newLoadingStatus){
      state.loadingStatus = newLoadingStatus
    },

    getData(state, data) {
      //console.log(data)
      state.data = data
      for (var i = 0; i < data.businesses.length; i++) {
        if (i == data.businesses.length - 1) {
          state.dataReceived = 1
        }
        state.restaurants.push(data.businesses[i].name)
        state.website[data.businesses[i].name] = data.businesses[i].url
      }
      state.loadingStatus = false
    },
    setWinner(state, theWinner) {
      state.winner = theWinner
    }
  },
  actions: {
    getRestaurants(context, location) {
      context.commit('resetData')
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://spinner-middleware.herokuapp.com/getRestaurants?location=" + location, requestOptions)
      .then(context.commit('loadingStatus', true))  
      .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {
          context.commit('getData', data)
        })
        .catch(e =>console.log(e))

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