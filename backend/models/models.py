from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# Define la clase libro


class Libros(db.Model):
    # Define el nombre de la tabla

    libro_id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String)
    idioma = db.Column(db.String)
    fecha_inicio = db.Column(db.String)
    fecha_finalizacion = db.Column(db.String)
    autor = db.Column(db.String)

    def __init__(
        self, titulo, idioma, fecha_inicio, fecha_finalizacion, autor, libro_id
    ):
        self.libro_id = libro_id
        self.titulo = titulo
        self.idioma = idioma
        self.fecha_inicio = fecha_inicio
        self.fecha_finalizacion = fecha_finalizacion
        self.autor = autor

    # Función que guarda el objeto
    def save(self):
        if not self.libro_id:
            db.session.add(self)
        db.session.commit()

    # Función que transforma a el usuario en un
    pass


class Colecciones(db.Model):
    # Define el nombre de la tabla

    coleccion_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String)
    color = db.Column(db.String)

    def __init__(self, coleccion_id, nombre, color):
        self.coleccion_id = coleccion_id
        self.color = color
        self.nombre = nombre

    # Función que guarda el objeto
    def save(self):
        if not self.coleccion_id:
            db.session.add(self)
        db.session.commit()

    # Función que transforma a el usuario en un
    pass
