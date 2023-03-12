# Servidor
import os
#Importa la librerias de flask

import json

from flask import Flask, request, jsonify;

#Importa las librerias de sqlAclchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from models.models import Libros, db

columnas = ['titulo', 'idioma', 'autor','fecha_inicio','fecha_finalizacion']

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

    #Guarda el libro
    libro.save()

    
    return "Hi World" 


#Obtiene una lista de los idiomas y de los autores

@app.route('/api/fetch_autores_idiomas')
def fetch_autores():

    # Crea una respuesta en forma de diccionario
    res = dict()

    #Añade listas a los formularios
    res['idiomas'] =[]
    res['autores'] = []

    # Obtiene los datos de la base
    for u in Libros.query.all():
        res.get('autores').append(u.__dict__.get('autor'))
        res.get('idiomas').append(u.__dict__.get('idioma'))

    # Elimina duplicados de las listas
    res['idiomas'] =list(set(res['idiomas']))
    res['autores'] =list(set(res['autores']))

    #Ordena las listas
    res['idiomas'].sort()
    res['autores'].sort()

    return res

# Deuvleve todos los libros en formato json
@app.route('/api/fetch_books')
def fetch_books():

    res = list()

    for u in Libros.query.all():

        dic =  u.__dict__

        del dic['_sa_instance_state']

        res.append(dic); 

    return res

# Obtiene los datos de un libro
@app.route('/api/fetch-book/<id>')
def fetch_book(id):

    libro = Libros.query.get(id).__dict__
    del libro['_sa_instance_state']

    return libro

# Elimina los libros del servidor

@app.route('/api/remove-book/<id>',methods=['DELETE'])
def remove_book(id):

    Libros.query.filter(Libros.libro_id==id).delete()

    db.session.commit()

    return 'Eliminado Correctamente'

#Modifica los libros
@app.route('/api/edit-book', methods=['POST'])
def edit_book():

    # Obtiene el nuevo libro y lo pasa a diccionario
    nuevo =recibir_form_libro(request).__dict__
    # Elimina una propiedad
    del nuevo['_sa_instance_state']

    # Busca el libro por la id  y lo actualiza
    libro = Libros.query.filter(Libros.libro_id==request.form.get('libro_id')).update(nuevo)
    
    # Guarda los cambios
    db.session.commit()

    return "Libro Editado"

# Query

@app.route('/api/query' ,methods=['POST'])
def query():

    # Variable que almacena la respuesta

    res = list()
    
    # Obtiene los datos del JSON
    
    # JSON
    json = request.json

    titulo = json.get('titulo')
    idioma = json.get('idioma')
    autor = json.get('autor')


    print(autor)

    s_titulo ="%{}%".format(titulo)
    s_idioma ="%{}%".format(idioma)
    s_autor ="%{}%".format(autor)


    for u in Libros.query.filter(Libros.titulo.like(s_titulo),Libros.idioma.like(s_idioma),Libros.autor.like(s_autor)).all():

        dic =  u.__dict__

        del dic['_sa_instance_state']

        res.append(dic)

    print(res)
    return res


   
