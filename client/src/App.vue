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
        <button class="btn btn-info" @click="updateContacts">Update Contact</button>
      </div>
    </div>
    <br>
    <br>
    <div class="row">
      <div class="col-sm-6 col-sm-offset-3">
        <div class="alert alert-warning text-center">Click Name to select an item</div>
      </div>
    </div>
    <br>
    <br>
    <app-list :contactsArr="contactsArr" :loadId="loadId" :paginate="paginate"></app-list>
  </div>
</template>

<script>
import List from './List.vue';

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
      id: '',
      paginate: ['items']
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
        console.log(res[index]);
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
  },
  components: {
    appList: List
  }
}
</script>

<style>
body {
  background-color: #228288;
  margin-top: 40px;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.paginate-list {
  width: 159px;
  margin: 0 auto;
  text-align: left;
}
.paginate-list li {
  display: block;
}
.paginate-list li:before {
  content: '⚬ ';
  font-weight: bold;
  color: slategray;
}

.paginate-links.items {
  user-select: none;
}
.paginate-links.items a {
  cursor: pointer;
}
.paginate-links.items li.active a {
  font-weight: bold;
}
.paginate-links.items li.next:before {
  content: ' | ';
  margin-right: 13px;
  color: #ddd;
}
.paginate-links.items li.disabled a {
  color: #ccc;
  cursor: no-drop;
}

a {
  color: #fcf8e3;
}

</style>
