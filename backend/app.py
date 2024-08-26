# Servidor
import os

# Importa la librerias de flask
from flask import Flask, request, Response, send_file
import datetime
import sqlite3
import json


# scripts
from scripts.elimina_de_colecciones import eliminar_de_colecciones
from scripts.recibirformlibro import recibir_form_libro
from scripts.anyadir_libro_a_colecciones import anyadir_libro_a_colecciones


columnas = ["titulo", "idioma", "autor", "fecha_inicio", "fecha_finalizacion"]
# Almacena el formato de la fecha
FECHA_ISO = "%Y-%m-%d"

# Configura la app
app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")
basedir = os.path.abspath(os.path.dirname(__file__))

# Configure SQLite
con = sqlite3.connect("database.db", check_same_thread=False)
con.row_factory = sqlite3.Row


# Makes a query and return the results as a list of  dictionarys
def query_as_list_dict(query, val=None):
    cursor = con.cursor()
    cursor.execute("PRAGMA foreign_keys = ON")

    if val:
        cursor.execute(query, val)
    else:
        cursor.execute(query)

    return [dict(fila) for fila in cursor.fetchall()]


# FUNCIONES
# Ordena por nombre
def ord(e):
    return e["nombre"]


# Obtiene todo el contenido de ka base de datos y lo mete en un dict
def get_all_books():
    return query_as_list_dict("SELECT * FROM libros")


# Obtiene todas las coleciones
def get_all_collections():
    # Obtiene las colecciones y elimina el dato
    res = query_as_list_dict("SELECT * FROM colecciones")

    # Ordena las colecciones por orden alfabético
    res.sort(key=ord)

    return res


# # Redirección al cliente en cualquier circunstancia


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


@app.route("/")
def index():
    return app.send_static_file("index.html")


# Recibe desde un formulario para crear un nuevo libro
@app.route("/api/add-book", methods=["POST"])
def add_book():
    cursor = con.cursor()

    # Obtiene las variables de el cliente y crea el libro
    libro = recibir_form_libro(request)
    libro_id, titulo, autor, idioma, f_inicio, f_fin = libro.values()

    # Guarda el libro
    cursor.execute(
        "INSERT INTO libros (titulo, autor, idioma, fecha_inicio, fecha_finalizacion) VALUES(?,?,?,?,?)",
        (titulo, autor, idioma, f_inicio, f_fin),
    )

    # Obtiene la lista de coleciones a las que hay que agregar el libro
    col = request.json.get("colecciones")

    # Obtiene la id del Libro
    libro_id = cursor.lastrowid

    # Añade a la tabla JOIN las relaciones
    anyadir_libro_a_colecciones(cursor, libro_id, col)

    # Saves the changes
    con.commit()

    return Response(status=200)


# Obtiene una lista de los idiomas y de los autores
@app.route("/api/fetch-autores-idiomas")
def fetch_autores_idiomas():

    cursor = con.cursor()

    # Crea una respuesta en forma de diccionario
    res = dict()

    # Añade listas a los formularios
    res["idiomas"] = []
    res["autores"] = []

    # Obtiene los datos de la base de los libros
    for autor, idioma in cursor.execute(
        "SELECT autor, idioma autor FROM libros"
    ).fetchall():
        res.get("autores").append(autor)
        res.get("idiomas").append(idioma)

    # Elimina duplicados de las listas de libros
    res["idiomas"] = list(set(res["idiomas"]))
    res["autores"] = list(set(res["autores"]))

    # Ordena las listas
    res["idiomas"].sort()
    res["autores"].sort()

    return res


