export function getErrorMessage(err: any):string{
    if ((err.error.message)) {
        return err.error.message;
      } else {
        return 'Ocorreu um erro desconhecido'
      }
}