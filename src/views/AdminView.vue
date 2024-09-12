<template>
  <div class="container admin">
    <AdminItems />
    <AdminUsers />
    <AdminOrders />
  </div>
</template>

<script>
import AdminItems from '@/components/AdminItems.vue';
import AdminUsers from '@/components/AdminUsers.vue';
import AdminOrders from '@/components/AdminOrders.vue';

export default {
  components: {
    AdminItems,
    AdminUsers,
    AdminOrders,
  },
};
</script>

<style scoped>
.admin {
  line-height: 1.5;
  font-size: 17px;
  letter-spacing: 0.05em;
  margin-top: 120px;
}
</style>
