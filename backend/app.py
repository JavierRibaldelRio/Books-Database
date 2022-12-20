# Servidor
import os
#Importa la librerias de flask

from flask import Flask

#Importa las librerias de sqlAclchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from models.libro import Libro


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/api/add-book', methods=['GET','POST'])
def add_book():

    libro = Libro('Ender','JK','CAste',"23",'24')
    

    return "Hi World" 
