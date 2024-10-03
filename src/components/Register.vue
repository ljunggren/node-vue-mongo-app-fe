<!-- src/components/Register.vue -->

<template>
  <div class="register-container">
    <Card style="width: 25rem; overflow: hidden">
      <!-- Header Slot (Optional) -->
      <template #header>
        <img alt="user header" src="/images/usercard.png" class="usercard-image" />
      </template>

      <!-- Title and Subtitle Slots -->
      <template #title>
        Create a New Account
      </template>
      <template #subtitle>
        Fill in the details below to register.
      </template>

      <!-- Content Slot -->
      <template #content>
        <form @submit.prevent="register">
          <div class="p-field">
            <label for="firstName" class="form-label">First Name</label>
            <InputText
              id="firstName"
              v-model="registerForm.firstName"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div class="p-field">
            <label for="lastName" class="form-label">Last Name</label>
            <InputText
              id="lastName"
              v-model="registerForm.lastName"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div class="p-field">
            <label for="email" class="form-label">Email</label>
            <InputText
              id="email"
              v-model="registerForm.email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="p-field">
            <label for="password" class="form-label">Password</label>
            <Password
              id="password"
              v-model="registerForm.password"
              placeholder="Enter your password"
              feedback="false"
              toggleMask
              required
            />
          </div>
          <Button label="Register" type="submit" class="p-mt-2" />
        </form>
        <p class="p-mt-3">
          Already have an account?
          <router-link to="/login">Login here</router-link>
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
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      error: '',
      errorSeverity: 'error',
    };
  },
  methods: {
    async register() {
      console.log('Register method called with:', this.registerForm);
      try {
        await this.$store.dispatch('register', this.registerForm);
        console.log('Registration successful');
        this.$router.push('/login');
      } catch (err) {
        console.error('Registration error:', err);
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
.register-container {
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