@app.route("/api/fetch-autores-idiomas-colecciones")
def fetch_autores_idiomas_colecciones():
    # Crea una respuesta en forma de diccionario
    res = fetch_autores_idiomas()

    # Crea la lista de las colecciones
    res["colecciones"] = []

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
    libro = query_as_list_dict("SELECT * FROM libros WHERE libro_id=?", (id,))[0]

    # Obtiene el nombre, color e id de las colecciónes del libro
    colecciones = query_as_list_dict(
        "SELECT color, nombre, colecciones.coleccion_id FROM  joincolecciones JOIN colecciones ON (joincolecciones.coleccion_id = colecciones.coleccion_id) WHERE (libro_id=?)",
        (id,),
    )

    # Lo pasa a lista de diccionarios
    libro["colecciones"] = colecciones

    # Ordena
    libro["colecciones"].sort(key=ord)

    return libro


# Elimina los libros del servidor
@app.route("/api/remove-book/<id>", methods=["DELETE"])
def remove_book(id):

    # Creates the cursor
    cursor = con.cursor()
    cursor.execute("PRAGMA foreign_keys = ON")

    cursor.execute("DELETE FROM joincolecciones WHERE libro_id=?", (id,))
    cursor.execute("DELETE FROM libros WHERE libro_id=?", (id,))

    con.commit()

    return Response(status=204)


# # Modifica los libros
@app.route("/api/edit-book", methods=["POST"])
def edit_book():

    cursor = con.cursor()
    # Actualización de contenido
    # Obtiene el nuevo libro y lo pasa a diccionario
    libro = recibir_form_libro(request)

    libro_id, titulo, autor, idioma, f_inicio, f_fin = libro.values()

    cursor.execute(
        "UPDATE libros SET titulo=?, autor=?, idioma=?, fecha_inicio=?, fecha_finalizacion=? WHERE libro_id=?",
        (titulo, autor, idioma, f_inicio, f_fin, libro_id),
    )

    # Elmina todas lac colecciones que tenía aderidas
    eliminar_de_colecciones(connection=con, cursor=cursor, id=libro_id)

    # Obtiene las nuevas colecciones
    col = request.json.get("colecciones")

    # Guarda las nuevas colecciones
    anyadir_libro_a_colecciones(libro_id=libro_id, colecciones=col, cursor=cursor)

    con.commit()

    return Response(status=200)


# # Query
@app.route("/api/query", methods=["POST"])
def query():
    # Variable que almacena la respuesta

    res = list()

    # Obtiene los datos del JSON

    # JSON
    json = request.json

    # Obtiene los datos
    titulo = json.get("titulo")
    idioma = json.get("idioma")
    autor = json.get("autor")

    # Formatea los datos
    s_titulo = "%{}%".format(titulo)
    s_idioma = "%{}%".format(idioma)
    s_autor = "%{}%".format(autor)

    return query_as_list_dict(
        "SELECT * FROM libros WHERE titulo LIKE ? AND idioma LIKE ? AND autor LIKE ?",
        (s_titulo, s_idioma, s_autor),
    )


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


# # colecciones


# Crea coleccion
@app.route("/api/collection/create-collection", methods=["POST"])
def crear_coleccion():

    cursor = con.cursor()

    # Obtiene los datos
    cursor.execute(
        "INSERT INTO colecciones (nombre, color)  VALUES(?,?)",
        (request.json.get("nombre").strip().lower(), request.json.get("color")),
    )

    # Guarda los datos
    con.commit()

    return Response(status=200)


# Obtiene todas las colecciones
@app.route("/api/collection/fetch-colecciones")
def fetch_colecciones():
    return get_all_collections()


# Remove collection
@app.route("/api/collection/remove-collection/<id>", methods=["DELETE"])
def eliminar_coleccion(id):

    cursor = con.cursor()
    cursor.execute("PRAGMA foreign_keys = ON")

    # Elimina, la agregación d elos libros a la colección
    cursor.execute("DELETE FROM joincolecciones WHERE coleccion_id=?", (id,))

    # Elimina la coleccion de la tabla de colecciones
    cursor.execute("DELETE FROM colecciones WHERE coleccion_id=?", (id,))

    # Aplica los cambios en la base de datos
    con.commit()

    return Response(status=204)


