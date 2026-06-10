(() => {
  'use strict'

  // Seleccionamos todos los formularios con validación personalizada
  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    
    // ----------------------------------------------------------------
    // OBJETIVO 1: Validación en tiempo real (campo por campo)
    // ----------------------------------------------------------------
    // Seleccionamos todos los campos dentro de este formulario
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Escuchamos cada vez que el usuario escribe o cambia el valor
      input.addEventListener('input', () => {
        // Evaluamos solo el campo actual
        if (input.checkValidity()) {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        } else {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
        }
      });
    });

    // ----------------------------------------------------------------
    // OBJETIVO 2: Envío del formulario y generación de JSON
    // ----------------------------------------------------------------
    form.addEventListener('submit', event => {
      // Detenemos la recarga de la página SIEMPRE, para controlar el envío con JS
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        // Si hay errores, mostramos las alertas de Bootstrap
        form.classList.add('was-validated');
      } else {

        // Si todo es válido, procedemos a crear el JSON
      
        // 1. Obtenemos los valores usando document.getElementById()
        const nombre = document.getElementById('form-nombre').value.trim();
        const precio = document.getElementById('form-precio').value;
        const categoria = document.getElementById('form-categoria').value;
        const subcategoria = document.getElementById('form-subcategoria').value;
        const descripcion = document.getElementById('form-descripcion').value;
        /*const tallaXs = document.getElementById('form-xs').value;
        const tallaS = document.getElementById('form-s').value;
        const tallaM = document.getElementById('form-m').value;
        const tallaL = document.getElementById('form-l').value;
        const tallaXl = document.getElementById('form-xl').value;*/

        // 2. Generamos las rutas de las imágenes
        const img1 = document.getElementById('imagen-1');
        const img2 = document.getElementById('imagen-2');
        const img3 = document.getElementById('imagen-3');

        // Función para extraer el nombre del archivo y construir la ruta solicitada
        const obtenerRutaImagen = (input, numeroImagen) => {
          if (input.files && input.files[0]) {
            const nombreCompleto = input.files[0].name.trim(); 
            
            // Encontramos la posición del último punto en el nombre del archivo
            const ultimoPunto = nombreCompleto.lastIndexOf('.');
            
            // Extraemos el nombre base y la extensión por separado
            const nombreArchivo = nombreCompleto.substring(0, ultimoPunto);
            const extension = nombreCompleto.substring(ultimoPunto + 1);
            
            // Retornamos la ruta con la estructura solicitada
            return `/${categoria}/${subcategoria}/${nombreArchivo}-${numeroImagen}.${extension}`;
          }
          return null;
        };

        // 3. Construimos el objeto product
        const producto = {
          nombreProducto: nombre,
          descripcion: descripcion,
          precio: parseFloat(precio),
          idCategoria: {
            idCategory: parseInt(categoria)
          },
          idSubCategoria: {
            idSubcategory: parseInt(subcategoria)
          },
          /*tallaXs: tallaXs,
          tallaS: tallaS,
          tallaM: tallaM,
          tallaL: tallaL,
          tallaXl: tallaXl,*/
          imagen1: obtenerRutaImagen(img1, 1),
          imagen2: obtenerRutaImagen(img2, 2),
          imagen3: obtenerRutaImagen(img3, 3),
        };

        console.log(producto);

        console.log(JSON.stringify(producto, null, 2));
        // 4. Convertimos a JSON y mostramos en consola
        const jsonFinal = JSON.stringify(producto, null, 2);
        console.log("Datos listos para enviar a la base de datos:");
        console.log(jsonFinal);
        // console.log(img1.files);
        fetch("http://localhost:8080/api/productos/post/nuevo-producto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Error al crear producto");
            }

            return response.json();
        })
        .then(data => {
            alert("Producto creado correctamente");
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });

        // (Aquí es donde más adelante agregarías el código para mandar el JSON a tu servidor)
      }
    }, false)
  })
})()