# Dayboard. Calendar. Todo list.

- A calendar for myself and friends.  
- Preview UI - Netlify (without server!) [https://dayboard.netlify.app](https://dayboard.netlify.app) 

## Quick start

1. Install `client` and `server`:

```bash
cd client && pnpm i && pnpm run dev
```

```bash
cd server && pnpm i && pnpm run dev
```

## Quick authorization

- Login: pocketbook.love24@gmail.com
- Password: midapa24


## Preview

### UI

### Auth page

<img src="https://i.postimg.cc/XJLfw9Cj/auth.png" alt="Auth"/>

### Main page

<img src="https://i.postimg.cc/YqKXMzzV/main.png" alt="Main"/>

### Panel page

<img src="https://i.postimg.cc/BZcFP5GR/panel.png" alt="Timer"/>

### Panel page (not found day)

<img src="https://i.postimg.cc/cJhq85Xr/error.png" alt="Error-notification"/>

## Story

> I've used different calendars and todo lists before, but i didn't feel inspired to use them. Just a soulless list that forces you stop your chilling and do something.

- In this application, I focus on futuristic and living design.

- After registration -> authorization, the user will be prompted to create a template to be used in subsequent days. Every day a new todo list is created according to the template and the user fills it out by solving scheduled tasks.

- The user can at any time to get statistics by day, by range days in the form of a radar chart. It displays entire information about completed tasks for the selected period and displays the dynamics of task completion.

- Naturally, the user at any time can edit statistics for any of the past days, create a new one or delete an old one.

## Todo

There is still a lot to do, but i don't give up.

# In general terms

- [ ] Able to signup
- [x] Able to login
- [x] Auth validation
- [x] Notifaction about error/success authorization
- [ ] Able to create/change default template 
- [ ] Able to change todo tasks in day
- [ ] Able to change day as current day
- [x] Radar chart for displaying solo day information
- [x] Radar chart for displaying range days information
- [ ] Linear chart for getting info about specific task (only for range days)
- [x] Error notifaction about missing day/s todo
- [x] Datepicker component for selecting solo day, range of days
- [ ] UI effects for datepicker
- [ ] Theme switcher (dark/light mode)
- [ ] Mobile version
- [ ] PWA
- [ ] i18n localization
- [ ] ...

# In specifically terms 
- [x] Datepicker component (reusable)
- [x] Tab component (reusable)
- [ ] Modal component (reusable)
- [ ] Pagination (reusable)
- [ ] Select (reusable)
- [ ] Input (reusable)
- [ ] Vitest for core logic
- [ ] Testing-Library for UI component

# Features
- [Atomic arhitecture](https://medium.com/@kevinkurniawan97/atomic-design-with-vue-fa1b50a1251e)
- Composition API & Composables
- [Functional core, Imperative shell](https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell)
- [Function ref](https://www.youtube.com/watch?v=EiqwYep8QEA&t=10s)
- [Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html)

## Stack

- [Vite](https://github.com/vitejs/vite)
- [Vue 3](https://github.com/vuejs/vue)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitess Light](https://github.com/antfu/vitesse-lite)
- [Vue Chart 3](https://vue-chart-3.netlify.app/)
- [Vee-Validate](https://vee-validate.logaretm.com/v3)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
