# CS50W Final Project "Solar_Music"

![Project logo](./project_logo.jpg)

#### Introduction

Solar music is a music app, where you can listen to tracks and create your own playlists. It utilizes **Django** for backend and **NextJs** for frontend.

#### Why Django + NextJs?

Both are known to be fullstack frameworks, however both of them are stronger on either side of the web development. **NextJs** allows you to create server components in order to fetch data from DB in a safer way but it still does not protect your DB from various types of attacks, such as SQL injections.

**Django**, on the other hand, is great for building backend API, but lacks in flexibility on frontend side, which can result in thousands lines of raw JS.

#### Distinctiveness

The theme of the app is music and playlists, which differs from a theme of any prior project in the course.

#### Complexity

The project uses techniques and packages that in certain cases can be seen as exceeding the complexity that is demanded by the course. Frontend is built not just with raw JS, but with **React** + **NextJs** (full-scale frontend framework). It also uses **TypeScript** (statically typed version of JS) and ESLint to ensure safety and high quality of the code. The app also utilizes **Web Audio API** to work with music and **TanStackQuery** to fetch data from server.

On a server side, **django-rest-framework** is used for more elegant API-building. And user authentication is performed via _JWT-tokens_.

#### Project Structure

In total, there are 100+ files in the project, so instead of writing about each of them, I would like to give a quick overview of project structure.

The project is separated in "client" and "server" folder for fronted and backend respectively.
**client:**

- On top there are several config files, _gitignore_ and _package.json_ files that are needed to create project builds.
- "public" folder contains static files.
- "src" folder contains all code of the app. The structure of this folder maintains nextJs' canonical structure, that is needed to use App Router: "\_lib" folder contains all util functions; "\_ui" folder contains React components and their styles; the rest of the folders represent pages of the app.

**server:**
Most of the files are created automatically as part of any Django Project. The ones created/modified by me:

- .gitignore (tells git which files not to include in repo)
- solar_player_api/admin.py (used to work with admin panel)
- solar_player_api/models.py (defines models the DB would be based on)
- solar_player_api/serializers.py (difnes serializers that are used to validate and format JSON data to return it to the client)
- solar_player_api/tests.py (used in testing)
- solar_player_api/users.py (api endpoints)
- solar_player_api/views.py (the functions performed while accessing api endpoint)
- CS50_Music/settings.py (configures project settings)
- CS50_Music/urls.py (links app urls to main project urls)

#### How to Run

**Server:**

1. Go to projects' root
2. Run "pip install requirements.txt"
3. Go to "server" folder
4. Run "python manage.py migrate"
5. Run "python manage.py loaddata fixtures/artists.json"
6. Run "python manage.py loaddata fixtures/data.json"
7. Run "python manage.py runserver"

**Client:**

1. Go to projects' root
2. Go to folder "client/cs50_music_client"
3. Run "npm install"
4. Run "npm run build"
5. Run "npm run start"

The site should be accessible on [localhost](http://localhost:3000). The terminals for both client and server need to be open simultaneously for the project to work.
