function trim (str: string, excl?: string):string {
	const regexStart = new RegExp("^["+excl+"]+");
	const regexEnd = new RegExp("[ "+excl+"]+$");
	str = str
		.replace(regexStart,"")
		.replace(regexEnd,"")
		.replace(/^\s+/,"");

	return str;
}

export default trim;