# elimna de colecciones
def eliminar_de_colecciones(db, id):
    print(id)
    db.engine.execute("DELETE FROM joincolecciones WHERE libro_id=?", id)
