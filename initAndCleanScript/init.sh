#/bin/bash
curDir=`pwd`
cd ../
python=`which python`
python manage.py migrate
python manage.py makemigrations AbonnementReport
python manage.py migrate
python manage.py runserver