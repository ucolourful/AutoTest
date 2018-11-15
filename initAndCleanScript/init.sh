#/bin/bash
curDir=`pwd`
cd ../
python=`which python`
python manage.py migrate
python manage.py makemigrations AutoTest
python manage.py migrate
python manage.py runserver