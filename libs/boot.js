module.exports = app => {
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log("Sever running on port "+ port);
	});
};