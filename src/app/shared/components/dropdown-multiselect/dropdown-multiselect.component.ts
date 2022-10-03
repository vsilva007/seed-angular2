import {
  NgModule,
  Component,
  Pipe,
  OnInit,
  DoCheck,
  HostListener,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  forwardRef,
  IterableDiffers,
  PipeTransform
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor, Validator, AbstractControl } from '@angular/forms';

const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiselectDropdown),
  multi: true
};

export interface IMultiSelectOption {
  id: any;
  name: string;
  isLabel?: boolean;
  parentId?: any;
  checked?: boolean;
}

export interface IMultiSelectSettings {
  pullRight?: boolean;
  enableSearch?: boolean;
  checkedStyle?: 'checkboxes' | 'glyphicon' | 'fontawesome';
  buttonClasses?: string;
  selectionLimit?: number;
  closeOnSelect?: boolean;
  autoUnselect?: boolean;
  showCheckAll?: boolean;
  showUncheckAll?: boolean;
  dynamicTitleMaxItems?: number;
  maxHeight?: string;
  displayAllSelectedText?: boolean;
}

export interface IMultiSelectTexts {
  checkAll?: string;
  uncheckAll?: string;
  checked?: string;
  checkedPlural?: string;
  searchPlaceholder?: string;
  defaultTitle?: string;
  allSelected?: string;
}

@Pipe({
  name: 'searchFilter'
})
export class MultiSelectSearchFilter implements PipeTransform {
  transform(options: Array<IMultiSelectOption>, args: string): Array<IMultiSelectOption> {
    const matchPredicate = (option: IMultiSelectOption) => option.name.toLowerCase().indexOf((args || '').toLowerCase()) > -1,
      getChildren = (option: IMultiSelectOption) => options.filter(child => child.parentId === option.id),
      getParent = (option: IMultiSelectOption) => options.find(parent => option.parentId === parent.id);
    return options.filter((option: IMultiSelectOption) => {
      return matchPredicate(option) ||
        (typeof (option.parentId) === 'undefined' && getChildren(option).some(matchPredicate)) ||
        (typeof (option.parentId) !== 'undefined' && matchPredicate(getParent(option)));
    });
  }
}

@Component({
  selector: 'custom-multiselect-dropdown',
  providers: [MULTISELECT_VALUE_ACCESSOR],
  templateUrl: 'dropdown-multiselect.component.html',
  styleUrls: ['dropdown-multiselect.component.scss'],
})
export class MultiselectDropdown implements OnInit, DoCheck, ControlValueAccessor, Validator {
  @Input() options: Array<IMultiSelectOption>;
  @Input() settings: IMultiSelectSettings;
  @Input() texts: IMultiSelectTexts;
  @Output() selectionLimitReached = new EventEmitter();
  @Output() dropdownClosed = new EventEmitter();
  @Output() onAdded = new EventEmitter();
  @Output() onRemoved = new EventEmitter();

  @HostListener('document: click', ['$event.target'])
  onClick(target: HTMLElement) {
    let parentFound = false;
    while (target != null && !parentFound) {
      if (target === this.element.nativeElement) {
        parentFound = true;
      }
      target = target.parentElement;
    }
    if (!parentFound) {
      this.isVisible = false;
      this.dropdownClosed.emit();
    }
  }

