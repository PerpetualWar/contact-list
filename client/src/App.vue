<template>
  <div>
    <div class="col-sm-12">
      <h1 class="text-center">Contact List</h1>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" v-model="contacts.name">
        <label for="email">Email</label>
        <input type="text" class="form-control" v-model="contacts.email">
        <label for="phone">Phone</label>
        <input type="text" class="form-control" v-model="contacts.phone">
        <label for="password">Password</label>
        <input type="text" class="form-control" v-model="contacts.password">
      </div>
      <button class="btn btn-primary" @click="getContactList">Show All Contacts</button>
      <button class="btn btn-primary" @click="postContactList">Add Contact</button>
      <ul class="list-group">
        <li class="list-group-item" v-for="c in contactsArr">{{ c.name }} - {{ c.email}} - {{ c.phone }} - {{ c.password }} </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: {
        name: '',
        email: '',
        phone: '',
        password: ''
      },
      contactsArr: []
    };
  },
  methods: {
    getContactList() {
      this.$http.get('http://localhost:3000/api').then((res) => {
        return res.json();
      }).then(data => {
        var resultArr = [];
        for (let i in data) {
          resultArr.push(data[i]);
        }
        this.contactsArr = resultArr;
      }).catch((err) => {
        console.log(err);
      });
    },
    postContactList() {
      this.$http.post('http://localhost:3000/api', this.contacts).then((response) => {
        console.log(response);
      }, error => console.log(error));
    }
  }
}
</script>

<style>
body {
  background-color: #228288;
  margin-top: 40px;
}
</style>
