import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.ListarAlunos();
  }

  static base_uri = `http://localhost:3000`;

  async ListarAlunos(){

     try{
        const response = await fetch(`${this.constructor.base_uri}/alunos`);
        if (response.ok) {
          const alunos = await response.json();

            if (alunos.length > 0) {
              this.element.innerHTML = `
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Matricula</th>
                      </tr>
                    </thead>
                    <tbody>
                     ${
                       alunos.map(aluno => {
                         return `
                           <tr>
                             <th scope="row">${aluno.id}</th>
                             <td>${aluno.nome}</td>
                             <td>${aluno.telefone}</td>
                             <td>${aluno.matricula}</td>
                             <td style="width: 200px">
                                <button type="button" class="btn btn-warning">Editar</button>
                                <button type="button" class="btn btn-danger">Apagar</button>
                              </td> 
                           </tr>
                         `
                       }).join('')
                     }
                    </tbody>
                  </table>`
            }else{
              this.element.innerHTML = `
                  <div class="alert alert-danger" role="alert">
                    aluno cadastrado!
                  </div>`
            }Nenhum 
          console.log(alunos);
        }else {
          throw new Error('Erro:' || response.status);
        }
     }catch{
        console.log('Erro ao buscar alunos', error);
     }

    
  } 

}

