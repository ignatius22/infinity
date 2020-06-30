// unsplash Api
const count = 10;
const apiKey = 'nlHw0zRcjwe_S9Lk9dTOCmvM72w_3BvGxHFLwdVf1EU'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}_KEY&count=${count}`

//get photos from unsplash Api

async function getPhotos(){
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		console.log(data)
		
	} catch (error) {
		console.log('oops!! cant fetch photos',error)
	}

}

// load photos 
getPhotos()