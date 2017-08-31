<template>
  <div>
    <div class="row">
      <div class="col-xs-3">
        <h2 class="text-center">Name</h2>
        <br>
        <paginate name="items" :list="contactsArr" :per="5" class="list-group">
          <li class="list-group-item list-group-item-action" style="cursor: pointer;" v-for="(item, index) in paginated('items')" @click="loadId(index)">{{ item.name }}</li>
        </paginate>
      </div>
      <div class="col-xs-3">
        <h2 class="text-center">Email</h2>
        <br>
        <paginate name="items" :list="contactsArr" :per="5" class="list-group">
          <li class="list-group-item list-group-item-action" v-for="item in paginated('items')" >{{ item.email }}</li>
        </paginate>
      </div>
      <div class="col-xs-3">
        <h2 class="text-center">Phone</h2>
        <br>
        <paginate name="items" :list="contactsArr" :per="5" class="list-group">
          <li class="list-group-item list-group-item-action" v-for="item in paginated('items')" >{{ item.phone }}</li>
        </paginate>
      </div>
      <div class="col-xs-3">
        <h2 class="text-center">Address</h2>
        <br>
        <paginate name="items" :list="contactsArr" :per="5" class="list-group">
          <li class="list-group-item list-group-item-action" v-for="item in paginated('items')" >{{ item.address }}</li>
        </paginate>
      </div>
    </div>
    <div class="row">
      <paginate-links class="ulli" for="items" :limit="2" :show-step-links="true" :hide-single-page="true"></paginate-links>
    </div>
  </div>
</template>

<script>
export default {
  props: ['contactsArr', 'loadId', 'paginate'],
  data() {
    return {

    };
  }
}
</script>
<style scoped>

</style>