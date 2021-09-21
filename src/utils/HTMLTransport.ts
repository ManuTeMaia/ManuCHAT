enum METHOD {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

type Options = {
	method: METHOD;
	data?: XMLHttpRequestBodyInit;
	headers?: { [key: string]: string };
};

class HTTPTransport {
	get = (
		url: string,
		options: Record<string, unknown> = {},
	): Promise<XMLHttpRequest> => {
		return this.request(url + this.queryStringify(options), {
			...options,
			method: METHOD.GET,
		});
	};
	put = (
		url: string,
		options: Record<string, unknown> = {},
	): Promise<XMLHttpRequest> => {
		return this.request(url, { ...options, method: METHOD.PUT });
	};
	post = (
		url: string,
		options: Record<string, unknown> = {},
	): Promise<XMLHttpRequest> => {
		return this.request(url, { ...options, method: METHOD.POST });
	};
	delete = (
		url: string,
		options: Record<string, unknown> = {},
	): Promise<XMLHttpRequest> => {
		return this.request(url, { ...options, method: METHOD.DELETE });
	};

	queryStringify(data: Record<string, unknown>): string {
		if (typeof data !== "object") {
			throw new Error("Not an object");
		}
		const keys = Object.keys(data);
		return keys.reduce((result, key, index) => {
			return `${result}${key}=${data[key]}${
				index < keys.length - 1 ? "&" : ""
			}`;
		}, "?");
	}

	request = (
		url: string,
		options: Options,
		timeout = 5000,
	): Promise<XMLHttpRequest> => {
		const { headers = {}, method, data } = options;

		return new Promise(function (resolve, reject) {
			if (!method) {
				reject("No method");
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHOD.GET;

			xhr.open(
				method,
				isGet && !!data ? `${url}${this.queryStringify(data)}` : url,
			);

			Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
}

export default HTTPTransport;
