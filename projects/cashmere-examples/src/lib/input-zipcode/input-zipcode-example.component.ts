import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'hc-input-zipcode-example',
  templateUrl: './input-zipcode-example.component.html',
  styleUrls: ['./input-zipcode-example.component.scss']
})
export class InputZipcodeExampleComponent {
    formDemoZip = new FormControl('', [Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/), Validators.required]);
    formDemoZipInitVal = new FormControl('840705313', [Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/), Validators.required]);
    formDemoZipFormattedInitVal = new FormControl('84070-5313', [Validators.pattern(/(^\d{5}$)|(^\d{5}-\d{4}$)/), Validators.required]);
}
