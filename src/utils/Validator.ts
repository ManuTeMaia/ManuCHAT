type Patterns = {
	pattern: RegExp, 
	error: string
};

type ValidResult = {
	passed: boolean,
	error: string
};

type ValTipes = {
	[key: string]: Patterns
};

class Validator {
		validationTypes: ValTipes = {
			name: {
				pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
				error: "Латиница или кириллица, первая буква заглавная, без пробелов и без цифр, нет спецсимволов кроме '-'",
			},
			login: {
				pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
				error: "3-20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов кроме '-' и '_'",
			},
			email: {
				pattern: /.+@[^@]+[a-z]+\.[^@]{2,}$/,
				error: "Латиница, допустимы спецсимволы и '-', должен содержать '@', после должны быть буквы и '.'",
			},
			password: {
				pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
				error: "8-40 символов, хоть одна заглавная буква и цифра",
			},
			phone: {
				pattern: /^[+-d]?\d{10,15}$/,
				error: "10-15 символов, только цифры, может начинаться с '+'",
			},
			message: {
				pattern: /(.|\s)*\S(.|\s)*/,
				error: "Пустое сообщение",
			},
      };
    
  
	_getValidationType(element: HTMLElement): ValTipes {
		const type = element.getAttribute("valtype");

		if(type) {
		return this.validationTypes[type];
		}
    }
  
    _validate(element: HTMLInputElement): ValidResult {
		const validType = this._getValidationType(element);
		
		if (!validType) {
        throw new Error("No validation type");
		}

		return {
			passed: validType.pattern.test(element.value),
			error: validType.error
		};
    }
  
    validate(input: HTMLInputElement): void {
		const result = this._validate(input);
		const errorDiv = input.nextElementSibling;
		
		if (errorDiv) {
			if (result && result.passed) {
				errorDiv.classList.remove("invalid");
			} else if (result && result.error) {
				errorDiv.classList.add("invalid"); 
				errorDiv.textContent = result.error;
			}
		}
	}

	formValidate(): void {
		const toValidate = document.querySelectorAll("[valtype]");
		toValidate.forEach((element: HTMLInputElement) => {
			const result = this._validate(element);
			const errorDiv = element.nextElementSibling;
			
			if (errorDiv) {
				if (result && result.passed) {
					errorDiv.classList.remove("invalid");
				} else if (result && result.error) {
					errorDiv.classList.add("invalid"); 
					errorDiv.textContent = result.error;
				}
			}
		});
	}
}
  
export default Validator;