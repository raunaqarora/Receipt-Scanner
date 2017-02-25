
var app = new Vue({
    el: '#app',
    data: {
        show : false
    },
    methods:{
        getimage:function(){
            "use strict";
            function hasGetUserMedia() {
                return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia);
            }
            if (hasGetUserMedia()) {

                var video = document.querySelector('video');
                var canvas = document.querySelector('canvas');
                var ctx = canvas.getContext('2d');
                var localMediaStream = null;

                var hdConstraints = {
                    video: {
                        mandatory: {
                            minWidth: 1280,
                            minHeight: 720
                        }
                    }
                };

                video.addEventListener('click', snapshot, false);

                var errorCallback = function(e) {
                    console.log('Rejected!', e);
                };

                navigator.getUserMedia  = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia(hdConstraints, function(stream) {
                        video.src = window.URL.createObjectURL(stream);
                        localMediaStream = stream;
                    }, errorCallback);
                } else {
                    alert("Not found");
                    video.src = 'somevideo.webm'; // fallback.
                }
            }
            else {
                alert('getUserMedia() is not supported in your browser');
            }
        }
    }

})

function snapshot() {
    if (localMediaStream) {
        ctx.drawImage(video, 0, 0);
        // "image/webp" works in Chrome.
        // Other browsers will fall back to image/png.
        document.querySelector('img').src = canvas.toDataURL('image/webp');
    }
}