import Handlebars from "handlebars";

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

Handlebars.registerHelper(
	"self_message",
	(userId: string | number, messageUserId: string | number) => userId === messageUserId
);