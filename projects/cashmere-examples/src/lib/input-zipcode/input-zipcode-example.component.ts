import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'hc-input-zipcode-example',
  templateUrl: './input-zipcode-example.component.html',
  styleUrls: ['./input-zipcode-example.component.scss']
})
export class InputZipcodeExampleComponent {

    formDemoZip = new FormControl('', [Validators.required]);
    formDemoZipInitVal = new FormControl('840705313', [Validators.required]);
    formDemoZipFormattedInitVal = new FormControl('84070-5313', [Validators.required]);

}
