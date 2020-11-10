// переменная для хранения состояния авторизованного пользователя
// при успешной авторизации должен содержать объект с пользовательскими данными
// при signOut должен становиться null
var authUserData = null;

var userDatabase = []; // массив с зарегистрированными пользователями

function register(email, password) {
  var user = {};
  if (!isValidEmailAndPassword(email, password)) {
    return false;
  }

  for (i = 0; i < userDatabase.length; i++) {
    if (userDatabase[i].mail === email) return false;
  }
  userDatabase.push({ mail: email, pass: password });
  // ваш код
  // проверка на валидность email, пароля (6 символов, начинается с большой буквы, должен содержать как минимум 1 цифру)
  // проверка нового пользователя в userDatabase
  return true;
}

function signIn(email, password) {
  if (!isValidEmailAndPassword(email, password)) {
    return false;
  }
  for (i = 0; i < userDatabase.length; i++) {
    if (userDatabase[i].mail === email && userDatabase[i].pass === password) {
      authUserData = { mail: email, pass: password };
    }
  }
  // ваш код
  // проверка на валидность email, пароля (6 символов, начинается с большой буквы)
  // проверка наличия пользователя в userDatabase
  // заполнение authUserData
}

function signOut() {
  authUserData = null;
  // ваш код
}

function resetPassword(email, oldPassword, newPassword) {
  for (i = 0; i < userDatabase.length; i++) {
    if (
      userDatabase[i].mail === email &&
      userDatabase[i].pass === oldPassword &&
      validator(newPassword).isValidPassword().validate()
    ) {
      oldPassword = newPassword;
      userDatabase[i].pass = oldPassword;
    }
  }
  // функция восстановления пароля
  // должна изменять пароль пользователя если старый пароль введен верно и новый пароль соответствует правилам формата пароля
}

function isAuth() {
  if (authUserData === null) {
    return false;
  }
  return true;
  // функция возвращает true если пользователь авторизован, false если нет
}
function isValidEmailAndPassword(email, password) {
  if (!validator(email).isEmail().validate()) {
    return false;
  }

  if (!validator(password).isValidPassword().validate()) {
    return false;
  }
  return true;
}

function validator(_value) {
  return {
    value: _value,
    isValid: null,
    validate: function () {
      return this.isValid;
    },
    min: function (value) {
      this.isValid = this.value > value;
      return this;
    },
    max: function (value) {
      this.isValid = this.value <= value;
      return this;
    },
    minLength: function (value) {
      this.isValid = this.value.length > value;
      return this;
    },
    maxLength: function (value) {
      this.isValid = this.value.length < value;
      return this;
    },
    equal: function (value) {
      this.isValid = this.value.toString() === value.toString();
      return this;
    },
    isString: function () {
      this.isValid = typeof this.value === "string";
      return this;
    },
    isArray: function () {
      this.isValid = Array.isArray(this.value);
      return this;
    },
    isNumber: function () {
      this.isValid = typeof this.value === "number";
      return this;
    },
    isEmail: function () {
      if (this.value.match(/^[\w-.]+@[\w-]+.[a-z]{2,4}$/)) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      return this;
      g;
    },
    isFloat: function () {
      if (
        !isNaN(parseFloat(this.value)) &&
        this.value.toString().indexOf(".") !== -1
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      return this;
    },
    isDate: function () {
      let result = this.value.match(/\d{2}\.\d{2}\.\d{4}/);
      if (result != null) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      return this;
    },
    isValidPassword: function () {
      if (
        this.value.match(/^[A-ZА-Я](?=.*[0-9])/) !== null &&
        this.value.length >= 6
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
      return this;
    },
  };
}
