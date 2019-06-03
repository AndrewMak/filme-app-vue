<template>
    <div v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="limit"
    >
      <v-flex xs12 v-for="post in posts" :key="post.id" mb-2>
        <v-card data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
          <!-- <v-img :src="item.Poster" aspect-ratio="1"></v-img> -->
          <v-card-title primary-title>
            <div>
              <h2>{{post.title}}</h2>
              <!-- <div>Ano: {{item.Year}}</div>
              <div>Tipo: {{item.Type}}</div>-->
              <div>Descrição: {{post.body}}</div>
            </div>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn round color="green" @click="singleMovie(item.imdbID)">Ver Mais</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      posts: [],
      loading: true,
      busy: false,
      limit: 10
    };
  },
  methods: {
    loadMore() {
      this.busy = true;
      axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
        const append = response.data.slice(
          this.posts.length,
          this.posts.length + this.limit
        );
        this.posts.push(...append);
        this.busy = false;
        this.loading = false;
      });
    }
  },
  created() {
    this.loadMore();
  }
};
</script>
<style lang="stylus" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>