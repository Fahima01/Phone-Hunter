const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => console.log(data))

    // Alternative way

    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => { // these phone name coems from url last part
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    // display only 10 product
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none')
    }


    // display no phone set up
    const noPhn = document.getElementById('no-phn-msg');
    if (phones.length === 0) {
        noPhn.classList.remove('d-none');
    }
    else {
        noPhn.classList.add('d-none');
    }

    phones.forEach(phone => {
        const phnDiv = document.createElement('div');
        phnDiv.classList.add('col');
        phnDiv.innerHTML = `
    <div class="card p-4">
        <img src="${phone.image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
            <h5 class="card-title fw-bold">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhnDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
           
        </div>
    </div>
    
    `;
        phoneContainer.appendChild(phnDiv)

    });

    //stop loader
    toggleSpiner(false);
}

const processSearch = (dataLimit) => {
    toggleSpiner(true);
    const searchFeild = document.getElementById('search-field');
    const searchText = searchFeild.value;
    loadPhone(searchText, dataLimit);
}


// handle button click
document.getElementById('button-search').addEventListener('click', function () {
    // start loader
    processSearch(10);
})

// to set enter keypress in input
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        processSearch(10);
    }
});

const toggleSpiner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }

}

// not the best way to load show all products

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch(); // to show all the product
})

const loadPhnDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone => {
    console.log(phone)
    const phnTitle = document.getElementById('phoneDetailModalLabel')
    phnTitle.innerText = phone.name;
    const phnDetails = document.getElementById('modal-details')
    phnDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date found'}
    <p>Phone Dimention: ${phone.mainFeatures.displaySize} 
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>Others (Bluetooth): ${phone.others ? phone.others.Bluetooth : 'No bluetooth info found'}
    <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no data found'}</p>
    `
}

loadPhone('apple');