  model: number[];
  title: string;
  differ: any;
  numSelected: number = 0;
  isVisible: boolean = false;
  searchFilterText: string = '';
  defaultSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default btn-secondary',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };
  defaultTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };

  constructor(private element: ElementRef,
              differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
  }

  ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
    this.texts = Object.assign(this.defaultTexts, this.texts);
    this.title = this.texts.defaultTitle || '';
    this.model = [];
  }

  onModelChange: Function = (_: any) => { };
  onModelTouched: Function = () => { };

  writeValue(value: any): void {
    if (value !== undefined) {
      this.model = value;
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  ngDoCheck() {
    const changes = this.differ.diff(this.model);
    if (changes) {
      this.updateNumSelected();
      this.updateTitle();
    }
  }

  validate(c: AbstractControl): { [key: string]: any; } {
    return (this.model && this.model.length) ? null : {
      required: {
        valid: false,
      },
    };
  }

  registerOnValidatorChange(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

  clearSearch(event: Event) {
    event.stopPropagation();
    this.searchFilterText = '';
  }

  toggleDropdown() {
    this.isVisible = !this.isVisible;
    if (!this.isVisible) {
      this.dropdownClosed.emit();
    }
  }

  isSelected(option: IMultiSelectOption): boolean {
    return this.model && this.model.indexOf(option.id) > -1;
  }

  setSelected(event: Event, option: IMultiSelectOption) {
    if (!this.model) {
      this.model = [];
    }
    const index = this.model.indexOf(option.id);
    if (index > -1) {
      this.model.splice(index, 1);
      this.onRemoved.emit(option.id);
    } else {
      if (this.settings.selectionLimit === 0 || (this.settings.selectionLimit && this.model.length < this.settings.selectionLimit)) {
        this.model.push(option.id);
        this.onAdded.emit(option.id);
      } else {
        if (this.settings.autoUnselect) {
          this.model.push(option.id);
          this.onAdded.emit(option.id);
          const removedOption = this.model.shift();
          this.onRemoved.emit(removedOption);
        } else {
          this.selectionLimitReached.emit(this.model.length);
          return;
        }
      }
    }
    if (this.settings.closeOnSelect) {
      this.toggleDropdown();
    }
    this.onModelChange(this.model);
    this.onModelTouched();
  }

  updateNumSelected() {
    this.numSelected = this.model && this.model.length || 0;
  }

  updateTitle() {
    if (this.numSelected === 0) {
      this.title = this.texts.defaultTitle || '';
    } else if (this.settings.dynamicTitleMaxItems && this.settings.dynamicTitleMaxItems >= this.numSelected) {
      this.title = this.options
        .filter((option: IMultiSelectOption) =>
          this.model && this.model.indexOf(option.id) > -1
        )
        .map((option: IMultiSelectOption) => option.name)
        .join(', ');
    } else if (this.settings.displayAllSelectedText && this.model.length === this.options.length) {
      this.title = this.texts.allSelected || '';
    } else {
      this.title = this.numSelected
        + ' '
        + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
    }
  }

  checkAll() {
    if (!this.model) {
      this.model = [];
    }
    let selectableOptions = this.options.filter((item) => (!item.isLabel));
    this.model = selectableOptions
      .map((option: IMultiSelectOption) => {
        if (this.model.indexOf(option.id) === -1) {
          this.onAdded.emit(option.id);
        }
        if(!option.isLabel){
          return option.id;
        }
      });
    this.onModelChange(this.model);
    this.onModelTouched();
  }

  setSelectedParent(event: Event, option: IMultiSelectOption) {
    this.checkAllChildTabs(option);
  }

  checkAllChildTabs(option: IMultiSelectOption) {
    option.checked = !option.checked;
    let childrenOptions: IMultiSelectOption[] = this.options.filter((item) => (item.parentId) ? item.parentId === option.id : false);
    childrenOptions.forEach((item: IMultiSelectOption) => this.setSelectedChild(null, item, option.checked))
  }

  setSelectedChild(event: Event, option: IMultiSelectOption, checked: boolean) {
    if (!this.model) {
      this.model = [];
    }
    const index = this.model.indexOf(option.id);
    if(checked){
      if(index > -1){
        //pass
      }else{
        if (this.settings.selectionLimit === 0 || (this.settings.selectionLimit && this.model.length < this.settings.selectionLimit)) {
          this.model.push(option.id);
          this.onAdded.emit(option.id);
        } else {
          if (this.settings.autoUnselect) {
            this.model.push(option.id);
            this.onAdded.emit(option.id);
            const removedOption = this.model.shift();
            this.onRemoved.emit(removedOption);
          } else {
            this.selectionLimitReached.emit(this.model.length);
            return;
          }
        }
      }
    }else{
      if(index > -1){
        this.model.splice(index, 1);
        this.onRemoved.emit(option.id);
      }else{
        // pass
      }
    }
    if (this.settings.closeOnSelect) {
      this.toggleDropdown();
    }
    this.onModelChange(this.model);
    this.onModelTouched();
  }

  uncheckAll() {
    if(!this.model){
      this.model = [];
    }
    this.model.forEach((id: number) => this.onRemoved.emit(id));
    this.model = [];
    this.onModelChange(this.model);
    this.onModelTouched();
  }

  preventCheckboxCheck(event: Event, option: IMultiSelectOption) {
    if (this.settings.selectionLimit &&
      this.model.length >= this.settings.selectionLimit &&
      this.model.indexOf(option.id) === -1
    ) {
      event.preventDefault();
    }
  }

  // ngOnChanges(changes: {[ propName: string]: SimpleChange}){
  //   let optionsChange: IMultiSelectOption[] = changes['options'].currentValue;
  //   if(optionsChange){
  //
  //   }
  // }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [MultiselectDropdown],
  declarations: [MultiselectDropdown, MultiSelectSearchFilter],
})
export class MultiselectDropdownModule { }
