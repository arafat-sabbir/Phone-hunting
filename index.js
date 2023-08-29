const loaddata = async (searchtext) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchtext}`
  );
  const data = await res.json();
  const phones = data.data;
  showphones(phones);
};
const showphones = (phones) => {
  const phonecontainer = document.getElementById("phones-container");
  phonecontainer.innerHTML = "";
  const showallfield = document.getElementById("showallfield");
  if (phones.length > 12) {
    showallfield.classList.remove("hidden");
  } else {
    showallfield.classList.add("hidden");
  }
  phones = phones.slice(0, 12);
  phones.forEach((phone) => {
    console.log(phone);
    const phonecard = document.createElement("div");
    phonecard.classList = "card bg-base-100 shadow-xl";
    phonecard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p class = 'text-2xl font-semibold'>${phone.brand}</p>
        <div class="card-actions">
          <button onclick = "showdetail('${phone.slug}')" class="btn btn-primary my-2">Show Details</button>
        </div>
        </div> 
    `;
    phonecontainer.appendChild(phonecard);
  });
  loadingspinner(false);
};

const searchdata = () => {
  loadingspinner(true);
  const inputfield = document.getElementById("input-field");
  const searchtext = inputfield.value;
  loaddata(searchtext);
};
const loadingspinner = (istrue) => {
  const spinnerfield = document.getElementById("spinner");
  if (istrue) {
    spinnerfield.classList.remove("hidden");
  } else {
    spinnerfield.classList.add("hidden");
  }
};

const showdetail = async(id)=>{
  console.log('model clicked',id)
  const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  console.log(data);
}
