import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemperaturaService } from 'src/app/services/temperatura.service';
import { UtilService } from 'src/app/services/validations/util.service';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.css']
})
export class TiempoComponent {

  formulario!: FormGroup;
  showError: boolean = false;
  mensajeError: string = "";



  constructor(private fb: FormBuilder, private _util: UtilService,
              private _tiempo: TemperaturaService ){
    this.iniciaFormulario();
  }

  /**
   * metodo que inicia y crea un formulario
   */
  iniciaFormulario(){

    this.formulario = this.fb.group({
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]]
    })

  }

  consultar(){
    console.log("formulario: ", this.formulario);

    this._tiempo.getEstadoTiempo(this.formulario.get('latitud')?.value, this.formulario.get('longitud')?.value)
          .subscribe( (respuesta: any) => {
            console.log("respuesta: ", respuesta);
            let file = new Blob([respuesta], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            let fileUrl = URL.createObjectURL(file);
            var anchor = document.createElement("a");
            anchor.download = "details.csv";
            anchor.href = fileUrl;
            anchor.click();
          },
          (error:any) =>{
            this.showError = true;
            this.mensajeError = "Error checking weather";
          })
  }

}
