# kitra
Kitra is a game where users can collect treasures in a given latitude and longitude. Every treasure that is collected will have points based on the monetary value. A treasure may have more than one money value, it depends on the user’s luck. Kitra users may get the highest money from the treasure that has been collected.

## Setting up
### First is to install the necessary dependencies.
```bash
npm install
```

### Second you need to run the mysql docker image and fire it up.
```bash
docker-compose up -d
```

### Third, you need to execute this command to seed your db tables.
```bash
npm run seed
```

### And finally, serve up the resources by issuing the command
```bash
npm run dev
```

#### (optional) You can also build the app for deployment purposes by issuing the command
```bash
npm run build
```

## API Endpoints
Here are the available endpoints for consumption

### Checking the health of the server
```bash
curl --request GET \
  --url http://localhost:3000/api/v1/health \
  --header 'User-Agent: insomnia/2023.5.8'
```

### Find treasure box within range
```bash
curl --request GET \
  --url 'http://localhost:3000/api/v1/treasure/14.552036595352455,121.01696118771324/1' \
  --header 'User-Agent: insomnia/2023.5.8'
```

### Variant of finding treasure box within range
the `prize` query parameter here is optional.
```bash
curl --request GET \
  --url 'http://localhost:3000/api/v1/treasure/14.552036595352455,121.01696118771324/1?prize=30' \
  --header 'User-Agent: insomnia/2023.5.8'
```

### Find all users
```bash
curl --request GET \
  --url http://localhost:3000/api/v1/user \
  --header 'User-Agent: insomnia/2023.5.8'
```

### Find user by id
```bash
curl --request GET \
  --url http://localhost:3000/api/v1/user/3001 \
  --header 'User-Agent: insomnia/2023.5.8'
```
