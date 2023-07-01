# BOOK DATABASE
#### Video Demo:  <URL HERE>
#### Description:
It is a web app to manage the books that I have read. We can divide the app structure in two parts: Frontend and Backend.

On the one hand, the Frontend, allows the user to manage the database calling the Backend API using the `fetch()` method. The Frontend is built with *JavaScript* using the *React* Framework. *React* is designed to develop efficient and reusable user interfaces. All the components are stored in `/frontend/src/components/`, each component does just one thing; for example: `/frontend/src/components/BookForm.js` component renders a form for introducing a new book or for editing an existing book.



To expand the options that *React* offers I also used *React-Router*. It allows rendering *React* components according to the their URL route. Each one of these *Routes* are stored in `/frontend/src/pages/`,  and most of them are only the page title and render a component for doing something. In the following table you can see all the different routes and a short description of what they do.

| Path                   | File name translation | Description                                                  |
| ---------------------- | --------------------- | ------------------------------------------------------------ |
| 404.js                 | 404                   | To report an error                                           |
| Add-Book.js            | Add-book              | To add a book to the Database                                |
| Buscar.js              | Find                  | To find a book in the Database                               |
| Configuracion.js       | Settings              | To change the language of the app                            |
| Crear-Coleccion.js     | Create-Collection     | To create a collection                                       |
| Descargar.js           | Download              | To download a JSON file with all the books or the Database   |
| Editar-Coleccion.js    | Edit-Collection       | To modify a collection                                       |
| Editar.js              | Edit                  | To modify a book                                             |
| Main.js                | Main                  | To show stats about your reading process and some charts made with *D3* |
| Mostrar-Colecciones.js | Show-Collections      | To show all collections                                      |
| MostrarLibro.js        | ShowBook              | To show the data of a book in the database and some data fetched from *Google Books* |
| Tabla-Libros.js        | Table-Books           | To show a table with all the books                           |
| Ver-Coleccion.js       | See-collecion         | To show the books that are inside of an specific collection  |



In addition to this, the app uses the *React-Bootstrap* package for the user interface, and it also uses *React-i18next* for translating the app to Spanish and Valencian (a language spoken in the East coast of Spain)



On the other hand, the Backend is built in Python with the Flask framework. All the routes are defined in `/backend/app.py`.  `app.py` does mainly two things: firstly, when someone connects to the server, `app.py` sends the compiled Frontend; secondly, `app.py` acts like an API, because almost all the server routes interact with the Database; some of them modify the database according with the client orders (add a book, create a collection, etc.) and others send back information requested by the client (all the collections names, info of one specific book, etc.).



To store the data, I have set up a SQLite database. It is placed in `/backend/database.db/`  and it has three tables: Books, Collections and JoinCollections. Books table has six columns:  book ID, title, author, language, starting date  and the ending date; while Collections has three: collection ID, collection name and a hexadecimal color for representing the collection. Lastly, JoinCollections is a junction table that joins the book ID and the collection ID.

 To enable the connection between the Flask server and the SQLite Database I used SQLAlchemy. In  `/backend/models/models.py` we can find the Database Scheme.

Finally during the project development I have faced some difficult choices such as: *SASS* or *React-Bootstrap*, a SQL database or a non relational database. I also considered using *Node.JS* and *Express* for the backend since I am quite familiar with it, however I chose *Flask* to force myself to improve my *Python* skills.



As regards to the app hosting, I made a *Balena-Docker-File* to deploy the app in my *Raspberry Pi*.





