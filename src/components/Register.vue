<template>
  <div class="register">
    <el-form @submit.prevent="register" :model="registerForm" ref="registerFormRef">
      <el-form-item prop="firstName">
        <el-input v-model="registerForm.firstName" placeholder="First Name"></el-input>
      </el-form-item>
      <el-form-item prop="lastName">
        <el-input v-model="registerForm.lastName" placeholder="Last Name"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="registerForm.email" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          placeholder="Password"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="register">Register</el-button>
      <p>
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>
      <el-alert v-if="error" type="error" :title="error"></el-alert>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('register', this.registerForm);
        this.$router.push('/login');
      } catch (err) {
        console.error('Registration error:', err);
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
.register {
  max-width: 400px;
  margin: auto;
  padding-top: 50px;
}
</style>
