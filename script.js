const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader');


let photosArray = []
// unsplash Api
const count = 10;
const apiKey = 'nlHw0zRcjwe_S9Lk9dTOCmvM72w_3BvGxHFLwdVf1EU'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// helper function to set Attributes on the Dom Element
function setAttributes(element,attributes){
	for (const key in attributes) {
		element.setAttribute(key,attributes[key])
	}
}


// create Element for links and photos, add to the dom
function displayPhoto(){
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
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
		getPhotos()
		console.log('load more')
	}
})

// load photos 
getPhotos()