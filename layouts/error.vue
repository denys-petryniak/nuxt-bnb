<template>
  <div style="text-align: center">
    <img
      src="https://image.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg"
      alt=""
    />
    <h1>Error!</h1>
    {{ error.message }} {{ error.statusCode }}
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: 'BIG PROBLEMS',
    }
  },
}
</script>
