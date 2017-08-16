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
        <label for="password">Address</label>
        <input type="text" class="form-control" v-model="contacts.address">
      </div>
      <button class="btn btn-success" @click="getContactList">Show All Contacts</button>
      <button class="btn btn-primary" @click="postContactList">Add Contact</button>
      <button class="btn btn-danger" @click="deleteContacts">Delete Contact</button>
      <br>
      <br>
      <div class="row">
        <div class="col-xs-3 col-sm-3">
          <h2>Name</h2>
          <br>
          <ul class="list-group">
            <li class="list-group-item list-group-item-action" v-for="c in contactsArr" @click="loadId">{{ c.name }}</li>
          </ul>
        </div>
        <div class="col-sm-3">
          <h2>Email</h2>
          <br>
          <ul class="list-group">
            <li class="list-group-item list-group-item-action" v-for="c in contactsArr">{{ c.email }}</li>
          </ul>
        </div>
        <div class="col-sm-3">
          <h2>Phone</h2>
          <br>
          <ul class="list-group">
            <li class="list-group-item list-group-item-action" v-for="c in contactsArr">{{ c.phone }}</li>
          </ul>
        </div>
        <div class="col-sm-3">
          <h2>Address</h2>
          <br>
          <ul class="list-group">
            <li class="list-group-item list-group-item-action" v-for="c in contactsArr">{{ c.address }}</li>
          </ul>
        </div>
      </div>
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
        address: ''
      },
      contactsArr: [],
      id: []
    };
  },
  methods: {
    loadId() {
      
    },
    getContactList() {
      this.$http.get('http://localhost:3000/api').then((res) => {
        return res.json();
      }).then(data => {
        console.log(data);
        var resultArr = [];
        for (let i in data) {
          resultArr.push(data[i]);
        }
        this.contactsArr = resultArr;
        console.log(this.contactsArr);
      }).catch((err) => {
        console.log(err);
      });
    },
    postContactList() {
      this.$http.post('http://localhost:3000/api', this.contacts).then((response) => {
        console.log(response);
      }, error => console.log(error));
    },
    deleteContacts() {
      this.$http.delete('http://localhost:3000/api/:id').then((res) => {
        console.log(res + 'deleted');
      });

    },
    updateContacts() {

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
