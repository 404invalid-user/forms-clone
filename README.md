# forms-clone
a google forms clone that uses discords oauth2 for authentication and allows you to only allow people in a certain server to fill it in.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/404invaliduser) ![version](https://img.shields.io/badge/version-1.0.0-green)

## demo 
[https://forms.invalidlag.com/form?id=9byu11w1yl0xre77x9byu11w1yl0xre77y9byu11w1yl0xre77z](https://forms.invalidlag.com/form?id=9byu11w1yl0xre77x9byu11w1yl0xre77y9byu11w1yl0xre77z)

## Features/TODO
- [x] discord OAuth2
- [x] text input
- [x] checkbox
- [x] limit answers to server
- [x] webhook notification
- [ ] long text 
- [ ] multiple choice
- [ ] custom colours
- [ ] custom image(s)
- [ ] additional editor users

[ask for more](https://discord.gg/RYQbmj7)

## install/setup

clone the repo
```
git clone https://github.com/404invalid-user/forms-clone.git
```

build the vue app
```
cd ./forms-clone/client
npm i
npm run build
```
  

move everything in the dist folder to the server folder
```
mv ./dist ../server/
```

  

under ./server copy the .env.example file as .env and add your api keys

run it
```
npm run start
```

## support

discord - [https://discord.gg/RYQbmj7](https://discord.gg/RYQbmj7)
github issues - [/forms-clone/issues](https://github.com/404invalid-user/forms-clone/issues)