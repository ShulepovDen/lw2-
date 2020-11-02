// переменная для хранения состояния авторизованного пользователя
// при успешной авторизации должен содержать объект с пользовательскими данными
// при signOut должен становиться null
var authUserData = null;

var userDatabase = []; // массив с зарегистрированными пользователями

function register(email, password) {
  var user = {};
  if (
    email.indexOf(" ") > -1 ||
    email.indexOf("@") < 1 ||
    email.length === 0 ||
    email.match(/\./g).length !== 1 ||
    email.match(/\@/g).length !== 1 ||
    email.slice(email.indexOf("@") + 1, email.indexOf(".")).length === 0 ||
    email.substr(email.indexOf(".")).length === 1
  ) {
    return false;
  }

  if (password.match(/^[A-ZА-Я](?=.*[0-9])/) === null || password.length < 6) {
    return false;
  }
  user.mail = email;
  user.pass = password;

  for (i = 0; i < userDatabase.length; i++) {
    if (userDatabase[i].mail === email) return false;
  }
  userDatabase.push(user);
  // ваш код
  // проверка на валидность email, пароля (6 символов, начинается с большой буквы, должен содержать как минимум 1 цифру)
  // проверка нового пользователя в userDatabase
  return true;
}

function signIn(email, password) {
  var user = {};
  if (
    email.indexOf(" ") > -1 ||
    email.indexOf("@") < 1 ||
    email.length === 0 ||
    email.match(/\./g).length !== 1 ||
    email.match(/\@/g).length !== 1 ||
    email.slice(email.indexOf("@") + 1, email.indexOf(".")).length === 0 ||
    email.substr(email.indexOf(".")).length === 1
  ) {
    return false;
  }

  if (password.match(/^[A-ZА-Я](?=.*[0-9])/) === null || password.length < 6) {
    return false;
  }
  user.mail = email;
  user.pass = password;
  for (i = 0; i < userDatabase.length; i++) {
    if (
      userDatabase[i].mail === user.mail &&
      userDatabase[i].pass === user.pass
    ) {
      authUserData = user;
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
  var user = {};
  user.mail = email;
  user.pass = oldPassword;
  for (i = 0; i < userDatabase.length; i++) {
    if (
      userDatabase[i].mail === user.mail &&
      userDatabase[i].pass === user.pass
    ) {
      if (
        newPassword.match(/^[A-ZА-Я](?=.*[0-9])/) !== null &&
        newPassword.length >= 6
      ) {
        user.pass = newPassword;
        console.log("as");
        userDatabase[i].pass = user.pass;
      }
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
      if (
        this.value.indexOf(" ") > -1 ||
        this.value.indexOf("@") < 1 ||
        this.value.length === 0 ||
        this.value.match(/\./g).length !== 1 ||
        this.value.match(/\@/g).length !== 1 ||
        this.value.slice(this.value.indexOf("@") + 1, this.value.indexOf("."))
          .length === 0 ||
        this.value.substr(this.value.indexOf(".")).length === 1
      ) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
      return this;
      g;
    },
    isFloat: function () {
      if (!isNaN(parseFloat(this.value))) {
        let stringNumber = this.value.toString();
        let isFloat = stringNumber.indexOf(".");
        if (isFloat !== -1) {
          this.isValid = true;
        } else {
          this.isValid = false;
        }
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
  };
}
