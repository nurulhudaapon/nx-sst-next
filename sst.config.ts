/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'nx-sst-next',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
		};
	},
	async run() {
		const stageName = $app.stage as keyof typeof STAGE_TO_DOMAIN_PREFIX;

		// Env vars
		const AuthJwtSecret = new sst.Secret('AuthJwtSecret', process.env.AUTH_JWT_SECRET!);

		// Shared env vars
		const SAFE_KEYS = ['NEXT_PUBLIC_', 'AUTH_'];
		const sharedEnv = {
			...Object.fromEntries(
				Object.entries(process.env).filter(([key]) => SAFE_KEYS.some((safeKey) => key.startsWith(safeKey)))
			),
			AUTH_JWT_SECRET: AuthJwtSecret.value,
		};

		const webAdminDomain = formDomain('WebAdmin', stageName);
		const webAdmin = new sst.aws.Nextjs('WebAdmin', {
			path: 'apps/admin',
			domain: webAdminDomain,
			environment: {
				...sharedEnv,
				NEXTAUTH_URL: `https://${webAdminDomain}`,
			},
		});
	},
});

const ROOT_DOMAIN = process.env.ROOT_APP_DOMAIN;

const APP_TO_DOMAIN_PREFIX = {
	WebClient: 'client.',
	WebAdmin: 'admin.',
};

const STAGE_TO_DOMAIN_PREFIX = {
	production: '',
	staging: 'stg.',
	development: 'dev.',
};

const formDomain = (app: keyof typeof APP_TO_DOMAIN_PREFIX, stage: keyof typeof STAGE_TO_DOMAIN_PREFIX) => {
	const appSubdomain = APP_TO_DOMAIN_PREFIX[app];
	const envSubdomain = STAGE_TO_DOMAIN_PREFIX[stage] ?? `${stage}.${STAGE_TO_DOMAIN_PREFIX['development']}`;

	const finalDomain = `${appSubdomain}${envSubdomain}${ROOT_DOMAIN}`;

	return finalDomain;
};
