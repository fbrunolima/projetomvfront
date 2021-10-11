import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

export default class LancamentoService extends ApiService {

    constructor(){
        super('/api/lancamentos')
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
}