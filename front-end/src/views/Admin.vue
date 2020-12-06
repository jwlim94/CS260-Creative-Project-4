<template>
<div class="admin">

  <div class="heading">
    <div class="rect">1</div>
    <h2 id="rect-title">Add a Note</h2>
  </div>

  <div class="add">
    <div class="form">
      <input id="subject" v-model="subject" placeholder="Subject">
      <input id="date" v-model="date" placeholder="Date">
      <p></p>
      <input id="title" v-model="title" placeholder="Title">
      <input id="keyword" v-model="keyword" placeholder="Keyword">
      <p></p>
      <textarea id="description" v-model="description" placeholder="Description"/>
      <p></p>
      <button @click="upload">Add</button>
    </div>
    <div class="upload" v-if="addItem">
      <h2>{{addItem.subject}}</h2>
      <h2>{{addItem.date}}</h2>
      <h2>{{addItem.title}}</h2>
      <h2>{{addItem.keyword}}</h2>
      <h2>{{addItem.description}}</h2>
    </div>
  </div>

  <div class="separator"></div>

  <div class="heading">
    <div class="rect">2</div>
    <h2 id="rect-title">Edit/Delete a Note</h2>
  </div>

  <div class="edit">
    <div class="form">
      <input id="search" v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
        </div>
      </div>
    </div>
    <div class="edited">
      <div class="upload" v-if="findItem">
        <input id="searched-subject" v-model="findItem.subject">
        <input id="searched-date" v-model="findItem.date">
        <p></p>
        <input id="searched-title" v-model="findItem.title">
        <input id="searched-keyword" v-model="findItem.keyword">
        <p></p>
        <textarea id="searched-description" v-model="findItem.description"/>
        <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button id="edit-button" @click="editItem(findItem)">Edit</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped>
.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

#rect-title {
  font-size: 18px;
}

.add,
.edit {
  display: flex;
}

.rect {
  border-radius: 20%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #18224B;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

#subject {
  width: 160px;
}

#date {
  margin-left: 10px;
  width: 160px;
}

#title {
  width: 160px;
}

#keyword {
  margin-left: 10px;
  width: 160px;
}

#description {
  width: 340px;
  height: 80px;
}

/* Uploaded note */
.upload h2 {
  margin: 0px;
}

.separator {
  margin-top: 35px;
}

/* Suggestions */
.edit {
  display: flex;
  flex-direction: column;
}

#search {
  width: 194px;
}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.edited {
  display: flex;
  flex-direction: row;
}

#searched-subject {
  width: 160px;
  margin-top: 20px;
}

#searched-date {
  width: 160px;
  margin-top: 20px;
  margin-left: 10px;
}

#searched-title {
  width: 160px;
}

#searched-keyword {
  width: 160px;
  margin-left: 10px;
}

#searched-description {
  width: 340px;
  height: 80px;
}

.actions {
  margin-top: 20px;
}

#edit-button {
  margin-left: 10px;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      subject: "",
      date: "",
      title: "",
      keyword: "",
      description: "",
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async upload() {
      try {
        let r1 = await axios.post('/api/items', {
          subject: this.subject,
          date: this.date,
          title: this.title,
          keyword: this.keyword,
          description: this.description,
        });
        this.addItem = r1.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          subject: this.findItem.subject,
          date: this.findItem.date,
          title: this.findItem.title,
          keyword: this.findItem.keyword,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>