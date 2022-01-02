//debounce function; he got it from the internet; it slows down the checkSlide function so it won't run a crazy amount of times; 
//instead, it only runs every 20miliseconds (wait = 20)
//any time you have something that should happen when you scroll, make sure to debounce it!
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

const sliderImages = document.querySelectorAll('.slide-in');

//function that runs every time someone scrolls and animates the picture in
function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
        //window.scrollY gives you the pixel point on the Y axis; we have to add window.innerHeight to get the real pixel point 
        // the second part searches for the point when we're half-way down the image
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 30;
        
        //next lines find the bottom of the image: offsetTop gives us position of image from the top; we add the image's height to get to the bottom
        const imageBottom = sliderImage.offsetTop + sliderImage.height;

        //the following variables will be used later to check how far down we've scrolled
        const isHalfShown = slideInAt > sliderImage.offsetTop; // point half-way down the image
        const isNotScrolledPast = window.scrollY < imageBottom; // image is still visible on the screen

        //if you've scrolled half-way down the image but haven't scrolled past it yet, the statement activates the active class;
        if(isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add("active");
        } else { // this bit removes the pics as soon as you scroll off them
            sliderImage.classList.remove("active");
        }
        
    });
}

//event listener for window 
window.addEventListener("scroll", debounce(checkSlide));


