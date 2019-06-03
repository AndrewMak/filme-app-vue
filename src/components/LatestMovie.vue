<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" color="green"></v-progress-circular>
    </div>
  </v-container>
  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex xs4 v-for="(item, index) in wholeResponse" :key="index" mb-2>
        <v-card>
          <v-img :src="item.Poster" aspect-ratio="1"></v-img>
          <v-card-title primary-title>
            <div>
              <h2>{{item.Title}}</h2>
              <div>Ano: {{item.Year}}</div>
              <div>Tipo: {{item.Type}}</div>
              <div>IMDB-id: {{item.imdbID}}</div>
            </div>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn round color="green" @click="singleMovie(item.imdbID)">Ver Mais</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      wholeResponse: [],
      loading: true
    };
  },
  mounted() {
    axios
      .get(
        "http://www.omdbapi.com/?s=game&apikey=b76b385c&page=1&type=movie&Content-Type=application/json"
      )
      .then(response => {
        this.wholeResponse = response.data.Search;
        this.loading = false;
      })
      .catch();
  },
  methods: {
    singleMovie(id) {
      this.$router.push("/movie/" + id);
    }
  }
};
</script>
<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>