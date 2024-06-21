/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "nx-sst-next",
			removal: input?.stage === "production" ? "retain" : "remove",
			home: "aws",
			providers: { aws: true },
			
		};
	},
	async run() {
		// Shared env vars
		const sharedEnv = {
			AUTH_JWT_SECRET: new sst.Secret("AuthJwtSecret", process.env.AUTH_JWT_SECRET!).value,
		};
		const webAdmin = new sst.aws.Nextjs("WebAdmin", {
			path: "apps/admin",
			domain: {
				name: `${$app.stage}-${$app.name}.${process.env.DOMAIN_NAME}`,
			},
			environment: {
				...sharedEnv,
			},
		});
	},
});
