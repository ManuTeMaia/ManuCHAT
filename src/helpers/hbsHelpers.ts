import Handlebars from "handlebars";

Handlebars.registerHelper("times", function (n: number, block: { fn: (arg0: number) => string }) {
	let accum = "";
	for (let i = 0; i < n; ++i) {
		accum += block.fn(i);
	}
	return accum;
});

Handlebars.registerHelper("ismorezero", (value: number) => value > 0);

Handlebars.registerHelper("slice_message", (value: string) => {
	if (value.length >= 30) {
	return `${value.slice(0, 30)}...`;
	} else {
	return value;
	}
});

Handlebars.registerHelper("convert_message_date", (dateString: string) => {
	if(dateString) {
		const date = new Date(dateString);
		const today = new Date(Date.now()).toLocaleDateString();
		const visibleDate = today != date.toLocaleDateString("ru-RU") ? date.toLocaleDateString("ru-RU") : "";
		const visibleTime = date.toLocaleTimeString("ru-RU", {hour: "2-digit", minute: "2-digit"});
		return `${visibleDate} ${visibleTime}`;
	}
});

Handlebars.registerHelper("non_zero_length", (value: []) => value && value.length > 0);

Handlebars.registerHelper(
	"self_message",
	(userId: string | number, messageUserId: string | number) => userId === messageUserId
);

Handlebars.registerHelper("message_sended", (value: string) => value === "sended");

Handlebars.registerHelper("message_recieved", (value: string) => value === "recieved");

Handlebars.registerHelper("message_readed", (value: string) => value === "readed");