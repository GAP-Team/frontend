## GAP Frontend 

A Next.js 14 and App Router-ready featuring:

- Next.js App Router
- Optimized for SEO using Next.js's Metadata
- Styling Landingpage with Tailwind CSS + Daisy + Flowbite
- Styling GAP dashboards with MUI Library



## Conventions to hold on:
- name of folders always in **lower case** ot it has multiple words than **like_this**.
- name of Typescript files in **CamelCase**.
- structure component folder into categories **input**, **button**, etc.
- using **G** at the begining of the file name of the Components to refers that GAP Component and not from Framework.
- **inline-style** with sx props from MUI should be extracted as an **ts object** and defined at the end of each component.
- icons are mixed between from **Figma**, **Font awsome**, **react-icons** and **MUI icons**.
- fonts and colors for landingpage defined in **tailwind.config.ts**
- fonts and colors for dashboards defined in **app/theme.ts**


## Getting Started

- install npm packages
```
npm install
```

- copy the `.env.example` into `.env` and update the real variables in `.env` 

- run the development server:

```
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## or Run the App with Docker

The application is setup to run in docker with docker-compose `docker-compose up`

if you do not want log messages run `docker-compose up -d`

## The App hosted on DigitalOcean

```
goldfish-app-2ccci.ondigitalocean.app/

```

## Important:
- `.env.example`should always be up-tp-date with Dummy variables




