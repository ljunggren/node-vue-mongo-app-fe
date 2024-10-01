<template>
  <div class="login">
    <el-form @submit.prevent="login" :model="loginForm" ref="loginFormRef">
      <el-form-item prop="email">
        <el-input v-model="loginForm.email" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="Password"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="login">Login</el-button>
      <p>
        New user?
        <router-link to="/register">Register here</router-link>
      </p>
      <el-alert v-if="error" type="error" :title="error"></el-alert>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', this.loginForm);
        this.$router.push('/dashboard');
      } catch (err) {
        console.error('Login error:', err);
        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message;
        } else {
          this.error = err.message || 'An error occurred';
        }
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding-top: 50px;
}
</style>
