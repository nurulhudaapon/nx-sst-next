# NX • SST • Next.js

This is a template for deploying a Next.js to AWS via SST within an NX workspace.

## Setup Route 53 Hosted Zone
Follow the instructions in the follwoing link to setup a hosted zone in Route 53
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring.html

## Setting Up Credentials

```sh
ENVIRONMENT_NAME=staging sst secret load .env.secret --stage=staging
ENVIRONMENT_NAME=production sst secret load .env.secret --stage=production
```

## Deployment
```sh
ENVIRONMENT_NAME=staging sst deploy --stage=staging
ENVIRONMENT_NAME=production sst deploy --stage=production
```

Or simply using NX
```sh
npx nx run admin:deploy:staging
npx nx run admin:deploy:production
```