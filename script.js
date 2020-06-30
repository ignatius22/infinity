const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader');



let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []
// unsplash Api
const count = 30;
const apiKey = 'nlHw0zRcjwe_S9Lk9dTOCmvM72w_3BvGxHFLwdVf1EU'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// check if image was loaded
function imageLoaded(){
	imagesLoaded++
	console.log(imagesLoaded)
	if(imagesLoaded === totalImages){
		ready = true
		loader.hidden = true
	}
}

// helper function to set Attributes on the Dom Element
function setAttributes(element,attributes){
	for (const key in attributes) {
		element.setAttribute(key,attributes[key])
	}
}


// create Element for links and photos, add to the dom
function displayPhoto(){
	imagesLoaded = 0
	totalImages = photosArray.length
	// run function for each object in the array
	photosArray.forEach((photo)=>{
		// create an <a> element
		const item = document.createElement('a')
		setAttributes(item,{
			href:photo.links.html,
			target: '_blank'
		})
		// create an image
		const img = document.createElement('img');
		setAttributes(img,{
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		})

		// Event Listener to check when each is finished loading
		img.addEventListener('load',imageLoaded)

		//put <img> inside <a> ,then put both imageContainer Element
		item.appendChild(img)
		imageContainer.appendChild(item)
	})

}

//get photos from unsplash Api
async function getPhotos(){
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhoto()	
	} catch (error) {
		console.log('oops!! cant fetch photos',error)
	}
}

// check to see if scrolling near bottom, load more photos
window.addEventListener('scroll', () => {
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
		ready = false
		getPhotos()
		
	}
})

// load photos 
getPhotos()