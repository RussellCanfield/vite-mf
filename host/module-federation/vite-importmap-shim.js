export function importMaps(imports) {
	return {
		name: "vite-importmap-shim",
		transformIndexHtml: {
			enforce: "pre",
			transform(html) {
				return {
					html,
					tags: [
						{
							tag: "script",
							attrs: { type: "importmap-shim" },
							children: JSON.stringify({ imports }, null, 2),
							injectTo: "head",
						},
					],
				};
			},
		},
	};
}