# Obtiene todas las colecciones
@app.route("/api/collection/edit-collection", methods=["POST"])
def editar_coleccion():

    cursor = con.cursor()

    # Obtiene los nuevos datos
    id = request.json.get("coleccion_id")
    nombre = request.json.get("nombre").strip().lower()
    color = request.json.get("color")

    # Update
    cursor.execute(
        "UPDATE colecciones SET color=?, nombre=? WHERE coleccion_id=?",
        (color, nombre, id),
    )

    # Aplica los cambios
    con.commit()

    return Response(status=200)


@app.route("/api/collection/fetch-coleccion/<id>")
def fetch_coleccion(id):
    # Crea el diccionario de la respuesta
    respuesta = dict()

    respuesta["coleccion"] = query_as_list_dict(
        "SELECT * FROM colecciones WHERE coleccion_id=?", (id,)
    )[0]

    contenido = query_as_list_dict(
        "SELECT libros.libro_id, titulo, idioma, autor, fecha_inicio, fecha_finalizacion FROM joincolecciones JOIN libros ON (joincolecciones.libro_id=libros.libro_id) WHERE (joincolecciones.coleccion_id=?)",
        (id,),
    )

    respuesta["contenido"] = contenido

    # Ordena el contenido
    respuesta["contenido"].sort(key=lambda x: x["libro_id"])

    return respuesta


# # Estadísticas


@app.route("/api/data/fetch-idiomas")
def fetch_data_idiomas():
    x = query_as_list_dict("SELECT idioma, COUNT(idioma) FROM libros GROUP BY idioma")

    s = dict()

    for idioma in x:
        s[idioma.get("idioma")] = idioma.get("COUNT(idioma)")

    return s


@app.route("/api/data/fetch-meses-anyos")
def fetch_meses_anyos():

    cursor = con.cursor()

    # Obtiene los libros por anyo y por mes

    res = {"anyos": {}, "meses": {}}

    # LLena el diccionario

    for n_mes in range(12):
        res["meses"][n_mes] = 0

    for u in cursor.execute(
        "SELECT fecha_finalizacion FROM libros WHERE fecha_finalizacion IS NOT NULL AND NOT fecha_finalizacion LIKE ''"
    ):
        # Obtine la fecha de la tuple
        s = u[0]

        # Hace recuento de anyos
        any = s[0:4]

        if any in res["anyos"].keys():
            res["anyos"][any] = res["anyos"][any] + 1

        else:
            res["anyos"][any] = 1

        # Hace un recuento de meses de la base de datos
        mes = int(s[5:7]) - 1

        res["meses"][mes] = res["meses"][mes] + 1

    return res


@app.route("/api/data/fetch-datos-generales")
def fetch_media_dias():

    cursor = con.cursor()

    # Media dias por libro
    # Crea un array con todos los datos
    dias = []

    for u in cursor.execute(
        "SELECT fecha_inicio, fecha_finalizacion FROM libros WHERE fecha_finalizacion IS NOT NULL AND NOT fecha_finalizacion LIKE '' AND fecha_inicio IS NOT NULL AND NOT fecha_inicio LIKE ''"
    ):
        # Transforma las fechas
        fechaI = datetime.datetime.strptime(u[0], FECHA_ISO)
        fechaF = datetime.datetime.strptime(u[1], FECHA_ISO)

        dias.append((fechaF - fechaI).days)

    # Suma el array
    suma = 0

    for dia in dias:
        suma = suma + dia

    # Calcula la media y la redonde a a dos decimales

    media = round(suma / len(dias), 2)

    # Colecciones

    for u in cursor.execute("SELECT COUNT(*) FROM colecciones"):
        n_colecciones = u[0]

    for u in cursor.execute("SELECT COUNT(*) FROM libros"):
        n_libros = u[0]

    return {"media": media, "colecciones": n_colecciones, "libros": n_libros}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
