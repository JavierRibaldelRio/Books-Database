# Añade un libro a varias colecciones


def anyadir_libro_a_colecciones(db, libro_id, colecciones):
    # Añade a la tabla JOIN las relaciones
    for id in colecciones:
        db.engine.execute(
            "INSERT INTO joincolecciones (libro_id,coleccion_id) VALUES (?,?)",
            libro_id,
            id,
        )
