# kitra
Kitra is a game where users can collect treasures in a given latitude and longitude. Every treasure that is collected will have points based on the monetary value. A treasure may have more than one money value, it depends on the user’s luck. Kitra users may get the highest money from the treasure that has been collected.

## Setting up
1. First is to install the necessary dependencies.
```bash
npm install
```

2. Second you need to run the mysql docker image and fire it up.
```bash
docker-compose up -d
```

3. Third, you need to execute this command to seed your db tables.
```bash
npm run seed
```

4. And finally, serve up the resources by issuing the command
```bash
npm run dev
```

(optional) 5. You can also build the app for deployment purposes by issuing the command
```bash
npm run build
```