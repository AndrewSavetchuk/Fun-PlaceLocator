const form = document.getElementById('js-form')! as HTMLFormElement;
const addressInput = document.getElementById('js-address')! as HTMLInputElement;

function searchAddressHandler(event: Event): void {
  event.preventDefault();

  const enteredAddress = addressInput.value;
}

form.addEventListener('submit', searchAddressHandler);
