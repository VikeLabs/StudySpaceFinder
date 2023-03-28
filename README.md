# Study Space Finder

## Server

- Python 3.10

- Sqlite

### With Docker

Assuming you have [Docker](https://www.docker.com/) and [Docker compose](https://docs.docker.com/compose/install/)
installed (usually docker compose will come with docker).

At the root of the project:

```sh
npm run server:start -d
# the flag -d (optional) is to detach the container from the current terminal.
# good if you are not interested in seeing the server log and to start the react
# script in the same terminal
```

If it hasn't been built before, in the server folder run:

```sh
docker-compose up --build
```

`CTRL-C` will only stop the container, in the future, to prune the `spf` docker image:

```sh
npm run server:clean
```

### With Python

**NOTE**: You should [create a venv](https://python.land/virtual-environments/virtualenv),
otherwise if you need to update the `requirements.txt`, it will include everything that is
installed globally. This took me an hour to figure out :/.

Go into the `./server` dir:

```sh
python3 -m venv venv # creating a venv

## windows ##
# In cmd.exe
venv\Scripts\activate.bat
# In PowerShell
venv\Scripts\Activate.ps1

## unix ##
source venv/bin/activate
```

Install the dependencies:

```sh
pip install -r requirements.txt
```

Start server:

```sh
uvicorn main:app --host 0.0.0.0 --reload
```

### Update `requirements.txt`

- Make sure that your virtual environments is activated!!

```sh
pip freeze > requirements.txt
```

- If running Docker, kill the docker container (Ctrl-C), run:

```sh
yarn server:start --build # rebuilding docker image
```

### Get data from UVic

Assuming the virtual env is activated, to fetch a term data from UVic, for example spring 2023, run

```sh
cd server && python script.py get-data 202301
```
