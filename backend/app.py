# Servidor
import os

# Importa la librerias de flask

import json

from flask import Flask, request, Response, send_file

# Importa las librerias de sqlAclchemy

from models.models import Libros, db, Colecciones

from scripts.elimina_de_colecciones import eliminar_de_colecciones

columnas = ["titulo", "idioma", "autor", "fecha_inicio", "fecha_finalizacion"]

from scripts.recibirformlibro import recibir_form_libro

from scripts.anyadir_libro_a_colecciones import anyadir_libro_a_colecciones

# Configura la app
app = Flask(__name__)

# Configua la base de datos
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)


# Ordena por nombre
def ord(e):
    return e["nombre"]


# Obtiene todo el contenido de ka base de datos y lo mete en un dict
def get_all_books():
    res = list()

    for u in Libros.query.all():
        dic = u.__dict__

        del dic["_sa_instance_state"]

        res.append(dic)

    return res


# Obtiene todas las coleciones
def get_all_collections():
    res = list()

    # Obtiene las colecciones y elimina el dato
    for u in Colecciones.query.all():
        dic = u.__dict__

        del dic["_sa_instance_state"]

        res.append(dic)

    # Ordena las colecciones por orden alfabético
    res.sort(key=ord)

    return res


# Recibe desde un formulario para crear un nuevo libro
@app.route("/api/add-book", methods=["POST"])
def add_book():
    # Obtiene las variables de el cliente y crea el libro
    libro = recibir_form_libro(request)

    # Guarda el libro
    libro.save()

    # Obtiene la lista de coleciones a las que hay que agregar el libro
    col = request.form.getlist("colecciones")

    # Obtiene la id del Libro
    libro_id = libro.libro_id

    # Añade a la tabla JOIN las relaciones
    anyadir_libro_a_colecciones(db, libro_id, col)

    return "Hi World"


# Obtiene una lista de los idiomas y de los autores


@app.route("/api/fetch-autores-idiomas-colecciones")
def fetch_autores():
    # Crea una respuesta en forma de diccionario
    res = dict()

    # Añade listas a los formularios
    res["idiomas"] = []
    res["autores"] = []
    res["colecciones"] = []

    # Obtiene los datos de la base de los libros
    for u in Libros.query.all():
        res.get("autores").append(u.__dict__.get("autor"))
        res.get("idiomas").append(u.__dict__.get("idioma"))

    # Elimina duplicados de las listas de libros
    res["idiomas"] = list(set(res["idiomas"]))
    res["autores"] = list(set(res["autores"]))

    # Ordena las listas
    res["idiomas"].sort()
    res["autores"].sort()

    # Obtiene las colecciones

    res["colecciones"] = get_all_collections()

    return res


# Deuvleve todos los libros en formato json
@app.route("/api/fetch_books")
def fetch_books():
    return get_all_books()


# Obtiene los datos de un libro
@app.route("/api/fetch-book/<id>")
def fetch_book(id):
    # Obtiene el libro y lo pasa a dict
    libro = Libros.query.get(id).__dict__

    # Elimina la propiedad interna
    del libro["_sa_instance_state"]

    # Obtiene el nombre, color e id de las colecciónes del libro
    colecciones = db.engine.execute(
        "SELECT color, nombre, colecciones.coleccion_id FROM  joincolecciones JOIN colecciones ON (joincolecciones.coleccion_id = colecciones.coleccion_id) WHERE (libro_id=?)",
        id,
    )

    # Lo pasa a lista de diccionarios
    libro["colecciones"] = [r._asdict() for r in colecciones]

    # Ordena
    libro["colecciones"].sort(key=ord)

    return libro


# Elimina los libros del servidor
@app.route("/api/remove-book/<id>", methods=["DELETE"])
def remove_book(id):
    Libros.query.filter(Libros.libro_id == id).delete()

    db.session.commit()

    db.engine.execute("DELETE FROM joincolecciones WHERE(libro_id=?)", id)

    return "Eliminado Correctamente"


