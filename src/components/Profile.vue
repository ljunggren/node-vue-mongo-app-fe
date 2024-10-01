<template>
  <div>
    <h2>User Profile</h2>
    <form @submit.prevent="updateProfile">
      <input v-model="user.firstName" placeholder="First Name" />
      <input v-model="user.lastName" placeholder="Last Name" />
      <input v-model="user.email" placeholder="Email" disabled />
      <input v-model="password" type="password" placeholder="New Password" />
      <button type="submit">Update Profile</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return { user: {}, password: '', message: '' };
  },
  async created() {
    try {
      await this.$store.dispatch('fetchUser');
      this.user = { ...this.$store.getters.getUser };
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    async updateProfile() {
      try {
        const updateData = { ...this.user };
        if (this.password) updateData.password = this.password;
        const response = await this.$axios.put('/users/profile', updateData);
        this.message = 'Profile updated successfully';
        this.password = '';
        this.$store.commit('SET_USER', response.data);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
