<h1>NOTE</h1>

<P> 
settings.py has been split into base.py, development.py and production.py. inside the config/setting directory.
and both the wsgi.py,asgi.py and manage.py has been configured to use the development.py 
</p>

<p>
 For production purposes the the these should be reset to use the production.py file
<br>
<i style="color:red;">Hence all development configuration should be done using the development.py file.</1>
</p>
<p>
 python-decouple package has been installed to handle the enviroment variables although the .env files where ignored in the .gitignore
</p>