# elimna de colecciones
def eliminar_de_colecciones(connection, cursor, id):
    print(id)
    cursor.execute("DELETE FROM joincolecciones WHERE libro_id=?", (id,))
    connection.commit()
