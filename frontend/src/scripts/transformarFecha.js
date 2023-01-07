function transformarFecha(str) {

    if (typeof str === 'string' && str !== '') {
        return str.split('-').reverse().join('-') || '';
    }
    return '-';
}

export default transformarFecha;