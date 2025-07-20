# Currency Conversion Tool
This is a mini app that converts between two different currencies.

Please check the description PDF in this repo to see my thought process when making this app.

This project was generated using Angular Version 20.1.1.

## Setup

Please install the dependancies using 

```bash
npm i
```

For the development of this project, I used node version 24.3.0 and npm version 11.4.2

## Local Development

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to 
http://localhost:4200/


## Testing

To run the unit tests, run

```bash
npm run test
```

## Project structure

I have used a simple directory structure for the project, which follows this format:

| Folder            |  Description         |
|-------------------|----------------------|
| components/       |  Reusable components |
| pages/            |  Route componets     |
| services/         |  Non component logic |

### Components

This is where my reusable components are stored, which can be used anywhere in the app, for example buttons, inputs, cards etc.

### Pages

I decided to use a router for the project, even though there is only one view that is getting used. If this was to expand, this would hold the route components, and any contextual logic specific to those views. 

### Services

I created a services directory - as a way of containing non-component logic. For example, api calls or global varaibles through subscriptions, that can then get called from different components throughout the app.