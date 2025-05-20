import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.ListarAlunos();
  }

  ListarAlunos(){
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
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td style= "width: 200px">
                <button type="button" class="btn btn-warning">Editar</button>
                <button type="button" class="btn btn-danger">Apagar</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    `
  } 

}
