# Servidor

#Importa la librerias de flask

from flask import Flask, flash, redirect, render_template, request, session

app = Flask(__name__)

@app.route('/api/add-book', methods=['GET','POST'])
def add_book():

    print(request.form.get('autor'))

    return "Hi World"