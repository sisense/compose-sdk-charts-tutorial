# Compose SDK Charts Tutorial

Code samples used in the Compose SDK charts tutorial.

You can find the [full tutorial](https://sisense.dev/guides/sdk/tutorials/tutorial-charts/) in the Compose SDK docs.

This tutorial repo is structured with a number of branches, each branch contains the code as it should be at a number of natural stopping points in the tutorial. The main branch of the repository contains the code for the finished project.

## Prerequisites

Before getting started with the tutorial code, you’ll need:

- Node.js version 16 or higher
- npm

You’ll also need access to a Sisense instance with:

- The Sample Retail data source (you may need to go into the Sample Retail data model and unhide some of the columns that are hidden by default)
- An [API Token](https://sisense.dev/guides/sdk/authentication-security.html#api-token) you can use to query with
- [CORS settings](https://sisense.dev/guides/sdk/authentication-security.html#set-up-cors) that allow requests from `http://localhost:5173`, the URL that Vite serves your project on locally

## Run

To work with the code from the repository:

1. Fork the repo
1. Run `npm install` to install all dependencies
1. Rename the `env.local.example` file to `env.local`
1. In the `env.local` file, enter the URL and API Token you’ll use to connect to your Sisense instance
1. Run `npm start`
