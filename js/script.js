startImageTransition();
	
	function startImageTransition() {
	
		// images stores list of all images of
		// class test. This is the list of images
		// that we are going to iterate
		var images = document.getElementsByClassName("animateImages");
	
		// Set opacity of all images to 1
		for (var i = 0; i < images.length; ++i) {
			images[i].style.opacity = 1;
		}
	
		// Top stores the z-index of top most image
		var top = 1;
	
		// cur stores the index of the image currently
		// on top images list contain images in the
		// same order they appear in HTML code
		/* The tag with class test which appears last
		will appear on top of all the images thus,
		cur is set to last index of images list*/
		var cur = images.length - 1;
	
		// Call changeImage function every 3 second
		// changeImage function changes the image
		setInterval(changeImage, 6000);
	
		// Function to transitions from one image to other
		async function changeImage() {
	
			// Stores index of next image
			 nextImage = (1 + cur) % images.length;
	
			// First set the z-index of current image to top+1
			// then set the z-index of nextImage to top
			/* Doing this make sure that the image below
			the current image is nextImage*/
			// if this is not done then during transition
			// we might see some other image appearing
			// when we change opacity of the current image
			images[cur].style.zIndex = top + 1;
			images[nextImage].style.zIndex = top;
	
			// await is used to make sure
			// the program waits till transition()
			// is completed
			// before executing the next line of code
			await transition();
	
			// Now, the transition function is completed
			// thus, we can say that the opacity of the
			// current image is now 0
	
			// Set the z-index of current image to top
			images[cur].style.zIndex = top;
	
			// Set the z-index of nextImage to top+1
			images[nextImage].style.zIndex = top + 1;
	
			// Increment top
			top = top + 1;
	
			images[cur].style.opacity = 1;
	
			cur = nextImage;
		}
	
		function transition() {
			return new Promise(function (resolve, reject) {
	
				var del = 0.01;
				var id = setInterval(changeOpacity, 10);

				function changeOpacity() {
					images[cur].style.opacity -= del;
					if (images[cur].style.opacity <= 0) {
						clearInterval(id);
						resolve();
					}
				}
			})
		}
	}
