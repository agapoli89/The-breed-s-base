const baseApiUrl = "https://api.thedogapi.com/v1/";
const apiKey = {headers: {
    'x-api-key': '230bebd6-4583-47f9-ad67-28d803c49adc',
}};
let picture = document.querySelector('.section__image');

const getBreedsNames = async () => {

    try {
        const response = await fetch(baseApiUrl + "breeds", apiKey);
        
        if (response.ok) {
            const data = await response.json();
            chooseBreed(data); 
        } else {
            throw new Error(`Http error: ${response.status}`);
        }
    } catch(error) {
        console.log(error);
        alert(`Ups.. it's something wrong. Try again :)`);
    }  
}

const chooseBreed = (breeds) => {
    const select = document.querySelector('.select');
    const breedsOptions = breeds.map(breed => {
        const option = document.createElement('option');
        option.textContent = breed.name;
        option.value = breed.id;
        return option;
    })

    breedsOptions.forEach(breedsOption => {
        select.appendChild(breedsOption);
    });
    select.addEventListener('change', getDog);
}

const getDog = async (e) => {
    const breedID = e.target.value;

    try {
        const response = await fetch(baseApiUrl + "images/search?breed_id=" + breedID, apiKey);
        
        if (response.ok) {
            const data = await response.json();
            showDog(data);
        } else {
            throw new Error(`Http error: ${response.status}`);
        }
    } catch(error) {
        console.log(error);
        alert(`Ups.. it's something wrong. Try again :)`);
    }  
}

const showDog = (pictureInfo) => {
    picture.innerHTML = "";
    const dogImage = document.createElement('img');
    dogImage.src = pictureInfo[0].url;
    dogImage.classList.add('image');
    const p = document.createElement('p');
    p.textContent = pictureInfo[0].breeds[0].name;
    picture.appendChild(dogImage);
    picture.appendChild(p);
}

getBreedsNames();