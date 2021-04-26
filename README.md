# About

- Create an app for watch some movies and obtain movie informations, We would recommend using the OMDb API
  (http://www.omdbapi.com//) for retrieving the movies list.

# Team

- Here must contain the names of everyone in the team, at the moment that project is created
  - Developer: Alexandre Marques
  - Scrum Master: XXXX XXXX

# To Navigation
  To navigation, we use react-navigation as the main library.

# To Stylization
  To styling issues, we use styled-components as the main library.

# Libraries

- react 17.0.1
- react-native 0.64.0
- @react-navigation/native ^5.8.10
- @react-navigation/stack ^5.12.8
- @reduxjs/toolkit ^1.5.0
- @testing-library/react-native ^7.1.0
- axios ^0.21.1
- babel-plugin-transform-remove-console ^6.9.4
- color ^3.1.3
- date-fns ^2.16.1
- mask-js ^2.1.0
- prop-types ^15.7.2
- react-native-gesture-handler ^1.9.0
- react-native-reanimated ^1.13.2
- react-native-safe-area-context ^3.1.9
- react-native-screens ^2.16.1
- react-native-tab-view ^2.15.2
- react-native-testing-library ^6.0.0
- react-native-tiny-toast ^1.0.7
- react-native-vector-icons ^7.1.0
- react-redux ^7.2.2
- reactotron-react-native ^5.0.0
- reactotron-redux ^3.1.3
- reactotron-redux-saga ^4.2.3
- redux ^4.0.5
- redux-saga ^1.1.3
- styled-components ^5.2.1"
  
  devDependencies
- @babel/core ^7.13.8
- @babel/plugin-proposal-decorators ^7.12.1
- @babel/plugin-proposal-optional-chaining ^7.12.7
- @babel/runtime ^7.13.9
- @react-native-community/eslint-config ^2.0.0
- babel-eslint ^10.1.0
- babel-jest ^26.6.3
- babel-plugin-module-resolver ^4.0.0
- babel-plugin-root-import ^6.6.0
- cz-conventional-changelog 3.3.0
- eslint ^7.21.0
- jest ^26.6.3
- eslint-config-airbnb ^18.2.1
- eslint-config-prettier ^6.15.0
- eslint-import-resolver-babel-module ^5.2.0
- eslint-plugin-import ^2.22.1
- eslint-plugin-jsx-a11y ^6.4.1
- eslint-plugin-react ^7.21.5
- eslint-plugin-react-hooks ^4.2.0
- husky ^4.3.0
- lint-staged ^10.5.2
- metro-react-native-babel-preset ^0.65.2
- react-native-dotenv ^2.4.3
- react-test-renderer 16.13.1

# How to run

- yarn or npm install
- You need to run `react-native run-android.

# How to run units tests in jest

- yarn jest -u or test.

# Deploy

- Coming soon...

# Project Structure

```bash
├── assets
│   └── fonts
|   └── icons
|   └── images
├── components
├── config
├── helpers
├── routes
├── screens
├── services
├── store
|   └── sagas
|   └── slices
├── theme
|   └── colors
|   └── fonts
|   └── spacings
```

# Stack

- react-native

# Business Rules

- An Onboarding having two screens: one with a short description of the application and another one having
an input for retrieving the user favorite hero.
- A screen for listing comics of the selected hero. Each comic item in the list should display cover, issue
number, name and price. I want to be able to change my favorite hero.
