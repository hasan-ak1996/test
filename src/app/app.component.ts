import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  registerForm!: FormGroup;
  toppings = '';


  items = [
    {id: 1, name: 'Python'},
    {id: 2, name: 'Node Js'},
    {id: 3, name: 'Java'},
    {id: 4, name: 'PHP', disabled: true},
    {id: 5, name: 'Django'},
    {id: 6, name: 'Angular'},
    {id: 7, name: 'Vue'},
    {id: 8, name: 'ReactJs'},
  ];
  selected = [
    {id: 2, name: 'Node Js'},
    {id: 8, name: 'ReactJs'}
  ];




  city = '';
  cities: Array<string> = [];
  selectedItem: Array<string> = [];
  dropdownSettings: any = {};
  closeDropdownSelection = false;
  disabled = false;


  options = [
    'One',
    'Two',
    'Three'
  ];

  filteredOptions: Observable<string[]> | undefined;

  constructor(

    private formBuilder : FormBuilder
    
  ) { 
      
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({

      'myControl' :new FormControl(''), 
    });

    this.filteredOptions = this.registerForm.get('myControl')?.valueChanges.pipe(
      startWith(''),
      map(val => val =="@" ? this.options: [])
    )

    this.cities = ['Mumbai', 'New Delhi', 'Bangaluru', 'Pune', 'Navsari'];
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSelection
    };
    this.selectedItem = ['Mumbai'];

  }
  
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 1);
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    console.log('selectedItem', this.selectedItem);
  }

  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { closeDropDownOnSelection: this.closeDropdownSelection });
  }

   handleReset() {
    this.selectedItem = [];
  }




}
