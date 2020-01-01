export interface CarroMarcaModelo {
    marca: string,
    marca_id: number,
    modelo: string,
    modelo_id: number,
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