# Modifica los libros
@app.route("/api/edit-book", methods=["POST"])
def edit_book():
    # Actualización de contenido
    # Obtiene el nuevo libro y lo pasa a diccionario
    nuevo = recibir_form_libro(request).__dict__
    # Elimina una propiedad
    del nuevo["_sa_instance_state"]

    # Busca el libro por la id  y lo actualiza
    libro = Libros.query.filter(Libros.libro_id == request.form.get("libro_id")).update(
        nuevo
    )

    # Guarda los cambios
    db.session.commit()

    # Actualización de etiquetas
    lid = nuevo.get("libro_id")
    # Elmina todas lac colecciones que tenía aderidas
    eliminar_de_colecciones(db, lid)

    # Obtiene las nuevas colecciones
    col = request.form.getlist("colecciones")
    # Guarda las nuevas colecciones
    anyadir_libro_a_colecciones(db, lid, col)

    return "Libro Editado"


# Query
@app.route("/api/query", methods=["POST"])
def query():
    # Variable que almacena la respuesta

    res = list()

    # Obtiene los datos del JSON

    # JSON
    json = request.json

    # obtiene los datos
    titulo = json.get("titulo")
    idioma = json.get("idioma")
    autor = json.get("autor")

    # formatea los datos
    s_titulo = "%{}%".format(titulo)
    s_idioma = "%{}%".format(idioma)
    s_autor = "%{}%".format(autor)

    # Ejecuta la Query
    for u in Libros.query.filter(
        Libros.titulo.like(s_titulo),
        Libros.idioma.like(s_idioma),
        Libros.autor.like(s_autor),
    ).all():
        dic = u.__dict__

        del dic["_sa_instance_state"]

        res.append(dic)

    return res


# Descarga la base de datos
@app.route("/download-db")
def download():
    path = "database.db"

    return send_file(path, as_attachment=True)


# Genera un Json con todo el contenido de la base de datosy lo descarga
@app.route("/download-json")
def download_JSON():
    return Response(
        json.dumps(get_all_books()),
        mimetype="application/json",
        headers={"Content-disposition": "attachment; filename=database.json"},
    )


# colecciones


# Crea coleccion
@app.route("/api/collection/create-collection", methods=["POST"])
def create_tag():
    # Obtiene los datos
    col = Colecciones(
        coleccion_id=None,
        nombre=request.form.get("nombre").strip().lower(),
        color=request.form.get("color"),
    )

    # Guarda los datos
    col.save()
    return "Colección  creada"


# Obtiene todas las colecciones
@app.route("/api/collection/fetch-colecciones")
def fetch_colecciones():
    return get_all_collections()


@app.route("/api/collection/remove-collection/<id>", methods=["DELETE"])
def eliminar_coleccion(id):
    # Elimina la coleccion de la tabald e colecciones
    Colecciones.query.filter(Colecciones.coleccion_id == id).delete()
    db.session.commit()

    # Elimina
    db.engine.execute("DELETE FROM joincolecciones WHERE (coleccion_id=?)", id)

    return Response(status=204)


# Obtiene todas las colecciones
@app.route("/api/collection/edit-collection", methods=["POST"])
def editar_coleccion():
    # Obtiene los nuevos datos
    id = request.form.get("coleccion_id")
    nombre = request.form.get("nombre")
    color = request.form.get("color")

    # Crea el nuevo objeto y lo hace diccionario
    nueva = Colecciones(coleccion_id=id, color=color, nombre=nombre).__dict__

    # Elimina una propiedad
    del nueva["_sa_instance_state"]

    # Guarda los cambios
    coleccion = Colecciones.query.filter(Colecciones.coleccion_id == id).update(nueva)

    db.session.commit()

    return "Editado :)"


@app.route("/api/collection/fetch-coleccion/<id>")
def fetch_coleccion(id):
    # Crea el diccionario de la respuesta
    respuesta = dict()

    respuesta["coleccion"] = Colecciones.query.get(id).__dict__

    del respuesta["coleccion"]["_sa_instance_state"]

    respuesta["contenido"] = [
        r._asdict()
        for r in db.engine.execute(
            "SELECT libros.libro_id, titulo, idioma, autor, fecha_inicio, fecha_finalizacion FROM joincolecciones JOIN libros ON (joincolecciones.libro_id=libros.libro_id) WHERE (joincolecciones.coleccion_id=?)",
            id,
        )
    ]
    # Ordena el contenido
    respuesta["contenido"].sort(key=lambda x: x["libro_id"])

    return respuesta
