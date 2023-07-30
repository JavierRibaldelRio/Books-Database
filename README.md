# Books Database
An app to manage the books that you have read. CS5Ox final project.
[![](https://balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/JavierRibaldelRio/Books-Database)


## Getting Started


### Prerequisites

- NPM & Node.JS installed
- Pip & Python installed



### Installing

#### Frontend
All this commands must be executed in `/frontend/`

1. Install *npm* packages

```bash
frontend/$ npm install
```



Then for development purpose, add this line in `/frontend/package.json` 

```json
{
...
    "proxy":"http://127.0.0.1:5000/",
...
}
```



2. Run this command

```bash
frontend/$ npm start
```



#### Backend

All this commands must be executed in `/backend/`

1.  Create python virtual environment

```bash
/backend/$ sudo python -m venv flaskenv
```



2.  Access to virtual environment

```bash
/backend/$ source flaskenv/bin/activate
```



3. Install *pip* packages

```bash
(flaskenv)/backend/$ sudo pip install -r requirements.txt
```



4. Start the backend server

```bash
(flaskenv)/backend/$ flask run
```



## Deployment

- For deployment purpouse be sure to remove proxy line in `/frontend/package.json`
- Execute this command in `/frontend/`
```bash
npm run buid
```



## Built With

* [React](https://react.dev/) - The web framework used
* [Flask](https://flask.palletsprojects.com/en/2.3.x/) - Backend server
* [D3](https://d3js.org/) - Used to generate plots



## Authors

* **Javier Ribal del Río** - *Initial work* - [JavierRibaldelRio](https://github.com/JavierRibaldelRio)



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

