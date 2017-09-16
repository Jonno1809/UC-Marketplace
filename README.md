# UC Marketplace App

This app is being developed as part of our Software Engineering Practice Group Assignment. The UC Marketplace app is an cross-platform app being developed using [Ionic](https://ionicframework.com/) that allows University of Canberra students to buy, swap and sell items such as textbooks and other products.

## Getting started
1. Install node.js
2. Install Ionic and Cordova using the following command:
```npm install -g cordova ionic``` 
3. Fork and clone the repository
4. ```cd path/to/UC-Marketplace```

### Build and Run
There's a few different commands to build and run the app.

To build and run the app, run in the command line:

 ```ionic serve``` to test in the browser,

or

```ionic lab``` to see how the app looks and runs on different platforms (IOS/Android/Windows Phone) in-browser. This is the same as running ```ionic serve --lab```

`ionic lab` and `ionic serve` creates a local server, so any changes are saved the app will rebuild itself to reflect those changes.

`serve` and `lab` do not load cordova plugins (unfortunately) which is required to be able to connect to the Microsoft Azure database and backend. To test that function, we must run the following in the command line:
1. ```ionic cordova add browser```
2. ```ionic cordova run browser```

Please note that changes won't automatically re-build the app with this command.

## Contributing
To contribute, fork the repository to your own GitHub page, clone it with ``git clone {yourgithubrepo.url}``, make changes, push back to your repository, and make a pull request to merge back into the 'Develop' branch of this repository. 

This project is created for a uni assignment only, so only collaborators will be able to push changes. If you wanna make this into something great then go ahead, but I'll only be allowing other pull requests at the end of the semester after the assignment is due (start of November).