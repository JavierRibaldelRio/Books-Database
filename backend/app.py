# Servidor
import os
#Importa la librerias de flask

from flask import Flask, request;

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
    libro = recibir_form_libro(request);
print(Autores.query.filter_by(autor_id=autor_id).first())

    libro.save()

    

    return "Hi World" 
