export class Service {

    handleError(error: any) {
        // Puedes agregar más lógica aquí para manejar diferentes tipos de errores
        // Por ejemplo, errores de red, errores de respuesta HTTP, etc.
        if (error.response) {
          // La solicitud fue hecha y el servidor respondió con un estado de error
          throw new Error(error.response.data.message || 'Error de servidor');
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          throw new Error('No se pudo obtener una respuesta del servidor');
        } else {
          // Algo más causó un error
          throw new Error('Error al realizar la solicitud');
        }
      }
}