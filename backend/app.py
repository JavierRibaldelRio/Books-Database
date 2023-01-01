# Servidor
import os
#Importa la librerias de flask

import json

from flask import Flask, request, jsonify;

#Importa las librerias de sqlAclchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from models.models import Libros, db, Autores


from scripts.recibirformlibro import recibir_form_libro

#Configura la app
app = Flask(__name__)

#Configua la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Recibe desde un formulario para crear un nuevo libro
@app.route('/api/add-book', methods=['GET','POST'])
def add_book():


    #Obtiene las variables de el cliente
    libro = recibir_form_libro(request)
    resultado = Autores.query.filter_by(autor_id=3).first()


    libro.save()

    
    return "Hi World" 


#Obtiene una lista de las id's y de los nombres de los autores

@app.route('/api/fetch_autores')
def fetch_autores():
    lista = []
    for u in Autores.query.all():
        lista.append(u.__dict__.get('nombre'))
    return lista

@app.route('/api/fetch_lenguas')
def fetch_lenguas():
    lista=[]

    for u in Libros.query.all.distinct():
        print(u.__dict__)

    return "Hola como te encuentasdfjal la kla dl"