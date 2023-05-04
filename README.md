# alice - ui

/ui is a collection of all alicenet user interfaces and is one of the primary repositories that will be worked on consistently

It is a fairly straight-forward monorepo, however additional details are noted below for ease of use and configuration.

## Repository Layout :broom:

### __General Files__
`/package.json` -- contains all shared dependencies  
`/<project>/package.json` -- contains all unique dependencies (if applicable)  
`/netlify.toml` -- contains all necessary CI/CD .env parameters*  
`/ui-boilerblate` -- A UI boilerplate that should be used for all React/MUI web applications

##### * __Additional notes on the `netlify.toml` configuration__
Currenty we are using a single netlify.toml, which means given sitegroup [x,y,z] any .env parameter for site x, will be available for sites y and z.  

In the current state this is not posing as an issue as most env keys are not uniquely needed they are currently: company specific/application ambiguous contract addresses and RPC endpoints, and staging vs production deploy state.

If this poses an issue in the future we should investigate breaking this up, but it may pose as a problem due to the base install directory, to unify dependencies, is the `/` directory, not the `/ui/<project>` directory, in the latter case sublevel configurations are available. [See this conversation for more details](https://answers.netlify.com/t/multiple-netlify-toml-files-in-monorepo/6178/9)

### __Tidiness Configuration__ (Primarily self-explanatory)
`/.lintstagedrc.json` -- Contains all pre-commit checks & configuration  
`/.commitlint.config.js` -- Commit lint configuration  
`/.prettierrc` -- Global project prettier config

## Submitting Code :incoming_envelope:	

The following segments contains guidelines and requirements for creating additional projects within this /ui monorepo as well as links to coding guidelines

### General Coding Guidelines/Expectations :warning:

Please follow the coding guidelines outlined [here](https://github.com/alicenet/ui/wiki/CodingGuidelines)

### Creating new applications :new:

New applications should clone the existing `/ui-boilerplate` folder unless an application requires something particularly custom in nature, to which it should be discussed with the team prior to creation.

### PRs :mag:	

- All PRs for should be first made against `staging` in lieu of ongoing fires :fire:

- Only `staging` may merge to `main`

#### __Standard review process__ :eyes:

After inittial repoitory function has been established it is assumed the following requirements should take place for all forthcoming code requests:

- All PRs to `staging` must be reviewed by at least: 
  - 1 [@lead](https://github.com/orgs/alicenet/teams/lead) or 2 [@core](https://github.com/orgs/alicenet/teams/core) engineers   
- All PRs to `main` must be reviewed by at least: 
  - 1 [@lead](https://github.com/orgs/alicenet/teams/lead) engineer

#### __Emergency PRs/Commits__ :fire_engine:

Mistakes happen and will generally be handled in tandem by 1 or more [@lead](https://github.com/orgs/alicenet/teams/lead) engineers and an accompanying [@core](https://github.com/orgs/alicenet/teams/core) engineer

## CI / CD Pipeline :arrows_clockwise:	

We utilize https://netlify.com for all continuous deployment as follows:

__All commits to main are considered production ready__ and automatically deployed

__All commits to staging are considered staging ready__ and automatically deployed

### Current Application Endpoints :scroll:

TBD on Netlify migration to monorepop\nbuildtest
