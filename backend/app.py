# Servidor
import os
#Importa la librerias de flask

from flask import Flask

#Importa las librerias de sqlAclchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from models.models import Libros, db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/api/add-book', methods=['GET','POST'])
def add_book():

    libros = Libros(titulo='Ender',idioma='CAste',fecha_inicio="23",fecha_finalizacion='24',autor_id=12)

    libros.save()
    

    return "Hi World" 
