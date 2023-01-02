# Funcion que se ocupa de obtener el contenido de un formulario enviado

from models.models import Libros 

def recibir_form_libro(req):

    form = req.form

    def buscar(a):
         
        b=req.form.get(a)
        return b

    titulo = buscar('titulo')
    idioma = buscar('idioma')
    libro_id = buscar('libro_id')
    autor = buscar('autor')
    fecha_inicio = buscar('fechaI')
    fecha_finalizacion= buscar('fechaF')

    return Libros(titulo=titulo.strip().lower(),
     idioma=idioma.strip().lower(), 
     libro_id = libro_id,
      autor= autor.strip().lower(),
       fecha_finalizacion=fecha_finalizacion, fecha_inicio=fecha_inicio)