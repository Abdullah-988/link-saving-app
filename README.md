<h1 align="center">🔗 Link Saving App</h1>

Simple Link saving app built using Django REST framework for backend and React for frontend.

## Getting started

To get started with this project, run:

```bash
git clone https://github.com/Abdullah-988/link-saving-app.git
```

### Backend

run:

```bash
python manage.py makemigrations
```

and

```bash
python manage.py migrate
```

then

```bash
python manage.py runserver
```

### Frontend

Setup `.env` file,

in `.env` file add your backend api url (use http://localhost:8000 as a start):

```
VITE_BACKEND_API="http://localhost:8000"
```

then run:

```bash
npm install
```

and

```bash
npm run dev
```
