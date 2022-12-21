# Funcion que se ocupa de obtener el contenido de un formulario enviado

from models.models import Libros 

def recibir_form_libro(req):

    form = req.recibir_form_libro

    titulo = buscar('titulo')
    idioma = buscar('idioma')
    libro_id = buscar('libro_id')
    autor_id = buscar('autor_id')
    fecha_inicio = buscar('fecha_inicio')
    fecha_finalizacion= buscar('fecha_finalizacion')

    return Libros(titulo=titulo, idioma=idioma, libro_id = libro_id, autor_id= autor_id, fecha_finalizacion=fecha_finalizacion, fecha_inicio= fecha_inicio)


    def buscar(a):
        return req.form.get(a)
