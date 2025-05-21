import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.ListarAlunos();
  }

  static base_uri = `http://localhost:3000`;

  asyc

  async create(event) {
    event.preventDefault();
    const form = event.target;
    const aluno = {
      nome: form.elements['nome'].value,
      telefone: form.elements['telefone'].value,
      matricula: form.elements['matricula'].value
    }
    try{
      const response = await fetch(`${this.constructor.base_uri}/alunos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
      });
    
    
      if (!response.ok) {

        if (response.status == 422) {
          const erros = await response.json();
          alert(JSON.stringify(erros));
          return;
        }

        throw new Error(`Erro ao cadastrar aluno': ${reponse.status}`);

        
      }
      this.ListarAlunos();
    }
       catch(error){
        console.error('Erro ao cadastrar aluno', error);
      }
  }

  new() {

      this.element.innerHTML = `
        <h1>Novo Aluno</h1>
          <form data-action= "submit->alunos#create" style="display: flex; flex-direction: column; ">
            <div class="form-group" style="margin-bottom: 10px">
                <label for="nome">Nome</label>
                <input type="text" class="form-control" required="true" name="nome" placeholder="Nome">
            </div>
            <div class="form-group" style="margin-bottom: 10px">
                <label for="telefone">Telefone</label>    
                <input type="text" class="form-control" required="true" name="telefone" placeholder="Telefone">
            </div>
            <div class="form-group" style="margin-bottom: 10px">
                <label for="matricula">Matricula</label>
                <input type="text" class="form-control" required="true" name="matricula" placeholder="Matricula">
            </div >    
            <button type="submit" style="margin-bottom: 10px" class="btn btn-primary">Cadastrar</button>
            <button type="button" data-action="click->alunos#ListarAlunos" class="btn btn-danger">Cancelar</button>
          </form>
          `



  }

  async ListarAlunos(){

     try{
        const response = await fetch(`${this.constructor.base_uri}/alunos`);
        if (response.ok) {
          const alunos = await response.json();

            if (alunos.length > 0) {
              this.element.innerHTML = `
                  <button type="button" class="btn btn-primary" data-action="click->alunos#new">Cadastrar</button>
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
                                <button type="button" class="btn btn-warning" data-action="click->alunos#edit">Editar</button>
                                <button type="button" class="btn btn-danger" data-action="click->alunos#delete">Apagar</button>
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

