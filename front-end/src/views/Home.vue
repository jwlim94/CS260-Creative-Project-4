<template>
<div class="home">
  <section class="image-gallery">
    <div class="note" v-for="item in items" :key="item.id">
      <div class="subject-date">
        <h2 id="subject">Subject: {{item.subject}}</h2>
        <h2 id="title">Title: {{item.title}}</h2>
        <h2 id="keyword">Keyword: {{item.keyword}}</h2>
        <h2 id="date">--{{item.date}}</h2>
      </div>
      <div class="description">
        <h2>Explanation: {{item.description}}</h2>
      </div>
      <div class="line"></div>
    </div>
  </section>
</div>
</template>

<style scoped>
/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.note {
  margin: 0 0 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #18224B;
}

.note h2 {
  font-size: 18px;
}

#subject {
  display: inline-block;
  color: #4691ce;
}

#title {
  display: inline-block;
  margin-left: 50px;
}

#keyword {
  display: inline-block;
  margin-left: 50px;
}

#date {
  display: inline-block;
  margin-left: 50px;
  color: #0dba32;
}

.description h2 {
  color: #d3912e;
  font-size: 20px;
}

.line {
  width: 100%;
  border: 1px solid #18224B;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 1;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 1;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 1;
  }
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
