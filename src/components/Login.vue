<!-- src/components/Login.vue -->

<template>
  <div class="login-container">
    <Card style="width: 25rem; overflow: hidden">
      <!-- Header Slot (Optional) -->
      <template #header>
        <img alt="user header" src="/images/usercard.png" class="usercard-image"/>
      </template>

      <!-- Title and Subtitle Slots -->
      <template #title>
        Login to Your Account
      </template>
      <template #subtitle>
        Please enter your credentials to proceed.
      </template>

      <!-- Content Slot -->
      <template #content>
        <form @submit.prevent="login">
          <div class="p-field">
            <label for="email" class="form-label">Email</label>
            <InputText
              id="email"
              v-model="loginForm.email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="p-field">
            <label for="password" class="form-label">Password</label>
            <Password
              id="password"
              v-model="loginForm.password"
              placeholder="Enter your password"
              feedback="false"
              toggleMask
              required
            />
          </div>
          <Button label="Login" type="submit" class="p-mt-2" />
        </form>
        <p class="p-mt-3">
          New user?
          <router-link to="/register">Register here</router-link>
        </p>
        <Message
          v-if="error"
          :severity="errorSeverity"
          :text="error"
          class="p-mt-2"
        />
      </template>
    </Card>
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
      errorSeverity: 'error', // Can be 'success', 'info', 'warn', 'error'
    };
  },
  methods: {
    async login() {
      console.log('Login method called with:', this.loginForm);
      try {
        await this.$store.dispatch('login', this.loginForm);
        console.log('Login successful');
        this.$router.push('/dashboard');
      } catch (err) {
        console.error('Login error:', err);
        if (err.response?.data?.message) {
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.p-field {
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
}
.form-label {
  font-size: 0.875rem; /* Small font size */
  color: #6c757d;      /* Gray color */
  margin-bottom: 0.25em; /* Space between label and input */
}
.p-mt-2 {
  margin-top: 0.5em;
}
.p-mt-3 {
  margin-top: 0.75em;
}

.usercard-image {
  width: 50px; /* Fixed width */
  height: 50px; /* Fixed height */
  object-fit: cover; /* Ensures the image covers the area without distortion */
  border-radius: 50%; /* Makes the image circular */
  display: block;
  margin: 0 auto; /* Centers the image horizontally */
}
</style>
