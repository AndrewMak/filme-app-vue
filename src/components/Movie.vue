<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 mr-1 ml-1>
        <v-card>
          <v-img :src="singleMovie.Poster" aspect-ratio="2"></v-img>
          <v-card-title primary-title>
            <div>
              <h2 class="headline mb-0">{{singleMovie.Title}}-{{singleMovie.Year}}</h2>
              <p>{{ singleMovie.Plot}}</p>
              <h3>Actors:</h3>
              {{singleMovie.Actors}}
              <h4>Awards:</h4>
              {{singleMovie.Awards}}
              <p>Genre: {{singleMovie.Genre}}</p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="green" @click="back">Voltar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      singleMovie: ""
    };
  },
  mounted() {
    axios
      .get(
        "http://www.omdbapi.com/?apikey=b76b385c&i=" +
          this.id +
          "&Content-Type=application/json"
      )
      .then(response => {
        this.singleMovie = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    back() {
      this.$router.push("/");
    }
  }
};
</script>
<style>
</style>