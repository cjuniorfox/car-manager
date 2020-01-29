export function handleSubmitError(err: any):string {
    if (typeof (err.error.message) == 'string') {
        return err.error.message;
    } else {
        console.error(err);
        return 'Ocorreu um erro desconhecido ao tentar atualizar o registro.';
    }
}