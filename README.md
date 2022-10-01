# getting started

followed guide: https://www.brockherion.dev/blog/posts/setting-up-a-monorepo-with-pnpm-and-typescript/ ,except for vite, this uses webpack but it overrides webpack for Typescript to work with craco

initiate git

`git init`

rename master branch to main

`git branch -m main`

install pnpm (a package manager like npm and yarn). Pnpm has better support for monorepos. Install it with

`npm install -g pnpm`

Initiate pnpm (this will create a package.json)

`pnpm init`

Install typescript ( a pnpm-lock.yaml file is created which is like a package-lock.json)

`pnpm add -D typescript @types/node`

Create a new file called `pnpm-workspace.yaml`. Here, we will configure all the different projects that we’ll have. We're gonno have two "create react apps here, with one shared folder". What we’re doing here is telling pnpm that we’ll have three projects that it needs to keep track of.

Before we create those however, we need to setup our base tsconfig.json file. Let’s go ahead and create two new files. The first one we’ll create is `tsconfig.base.json`, feel free to tweak your TypeScript settings as you see fit.

Now we can create our actual `tsconfig.json`. To have it inherit from our base, we need to add the following line to it.

### We are now ready to start adding our projects!

## Creating our shared project

Our next step is to create our shared project. To start, create a new folder called sharedHelpers and add a new package.json file to it. This project will contain a simple type and function that we can share between our codebases.

Add a file called `index.ts` to the sharedHelpers folder.

This is all we need to start sharing code between our client apps.

## Configuring our frontend React apps

Create a `packages` folder. Go to the packages folder. Inside create your React apps.

instead of vite as the above guide uses, this project uses CRA

`pnpm create react-app pnpm-cra --template typescript `

remove the package-lock.json file and the node_modules. When using pnpm for a monorepo all installations should be made from the root.

To be able to access typescript files from other packages we need to configure webpack, this is done using craco (Create React App Configuration Overrides) instead of ejecting the react app.

`pnpm i @craco/craco`

Create a `craco.config.js` and install needed plugins.

`pnpm i -D tsconfig-paths-webpack-plugin`

Change `react-scripts start` to `craco start` in `package.json`

Do cd .. to get to the root and do `pnpm install` from there.

To fix problems with missing peer depndencies like plugins, create a file called `.npmrc` in the root (outside packages folder)and in it add "auto-install-peers=true".
Run `pnpm install`. You'll get something like "scope: all 2 workspace projects
Lockfile is up to date, resolution step is skipped

Already up to date

"
In your packages folder you now have one create react app (CRA).
Create as many as you like. Just don't forget to remove node_modules and package-lock.json, and after that run pnpm install from root.

Go inside your react app, and start it with

`pnpm start`

if you get an error in the app.test file that says something like this: "Property 'toBeInTheDocument' does not exist on type 'JestMatchers<HTMLElement>'.
"

run

`pnpm add -D @types/testing-library__jest-dom `

Your react app should appear without errors on localhost:3000 !!!

However your package.json files in the create react app need some changes to be able to use stuff in the shared-helper folder.
Add "@monorepo/shared-helper": "workspace:\*", under dependencies. This will create a symlink ?? to the packages/shared-helper folder.

Add to npm? Each package.json becomes a separate package on npm. Except for the root, which you never publish.
