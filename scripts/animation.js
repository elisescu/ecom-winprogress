var currentAnimationLocation = "run";
var currentPicture = 0;
var imageFrames = [];
var NR_FRAMES = 100;
var NR_FRAMES_RUN = 25;

function Character (name, img_element) {
    this.name = name;
    this.loadedImages = [];
    this.element = img_element;
    this.current_frame = 0;
    this.max_frames = 0;
    this.animation = "run";
    // preload images
    this.init = function() {
        console.log("loading images for " + name);
        for (var i = 0; i < NR_FRAMES; i++) {
            this.loadedImages[i] = new Image();
            this.loadedImages[i].src = "res/"+name+"/out_" + (i) + ".jpeg";
        }

        this.current_frame = Math.floor(Math.random() * NR_FRAMES_RUN);
        this.max_frames = NR_FRAMES_RUN;
        console.log("initialized " + name + " with starting frame at "+ this.current_frame);
    }
    var obj = this;
    this.element.onclick = function() {
        obj.max_frames = NR_FRAMES;
        console.log(" Jumping for " + name + ". Make max frames " + this.max_frames);
        obj.animation = "jump";
        obj.current_frame = NR_FRAMES_RUN;
    };

    // animte the img element
    this.animate = function() {
        this.current_frame = (this.current_frame + 1) % this.max_frames;
        if (this.current_frame == NR_FRAMES - 1) {
            this.max_frames = NR_FRAMES_RUN;
        }
        //console.log(" frame " + curr_frame + " for " + name);
        console.log("max for " + this.name + " is: " + this.animation + ", curr_frame " + this.current_frame);
        this.element.src = this.loadedImages[this.current_frame].src;
    }
}


onload = function startAnimation() {
    var characters = [
            new Character("e", document.getElementById("e_frame")),
            new Character("l",  document.getElementById("l_frame")),
            new Character("i",  document.getElementById("i_frame")),
            new Character("s",  document.getElementById("s_frame")),
            new Character("peng",  document.getElementById("peng_frame")),
            new Character("esc",  document.getElementById("esc_frame")),
            new Character("u",  document.getElementById("u_frame"))
        ];

    for (i = 0; i < characters.length; i++) {
        characters[i].init();
    }

    setInterval(function () {
        currentPicture += 1;

        for (i = 0; i < characters.length; i++) {
            characters[i].animate();
        }

    }, 30);
