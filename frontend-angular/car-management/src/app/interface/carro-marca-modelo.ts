export interface CarroMarcaModelo {
    marca: string,
    id_marca: number,
    modelo: string,
    id_modelo: number,
    requests: {
        marca: {
            method: string,
            url: string
        },
        modelo: {
            method: string,
            url: string
        }
    }
}

