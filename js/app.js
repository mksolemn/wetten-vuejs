var app = new Vue({
  el: '#profiles',
  data: {
    search: '',
    selectedPlatform: '',
    selectedGenre: '',
    selectedStatus: '',
    profiles: []
  },
  created: function () {
    this.$http.get("../data/flm_criteria.json")
      .then(function (resp) {
        if (typeof resp.data == 'string') {
          resp.data = JSON.parse(resp.data);
        }
        this.profiles = resp.data;
      });
  },

  methods: {

    // add favorites

    addFav: function (event) {
      var countFavs = 0;
      for (var i = 0; this.profiles.length > i; i += 1) {

        // count favs
        if (this.profiles[i].fav === true) {
          countFavs += 1;
        }
        // find profile with matching id
        if (this.profiles[i]._id == event.target.getAttribute("data-id")) {

          if (!(this.profiles[i].fav == true)) {
            if (countFavs < 3) {
              this.profiles[i].fav = true;
              event.target.classList.add('faved');
              console.log('countFavs', countFavs);
              console.log('Item added', this.profiles[i]);
            }
          } else {
            this.profiles[i].fav = false;

            event.target.classList.remove('faved');
            countFavs -= 1;
            console.log('countFavs', countFavs);
            console.log('Item removed', this.profiles[i]);
          }
          console.log(this.profiles[i]);
          break;

        }
      }

    },

    // add friends
    addFriend: function (event) {
      var countfriend = 0;
      for (var i = 0; this.profiles.length > i; i += 1) {

        // count friend
        if (this.profiles[i].friend === true) {
          countfriend += 1;
        }
        // find profile with matching id
        if (this.profiles[i]._id == event.target.getAttribute("data-id")) {

          if (!(this.profiles[i].friend == true)) {
            if (countfriend < 3) {
              this.profiles[i].friend = true;
              event.target.classList.add('faved');
              console.log('countfriend', countfriend);
              console.log('Item added', this.profiles[i]);
            }
          } else {
            this.profiles[i].friend = false;

            event.target.classList.remove('faved');
            countfriend -= 1;
            console.log('countfriend', countfriend);
            console.log('Item removed', this.profiles[i]);
          }
          console.log(this.profiles[i]);
          break;

        }
      }

    },
  },

  computed: {

    // filters
    filteredProfiles: function () {
      var profile_array = this.profiles,
        search = this.search,
        selectedPlatform = this.selectedPlatform,
        selectedGenre = this.selectedGenre,
        selectedStatus = this.selectedStatus;

      profile_array = profile_array.filter(function (item) {
        if (item.name.first.indexOf(search) !== -1 || item.name.last.toLowerCase().indexOf(search) !== -1) {
          return item;
        }
      });

      profile_array = profile_array.filter(function (item) {
        if (item.platform.indexOf(selectedPlatform) !== -1) {
          return item;
        }
      });

      profile_array = profile_array.filter(function (item) {
        if (item.genre.indexOf(selectedGenre) !== -1) {
          return item;
        }
      });

      profile_array = profile_array.filter(function (item) {
        if (item.isAvailable.toString().indexOf(selectedStatus) !== -1) {
          return item;
        }
      });

      return profile_array;
    }
  },
  // number formating
  filters: {
    formatNumber: function (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    }
  }
})
