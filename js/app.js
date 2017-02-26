
var app = new Vue({
    el: '#app',
    data: {
        showImage: false
    },
    methods:{
    }

});

function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector('#image').src = e.target.result;
      data.imageURL = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
    app.showImage = true;
    postimage(e.target.result)
  }
}

function postimage(var image) {
    "use strict";
    this.$http.post('/upload', image).then(response => {
        console.log("Success")
    }, response => {
        // error callback
    });
}