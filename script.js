let nameInput = document.querySelector('.nameInput');
let surnInput = document.querySelector('.surnInput');
let emailInput = document.querySelector('.emailInput');
let passInput = document.querySelector('.passInput');
let passRepInput = document.querySelector('.passRepInput');
let dateInput = document.querySelector('.dateInput');
let btn = document.querySelector('.btn');
let mainFlags = {
  'name': false,
  'surn': false,
  'email': false,
  'pass': false,
  'passRep': false,
  'date': false,
}

function chengeProperObj(key,value, callback) {
  mainFlags[key] = value;
  return callback()
}

function deleteError(elem, id) {
  elem.addEventListener('focus', function() {
    let error = document.querySelectorAll( id + '> .error')
    for (elem of error) {
      elem.remove();
    }
  })
}

deleteError(nameInput, '.nameLabel');
deleteError(surnInput, '.surnLabel');
deleteError(emailInput, '.emailLabel');
deleteError(passInput, '.passLabel');
deleteError(passRepInput, '.passRepLabel');
deleteError(dateInput, '.dateLabel')

function errorElement (text, elem) {
  let p = document.createElement('p');
  p.className = 'error';
  p.textContent = text;
  elem.parentNode.appendChild(p);
  elem.classList.add("inputError")
  
}

nameInput.addEventListener('blur', function () {
  let nameRegex = /^[а-яА-Я\-]+$/;
  let OK = nameRegex.exec(nameInput.value);

	if (!(nameInput.value.length >= 3 && nameInput.value.length <= 12)) {
    errorElement('Введите имя длиной от 3-х символов, до 12 символов', nameInput);
  } else if (!OK) {
    errorElement('Имя должно быть на русском.', nameInput);
    chengeProperObj('name', false, checkObj);
  } else {
    this.classList.remove("inputError");
    chengeProperObj('name', true, checkObj)
  }
});

surnInput.addEventListener('blur', function() {
  let surnRegex = /^[а-яА-Я\-]+$/;
  let surnOK = surnRegex.exec(surnInput.value);

  if (!(surnInput.value.length >= 3 && surnInput.value.length <= 12)) {
    errorElement('Введите фамилию длиной от 3-х символов, до 12 символов', surnInput);
    chengeProperObj('surn', false, checkObj)
  } else if (!surnOK){
    errorElement('Фамилия должна быть на русском.', surnInput);
    chengeProperObj('surn', false, checkObj)
  } else {
    this.classList.remove("inputError");
    chengeProperObj('surn', true, checkObj)
  }
})

emailInput.addEventListener('blur', function() {
  let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let emailOK = emailRegex.exec(emailInput.value);

  if(!emailOK) {
    errorElement('Введите корректный email', emailInput)
    chengeProperObj('email', false, checkObj)
  } else {
    this.classList.remove("inputError");
    chengeProperObj('email', true, checkObj)
  }
})

passInput.addEventListener('blur', function() {
  let password = passInput.value;
  if (password.length < 8 ) {
    errorElement('Праоль должен быть длиннее 8 символов.', passInput)
    chengeProperObj('pass', false, checkObj)
  } else if (!password.match(/[a-z]/g)) {
    errorElement('Пароль должен содержать хотя бы одну строчную букву', passInput)
    chengeProperObj('pass', false, checkObj)
  } else if (!password.match(/[A-Z]/g)) {
    errorElement('Пароль должен содержать хотя бы одну заглавную букву', passInput)
    chengeProperObj('pass', false, checkObj)
  } else if (!password.match(/[0-9]/g)) {
    errorElement('Пароль должен содержать хотя бы одну цифру', passInput)
    chengeProperObj('pass', false, checkObj)
  } else if (!password.match(/[!@#$%^&*_.,-]/g)) {
    errorElement('Пароль должен содержать хотя бы один спец символ (!@#$%,._)', passInput)
    chengeProperObj('pass', false, checkObj)
  } else {
    this.classList.remove("inputError");
    chengeProperObj('pass', true, checkObj)
  }
  
})

passRepInput.addEventListener('blur', function() {
  if (passRepInput.value !== passInput.value) {
    errorElement('Пароли должны совпадать', passRepInput);
    chengeProperObj('passRep', false, checkObj)
  } else {
    this.classList.remove("inputError");
    chengeProperObj('passRep', true, checkObj)
  }
})

function diffDate (birth) {
  let now = new Date();
  let addOne = now.getMonth() - birth.getMonth() >= 0 && now.getDate() - birth.getDate() >= 0;
  let diff = now.getFullYear() - birth.getFullYear();
  return diff - 1 + (addOne ? 1 : 0);
}

dateInput.addEventListener('blur', function() {
  let dateBir = dateInput.value.split('-')
  let newDateBir = new Date(Number(dateBir[0]), Number(dateBir[1]) - 1, Number(dateBir[2]));
  let diff = diffDate(newDateBir)

  if(diff < 18) {
    errorElement('Вам должно быть больше 18 лет, чтобы зарегестрироваться на сайте.', dateInput);
    chengeProperObj('date', false, checkObj)
  } else {
    this.classList.remove("inputError");
    chengeProperObj('date', true, checkObj)
  }
})

function checkObj() {
  if (mainFlags['name'] == true && mainFlags['surn'] == true && mainFlags['email'] == true && mainFlags['pass'] == true &&mainFlags['passRep'] == true &&mainFlags['date'] == true) {
    btn.disabled = false
  } else {
    btn.disabled = true
  }
}

console.log(mainFlags)