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

  async edit_aluno(event){

    event.preventDefault();
    const form = event.target;
    const aluno = {
      id: form.elements['id'].value,
      nome: form.elements['nome'].value,
      telefone: form.elements['telefone'].value,
      matricula: form.elements['matricula'].value
    }

    try{
      const response = await fetch(`${this.constructor.base_uri}/alunos/${aluno.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
      });
    
    
      if (!response.ok) {

        if (!response.status == 422) {
          const erros = await response.json();
          alert(JSON.stringify(erros));
          return;
        } 


        
      }
      this.ListarAlunos();
    }
       catch(error){
        console.error('Erro ao Alterar aluno');
      }

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
                                <button type="button" class="btn btn-warning" data-action="click->alunos#edit" data-aluno-id="${aluno.id}">Editar</button>
                                <button type="button" class="btn btn-danger" data-action="click->alunos#delete" data-aluno-id="${aluno.id}">Apagar</button>
                              </td> 
                           </tr>
                         `
                       }).join('')
                     }
                    </tbody>
                  </table>`
            }else{
              this.element.innerHTML = `
                  <button type="button" class="btn btn-primary" data-action="click->alunos#new">Cadastrar</button>
                  <div class="alert alert-warning" role="alert" style="margin-top: 10px">
                    Alunos não cadastrados!
                  </div>`
            }Nenhum 
        }else {
          throw new Error('Erro:' || response.status);
        }
     }catch(error){
        console.log('Erro ao buscar alunos');
     }

    
  } 

  async edit(event){
      const id = event.currentTarget.dataset.alunoId;


      try{
          const response = await fetch(`${this.constructor.base_uri}/alunos/${id}`);
          const aluno = await response.json();
          if (response.ok) {
                this.element.innerHTML = `

                    <form data-action= "submit->alunos#edit_aluno" style="display: flex; flex-direction: column; ">
                    <input type="hidden" name="id" value="${aluno.id}">
                <div class="form-group" style="margin-bottom: 10px">
                    <label for="nome">Nome</label>
                    <input type="text" class="form-control" value = "${aluno.nome}" required="true" name="nome" placeholder="Nome">
                </div>
                <div class="form-group" style="margin-bottom: 10px">
                    <label for="telefone">Telefone</label>    
                    <input type="text" class="form-control" value = "${aluno.telefone}" required="true" name="telefone" placeholder="Telefone">
                </div>
                <div class="form-group" style="margin-bottom: 10px">
                    <label for="matricula">Matricula</label>
                    <input type="text" class="form-control" value = "${aluno.matricula}" required="true" name="matricula" placeholder="Matricula">
                </div >    
                <button type="submit" style="margin-bottom: 10px" class="btn btn-primary">Alterar</button>
              </form>`

              }else{
                   this.element.innerHTML = `<div class="alert alert-danger" role="alert">
                    aluno alterado!
                  </div>`
                }


          
           }
      catch(error){
          console.error('Erro ao alterar aluno', error);
      }

       

    }

  async delete(event){
    const id = event.currentTarget.dataset.alunoId;
  
    if (confirm("Confirma exclusão?")){
      try{
      const response = await fetch(`${this.constructor.base_uri}/alunos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
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

  }

}

