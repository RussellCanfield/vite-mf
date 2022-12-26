import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";
import { createEsBuildAdapter } from "@softarc/native-federation-esbuild";
import react from "@vitejs/plugin-react-swc";
import { importMaps } from "./module-federation/vite-importmap-shim";

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => ({
	server: {
		fs: {
			allow: [".", "../shared"],
		},
	},
	plugins: [
		importMaps(
			command === "serve"
				? {
						"__x00__react/jsx-dev-runtime":
							"https://esm.sh/react@18.2.0?pin=v74&path=/jsx-dev-runtime",
				  }
				: {
						"react/jsx-runtime":
							"https://esm.sh/react@18.2.0?pin=v74&path=/jsx-runtime",
				  }
		),
		await federation({
			options: {
				workspaceRoot: __dirname,
				outputPath: "dist",
				federationConfig: "module-federation/federation.config.cjs",
				verbose: true,
				dev: command === "serve",
			},
			adapter: createEsBuildAdapter({
				plugins: [],
			}),
		}),
		react(),
	],
}));
