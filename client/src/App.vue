<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
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
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
        <button class="btn btn-success" @click="getContactList">Show All Contacts</button>
        <button class="btn btn-primary" @click="postContactList">Add Contact</button>
        <button class="btn btn-danger" @click="deleteContacts">Delete Contact</button>
        <button class="btn btn-primary" @click="updateContacts">Update Contact</button>
      </div>
    </div><br><br>
    <div class="row">
      <div class="col-sm-6 col-sm-offset-3">
        <div class="alert alert-warning text-center">Click Name to select an item</div>
      </div>
    </div>
    <br>
    <br>
    <div class="row">
      <div class="col-xs-3">
        <h2 class="text-center">Name</h2>
        <br>
        <ul class="list-group">
          <li class="list-group-item list-group-item-action" v-for="(c, index) in contactsArr" @click="loadId(index)">{{ c.name }}</li>
        </ul>
      </div>
      <div class="col-xs-3">
        <h2 class="text-center">Email</h2>
        <br>
        <ul class="list-group">
          <li class="list-group-item list-group-item-action" v-for="c in contactsArr">{{ c.email }}</li>
        </ul>
      </div>
      <div class="col-xs-3">
        <h2 class="text-center">Phone</h2>
        <br>
        <ul class="list-group">
          <li class="list-group-item list-group-item-action" v-for="c in contactsArr">{{ c.phone }}</li>
        </ul>
      </div>
      <div class="col-xs-3">
        <h2 class="text-center">Address</h2>
        <br>
        <ul class="list-group">
          <li class="list-group-item list-group-item-action" v-for="c in contactsArr">{{ c.address }}</li>
        </ul>
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
      id: ''
    };
  },
  methods: {
    loadId(index) {
      this.$http.get('http://localhost:3000/api').then((res) => {
        return res.json();
      }).then((res) => {
        var id, name, email, phone, address;
        id = res[index]._id;
        name = res[index].name;
        email = res[index].email;
        phone = res[index].phone;
        address = res[index].address;
        this.id = id;
        this.contacts.name = name;
        this.contacts.email = email;
        this.contacts.phone = phone;
        this.contacts.address = address;
        console.log(id);
      });
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
        this.getContactList();
      }, error => console.log(error));
    },
    deleteContacts() {
      this.$http.delete('http://localhost:3000/api/' + this.id).then((res) => {
        console.log(res.body + 'deleted');
        this.getContactList();
      }, (err) => {
        console.log(err);
      });

    },
    updateContacts() {
      this.$http.patch('http://localhost:3000/api/' + this.id, this.contacts).then((res) => {
        console.log(res);
        this.getContactList();
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
