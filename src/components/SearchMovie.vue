<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs4 v-for="(item, index) in wholeResponse" :key="index" mb-2>
        <v-card>
          <v-img :src="item.Poster" aspect-ratio="1"></v-img>

          <v-card-title primary-title>
            <div>
              <h2>{{item.Title}}</h2>
              <div>Year: {{item.Year}}</div>
              <div>Type: {{item.Type}}</div>
              <div>IMDB-id: {{item.imdbID}}</div>
            </div>
          </v-card-title>

          <v-card-actions class="justify-center">
            <v-btn flat color="green" @click="singleMovie(item.imdbID)">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
// import { constants } from "fs";
export default {
  props: ["name"],
  data() {
    return {
      wholeResponse: []
    };
  },
  mounted() {
    axios
      .get(
        "http://www.omdbapi.com/?s=" +
          this.name +
          "&apikey=b76b385c&page=1&type=movie&Content-Type=application/json"
      )
      .then(response => {
        this.wholeResponse = response.data.Search;
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

