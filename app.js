/*(2)*/class Despesa{
    constructor(mes, dia, desc, valor){
        this.mes = mes
        this.dia = dia
        this.desc = desc
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
           if (this[i] == undefined || this[i] == '' || this[i] == null) {
            return false
           }
        }
        return true
    }
}

/*(4)*/class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
                                    //getItem = recuperar dado em localStorage
        return parseInt(proximoId) + 1
    }
    //stringify transoforma o objeto literal em notação JSON, parse reverte
/*(3)*/ gravar(d){
        
            let id = this.getProximoId()
            localStorage.setItem('id', id)

             localStorage.setItem(id, JSON.stringify(d))
                    //setItem = inserir dado em localStorage
        }
        recuperarTodosRegistros(){
            //array despesas
            let despesas = Array()
            let id = localStorage.getItem('id')
            //recuperar todas despesas cadastradas
            for(let i = 1; i <= id; i++){
                //recuperar a despesa
                let despesa = JSON.parse(localStorage.getItem(i))
                //exite a possibilidade de haver indices removidos
                if (despesa == null) {
                    continue
                }
                despesas.push(despesa)
            }
            return despesas
        }
}

let bd = new Bd()


  /*(1)*/  function cadastrarDespesa(){
    let mes = document.querySelector('#mes')
    let dia = document.querySelector('#dia')
    let desc = document.querySelector('#desc')
    let valor = document.querySelector('#valor')

    let despesa = new Despesa(
    mes.value,
    dia.value,
    desc.value,
    valor.value
    )

    //validação de dados
    if(despesa.validarDados()){
        bd.gravar(despesa)
        alert('Despesa cadastrada com sucesso')
        
    } else{
        alert('ERRO: Dados inválidos\nPreencha os dados corretamente')
    }
}

function carregaListaDespesas(){
    let data = new Date()
    let despesas = Array()
    let dia = data.getDay()
    despesas = bd.recuperarTodosRegistros()

    document.querySelector('#dom').style.height = despesas[0].valor + 'px'
    document.querySelector('#seg').style.height = despesas[1].valor + 'px'
    document.querySelector('#ter').style.height = despesas[2].valor + 'px'
    document.querySelector('#qua').style.height = despesas[3].valor + 'px'
    document.querySelector('#qui').style.height = despesas[4].valor + 'px'
    document.querySelector('#sex').style.height = despesas[5].valor + 'px'
    document.querySelector('#sab').style.height = despesas[6].valor + 'px'

    document.querySelector('#ndom').innerHTML = 'R$' + despesas[0].valor + '.00'
    document.querySelector('#nseg').innerHTML = 'R$' + despesas[1].valor + '.00'
    document.querySelector('#nter').innerHTML = 'R$' + despesas[2].valor + '.00'
    document.querySelector('#nqua').innerHTML = 'R$' + despesas[3].valor + '.00'
    document.querySelector('#nqui').innerHTML = 'R$' + despesas[4].valor + '.00'
    document.querySelector('#nsex').innerHTML = 'R$' + despesas[5].valor + '.00'
    document.querySelector('#nsab').innerHTML = 'R$' + despesas[6].valor + '.00'

    document.querySelector('#number').innerHTML = `R$ ${Number(despesas[0].valor) + Number(despesas[1].valor) + Number(despesas[2].valor) + Number(despesas[3].valor) + Number(despesas[4].valor) + Number(despesas[5].valor) + Number(despesas[6].valor)}`

    console.log(despesas)
    console.log(typeof(Number(despesas[0].valor)))
    console.log( despesas[2].dia)
    console.log(data.getDate())
}

