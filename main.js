const getBreedsNames = async () => {

    const apiKey = '230bebd6-4583-47f9-ad67-28d803c49adc';

    try {
        const response = await fetch("https://api.thedogapi.com/v1/breeds", {headers: {
            'x-api-key': apiKey,
        }});
        
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            chooseBreed(data); 
        } else {
            throw new Error(`Http error: ${response.status}`);
        }
    } catch(error) {
        console.log(error);
        alert('Ups.. coś poszło nie tak. Spróbuj jeszcze raz :)');
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
    select.addEventListener('change', showDog);
}

const showDog = (e) => {
    console.log(e.target.value);
}

getBreedsNames();