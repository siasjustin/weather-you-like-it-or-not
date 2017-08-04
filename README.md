Get up and running:

- clone the repo
- delete the .git folder
- npm install
- git init
- npm run dev
- npm run server
- open in browser localhost:8083
- git commit ....




SETTING UP MONGODB:

#it is important that you are using at least node v5+

$ brew install mongodb

if mongodb is installed use:
$ brew update mongodb

CONNECTING YOUR LOCAL DIRECTLY TO THE DB:
$ cd ~
$ mkdir -p /data/db
$ sudo chown -R `id -un` /data/db

$ mongo 

Yay! You're up and running, now to connect to our Ofo db...



$ quit()
^^ will quit your unauthorized connection
$ mongo ds143191.mlab.com:43191/ofo -u catchdev -p CaughtM3
^^ will log you in to our db