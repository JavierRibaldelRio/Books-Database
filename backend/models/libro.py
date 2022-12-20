

from app.app import db
#Define la clase libro

class Libro(db.Models):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    titulo = db.Column(db.String)
    idioma = db.Column(db.String)
    fecha_incio = db.Column(db.String)
    fecha_finalizacion = db.Column(db.String)
    autor_id = db.Column(db.Integer)

    def __init__(self, titulo, idioma, fecha_incio, fecha_finalizacion, autor_id):
        self.titulo = titulo
        self.idioma = idioma
        self.fecha_incio = fecha_incio
        self.fecha_finalizacion = fecha_finalizacion
        self.autor_id = autor_id

