const {
	withNativeFederation,
	shareAll,
} = require("@softarc/native-federation/build");

module.exports = withNativeFederation({
	name: "remote",
	exposes: {
		"./Test": "./src/Test",
	},
	shared: {},
});
