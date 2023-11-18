# BAM_PRO_DEMO
BAM project shows secure mobile app for password manager.


## Installation
```sh
git clone https://github.com/patrykjawor/BAM_PRO.git
cd bam_pro_demo
cd backend
conda create --name <env> --file requirements.txt
python manage.py migrate
python manage.py makemigrations mainApp
python manage.py migrate
python manage.py makemigrations django_otp
python manage.py migrate
cp backend/env.schema backend/.env
cd ../frontend
npm i
```

## Usage
To start server use this commands:

```sh
cd backend
conda activate <env>
python manage.py runserver
```

To start Node.js developer server use this command:
```sh
cd frontend
npm run dev
```

## Authors
<h3>Jakub Jach<br/>
Patryk Jaworski
</h3>


## Project status
Project still in development, planning to add secure local storage on phone.
