cd %~dp0%
cd ..
set python=C:\Python27\python.exe
python manage.py migrate
python manage.py makemigrations AbonnementReport
python manage.py migrate
python manage.py runserver