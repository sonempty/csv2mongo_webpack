<template>
<div>
  <form @submit.prevent="login">
    Email:<br>
    <input type="email" v-model="user.email"/><br>
    Password:<br>
    <input type="password" v-model="user.password"/><br>
    <button type="submit">Submit</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    token: function () {
      return this.$store.state.token
    }
  },
  watch: {
    token: function (newToken, oldToken) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    login () {
      this.$store.dispatch('userLogIn', this.user)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
