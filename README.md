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

## Character List that are affect by bug currently 2/28/25

## Without Prettier Implementation
\
Rendered Email HTML: \
 Escape Character: \n
 
Tilda: ~

Backtick: `

Exclamation Point: !

At Symbol: @

Number Symbol: #

Money Symbol: $

Percentage Symbol: %

Up Symbol: ^

And Symbol: &

Asterisk Symbol: *

Parenthesis Left: (

Parenthesis Right: )

Minus Symbol: -

Under-Score: _

Addition Symbol: +

Equals Symbol: =

Comma: ,

Period: .

Question Mark: ?

Forward Slash: /

Back Slash: \

Brackets: [ ]

Curly Brackets {}

Bar Symbol: |

Double Quotes: "

Single Quotes: ' 

Line Break: \n

Tab: \t

Integers: 1234567890

Copyright Symbol: ©

TradeMark Symbol: (™)

Emoji: 😀


## With Prettier Implemented

  Escape Character: \n
  
  Tilda: ~
  
  Backtick: `
  
  Exclamation Point: ! 
  
  At Symbol: @  
  
  Number Symbol: # 
  
  Money Symbol: $
  
  Percentage Symbol: %
  
  Up Symbol: ^
  
  And Symbol: &amp ; (???????) (Does prettier cancel out he?)
  
  Asterisk Symbol: *
  
  Parenthesis Left: (
  
  Parenthesis Right: )
  
  Minus Symbol: -
  
  UnderScore: _
  
  Addition Symbol: +
  
  Equals Symbol: =
  
  Comma: ,
  
  Period: .
  
  Question Mark: ?
  
  Forward Slash: /
  
  Back Slash: \
  
  Brackets: [ ]
  
  Curly Brackets {}
  
  Bar Symbol: |
  
  Double Quotes: &quot ; (What??????????)
  
  Single Quotes: &#x27 ; (What??????????)
  
  Line Break:\n 
  
  Tab: \t
  
  Integers: 1234567890
  
  Copyright Symbol: ©
  
  Trade Mark Symbol: (™)
  
  Emoji: 😀
​
## Possible Solution for Prettier Issue:

1.You need to change 2 files within the Package folder, both render.tsx files in src/browser and src/node.
Go to Render Package in React-Email:
Packages -> Render -> SRC -> Node -> render.tsx
Packages -> Render -> SRC -> browser -> render.tsx

2. Go down to the botom of both files and replace:<br />
const document = `${doctype}${html.replace(/<!DOCTYPE.*?>/, '')}`;<br />
TO:<br />
let document = `${doctype}${html.replace(/<!DOCTYPE.*?>/, '')}`;

Reason: We might need to reassign the variable in order to allow changes depending if prettier is being implemented or not. 

3. Change these lines of code:<br />
  if (options?.pretty) {<br />
     return pretty(document);<br />
   }<br />
   return he.decode(document);<br />
}

TO:<br />
  if (options?.pretty) {<br />
     document = await pretty(document);<br />
   }<br />
   return he.decode(document);<br />
}

Reason: Prettier still escapes certain characters in some components like our <Text> component in React-email. In order to go about this, we still have to decode the output. So, we "prettify" the document first if prettier is enabled. We have to us an await keyword in the IF statement's body for when prettier is true because the function "pretty()" is an asynchronous function. Then afterwards once prettier has finished formatting, "he" will decode and fix the escape sequences. 

4. Run pnpm build.
    IF you have an issue with the build not running due to build tracing issues go to:
    ReactEmail-> node_modules -> @Next
    Delete your @Next folder in your node modules.
    Go back to terminal and do pnpm install
    Try the Build again. If this continues check to make sure your code is accurately implemented from previous steps. 

5. Go to Testing enviroment
    - npm update react-email-monorepo

6. Run the testing enviroment
    - npm run dev
Check for the charactesr &, ', " and they should be fixed with prettier set to true or false! :D

Note: This method works for our render functions but DOES NOT fix renderToString() (from react-dom) in EmailBugTest.tsx. 
