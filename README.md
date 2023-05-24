<h1 align="center">
MERN Stack MicroService
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>


> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

## clone or download
```terminal
$ git clone https://github.com/theintheinswe/nodejs_microservice.git
$ yarn or npm i
```

## project structure
```terminal
client/
comment/   
gateway/
posts/
user/
...
```

## Prerequisites
- [MongoDB](https://www.mongodb.com/try/download/community-kubernetes-operator)
- [Node](https://nodejs.org/en/download/) 
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need user, posts, comment, gateway and client runs concurrently in different terminal session, in order to make them talk to each other

## User-server usage(PORT: 8001)
```terminal
$ cd user           // go to user folder
$ npm i             // npm install packages
$ npm run dev       // run it locally
```


## posts-server usage(PORT: 8002)
```terminal
$ cd posts          // go to posts folder
$ npm i             // npm install packages
$ npm run dev       // run it locally
```

## comment-server usage(PORT: 8002)
```terminal
$ cd comment        // go to comment folder
$ npm i             // npm install packages
$ npm run dev       // run it locally
```

## gateway-server usage(PORT: 8000)
```terminal
$ cd gateway        // go to gateway folder
$ npm i             // npm install packages
$ npm start         // start server
```

## Client-side usage(PORT: 3000)
```terminal
$ cd client         // go to client folder
$ npm i             // npm install packages
$ npm start         // run it locally