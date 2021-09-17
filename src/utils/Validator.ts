type ValidationElem = {
  error: string,
  pattern: RegExp,
}

type ValidationTypes = {
  name: ValidationElem,
  login: ValidationElem,
  email: ValidationElem,
  password: ValidationElem,
  phone: ValidationElem,
  message: ValidationElem,
}

type ValidationResult = {
  isValid: boolean,
  error: string,
}
  
  class Validator {
  
    validationTypes: ValidationTypes;
  
    constructor() {
      this.validationTypes = {
        name: {
          pattern: /^[A-Z][a-zA-Z-]|^[А-Я][а-яА-Я-]*$/,
          error: "Name must contain latin or cyrillic symbols, first capital letter, no spaces and numbers, no special symbols except '-'",
        },
        login: {
          pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
          error: "Login must be 3-20 symbols long, latin, may use digits, should have letters, no spaces, no special symbols except '-, _'",
        },
        email: {
          pattern: /.+@[^@]+[a-z]+\.[^@]{2,}$/,
          error: "Email must contain latin, special symbols and '-' are allowed, must have '@' with letters and '.' after that",
        },
        password: {
          pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
          error: "Password must be 8-40 symbols long, must have capital letter and digit",
        },
        phone: {
          pattern: /^[+-d]?\d{10,15}$/,
          error: "Phone error (10-15 symbols long, only digits, starts with '+'",
        },
        message: {
          pattern: /(.|\s)*\S(.|\s)*/,
          error: "Message is empty",
        },
      };
    }
  
    _getValidationType(element: HTMLElement): ValidationElem {
      const type = element.getAttribute("validation-type");
      if (type) {
        return this.validationTypes.type;
      }
      
    }
  
    _validate(elem: HTMLInputElement): ValidationResult | undefined {
      const vtype = this._getValidationType(elem);
      if (!vtype) {
        throw new Error("Can't find appropriate validation type");
      }
      if (!elem.value && elem.getAttribute("validation-type") !== "message") {
        return { isValid: true, error: "" };
      }
      return {
        isValid: vtype.pattern.test(elem.value),
        error: vtype.error,
      };
    }
  
    validate(): void {
      const toValidate = document.body.querySelectorAll("[validation-required]");
      toValidate.forEach((elem: HTMLInputElement) => {
        const result = this._validate(elem);
        const attr = elem.getAttribute("validation-label");
        if (attr) {
          const labelFor = document.getElementById(attr) as HTMLElement;
          if (result && result.isValid) {
            labelFor.classList.remove("active"); 
          } else {
            labelFor.classList.add("active");
            if (result && result.error) {
              labelFor.textContent = result.error;
            }
          }
        }
      });
    }
  
  }
  
  export default Validator;