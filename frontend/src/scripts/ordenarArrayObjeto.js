// Función para ordenar alfabéticamente un arra

function ordenarArrayObjeto(arr, prop) {

    arr.sort((a, b) => {
        if (a[prop] > b[prop])
            return 1
        else if (a[prop] < b[prop])
            return -1
        else
            return 0;

    });
}

export default ordenarArrayObjeto;