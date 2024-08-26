# Funcion que se ocupa de obtener el contenido de un formulario enviado
def recibir_form_libro(req):
    def buscar(a):
        b = req.json.get(a)
        return b

    titulo = buscar("titulo")
    idioma = buscar("idioma")
    libro_id = buscar("libro_id")
    autor = buscar("autor")
    fecha_inicio = buscar("fecha_inicio")
    fecha_finalizacion = buscar("fecha_finalizacion")

    return {
        "libro_id": libro_id,
        "titulo": titulo.strip().lower(),
        "autor": autor.strip().lower(),
        "idioma": idioma.strip().lower(),
        "fecha_finalizacion": fecha_finalizacion,
        "fecha_inicio": fecha_inicio,
    }
