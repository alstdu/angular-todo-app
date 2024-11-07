import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ColorSchemeType = 'default' | 'protanopia' | 'deuteranopia' | 'tritanopia';

@Component({
  selector: 'app-color-scheme-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="color-scheme-toggle">
      <label for="colorScheme">Color Mode:</label>
      <select 
        id="colorScheme" 
        [(ngModel)]="selectedScheme"
        (ngModelChange)="onSchemeChange($event)">
        @for (scheme of schemes; track scheme) {
          <option [value]="scheme">{{ scheme }}</option>
        }
      </select>
    </div>
  `,
  styles: [`
.color-scheme-toggle
  position: absolute
  top: 20px
  right: 20px
  display: flex
  align-items: center
  gap: 8px
  background: white
  padding: 8px
  border-radius: 8px
  box-shadow: 0 2px 4px rgba(0,0,0,0.1)

select
  padding: 4px 8px
  border-radius: 4px
  border: 1px solid #ccc
  `]
})
export class ColorSchemeToggleComponent implements OnInit {
  schemes: ColorSchemeType[] = ['default', 'protanopia', 'deuteranopia', 'tritanopia'];
  selectedScheme: ColorSchemeType = 'default';

  ngOnInit() {
    // Load saved scheme from localStorage
    const savedScheme = localStorage.getItem('colorScheme') as ColorSchemeType;
    if (savedScheme && this.schemes.includes(savedScheme)) {
      this.selectedScheme = savedScheme;
      this.onSchemeChange(savedScheme);
    }
  }

  onSchemeChange(scheme: ColorSchemeType) {
    const root = document.documentElement;
    
    switch(scheme) {
      case 'protanopia':
        root.style.setProperty('--primary-color', '#0066CC');
        root.style.setProperty('--success-color', '#006699');
        root.style.setProperty('--warning-color', '#996600');
        root.style.setProperty('--danger-color', '#660033');
        break;
      case 'deuteranopia':
        root.style.setProperty('--primary-color', '#0052CC');
        root.style.setProperty('--success-color', '#005580');
        root.style.setProperty('--warning-color', '#805500');
        root.style.setProperty('--danger-color', '#800033');
        break;
      case 'tritanopia':
        root.style.setProperty('--primary-color', '#0066FF');
        root.style.setProperty('--success-color', '#006666');
        root.style.setProperty('--warning-color', '#666600');
        root.style.setProperty('--danger-color', '#660066');
        break;
      default:
        root.style.setProperty('--primary-color', '#0048a3');
        root.style.setProperty('--success-color', '#276749');
        root.style.setProperty('--warning-color', '#854d0e');
        root.style.setProperty('--danger-color', '#b91c1c');
    }
    
    // Save selected scheme to localStorage
    localStorage.setItem('colorScheme', scheme);
  }
}
