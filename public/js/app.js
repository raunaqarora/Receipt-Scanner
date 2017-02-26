var app = new Vue({
  el: '#app',
  data: {
    showImage: false
  },
  methods: {
    postImage: function (image) {
      this.$http.post('/upload', image).then(response => {
        console.log('Success')
      }, response => {
        // error callback
      })
    }
  }

})

function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector('#image').src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
    app.showImage = true;
  }
}