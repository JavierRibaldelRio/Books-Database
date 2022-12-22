from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
#Define la clase libro

class Libros(db.Model):
    libro_id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String)
    idioma = db.Column(db.String)
    fecha_inicio = db.Column(db.String)
    fecha_finalizacion = db.Column(db.String)
    autor_id = db.Column(db.Integer)

    def __init__(self, titulo, idioma, fecha_inicio, fecha_finalizacion, autor_id,libro_id):

        self.libro_id = libro_id
        self.titulo = titulo
        self.idioma = idioma
        self.fecha_inicio = fecha_inicio
        self.fecha_finalizacion = fecha_finalizacion
        self.autor_id = autor_id

    # Función que guarda el objeto
    def save(self):
        if not self.libro_id:
            db.session.add(self)
        db.session.commit()
    pass

