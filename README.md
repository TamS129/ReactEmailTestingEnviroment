# ReactEmailTestingEnviroment
## How to set up the Testing enviroment

1. Pull down your repo and in package.json remove these two lines:
>    "@react-email/components": "^0.0.32",
>    "@react-email/render": "1.0.4",

and add these two lines in their place:
>    "react": "^19.0.0",
>    "react-dom": "^19.0.0",

2. Pull down the react-email repo

3. In the react-email repo locally run the following (SLOOOOWWW) commands. pnpm install to install the dependencies and then pnpm build

NOTE: If you are on Windows and are getting an error involing tailwind follow these instructions:
    - Go to terminal and type in: cd packages -> cd tailwind
    - Type in terminal pnpm install
    - If this gives you an error. Go to the Tailwind package in the directory and go into the package.json file. Change your settings here to:

    "scripts": {
    "build": "tsc && cross-env NODE_ENV=production vite build --mode production && node ./copy-tailwind-types.mjs",
    "dev": "vite build --watch",
    "clean": "rm -rf dist",
    "test:watch": "vitest",
    "test": "vitest run"
  }
  - Save the file then cd .. to go back to the main root file.
  - Run "pnpm add cross-env --save-dev -w"
  - Run the Build Package again.

NOTE 2: If you get an error saying that DEMO files are unable to build/Commander is not found. Go to the terminal and type in:
    - pnpm install commander -w
    - Run pnpm build again.

Note 3: If you build runs an error like this:

        Tasks:    33 successful, 33 total
        Cached:    20 cached, 33 total
        Time:    3m1.235s

        >   ...Finishing writing to cache...                                                                                                                                          
        WARNING  no output files found for task react-email-with-next-scaleway#build. Please check your `outputs` key in `turbo.json`
        WARNING  no output files found for task react-email-with-resend#build. Please check your `outputs` key in `turbo.json`
        vite v5.4.13 building for production...
        ✓ 0 modules transformed.
        x Build failed in 23ms
        error during build:
        Could not resolve entry module "index.html".
            at getRollupError (file:///C:/Users/Terra/Documents/Test/react-email/node_modules/.pnpm/rollup@4.31.0/node_modules/rollup/dist/es/shared/parseAst.js:396:41)
            at error (file:///C:/Users/Terra/Documents/Test/react-email/node_modules/.pnpm/rollup@4.31.0/node_modules/rollup/dist/es/shared/parseAst.js:392:42)
            at ModuleLoader.loadEntryModule (file:///C:/Users/Terra/Documents/Test/react-email/node_modules/.pnpm/rollup@4.31.0/node_modules/rollup/dist/es/shared/node-entry.js:20237:20)
            at async Promise.all (index 0)
         ELIFECYCLE  Command failed with exit code 1.

Disregard and move on to the next steps.

4. In the Test Environment repo, run npm install and then npm install FOLDER PATH TO react-email repo. The Folder path may need to be an relative path if absolute doesn't work.

5. In your source code, RenderBugTest.jsx and EmailBugTest.jsx update imports to look like these:
> import { Body, Text } from 'react-email-monorepo/packages/components';
> import { render } from "react-email-monorepo/packages/render";

6. From the Test Environment repo, run npm run dev

7. Open the browser and visit localhost:5173

8. If everything works then the install is working.
To develop and test you will need to do the following:


1. Make changes to the react-email repo, for example in packages/body/src/body.tsx:
export const Body = React.forwardRef<HTMLBodyElement, BodyProps>(
  ({ children, style, ...props }, ref) => {
    console.log('Attempting to render Body');

2. In that repo, run pnpm build   (SLOOOOWWW)

3. If the above succeeded, switch to your Test Environment repo and run npm update react-email-monorepo

4. Run npm run dev

5. Open the browser and visit localhost:5173 and check the console.log for the message.
