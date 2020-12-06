<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/note.jpg">
      </div>
    </router-link>
    <div class="title">
      <h1>Learning Note</h1>
      <h2>(2020 Fall Semester)</h2>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <router-link to="/admin">Admin</router-link>
    <a href="">GitHub</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #e3e3e3;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 0px 100px 10px 100px;
  background-color: #18224B;
  color: #1C454F;
}

.logo img {
  width: 50px;
  height: 50px;
  margin-top: 20px;
  margin-right: 20px;
}

.title {
  margin-top: 5px;
  color: white;
}

.title h1 {
  font-size: 30px;
}

.title h2 {
  font-size: 20px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #18224B;
  font-size: 14px;
}

.footer a {
  color: white;
  margin-left: 75px;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
