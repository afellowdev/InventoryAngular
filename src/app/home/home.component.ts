import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let draggableItems = document.querySelectorAll('.draggable-list li');
        draggableItems.forEach(item => {
            item.addEventListener('dragstart', this.dragStart);
            item.addEventListener('dragenter', this.dragEnter);        
            item.addEventListener('drop', this.dragDrop);
            item.addEventListener('dragover', this.dragOver);
            item.addEventListener('dragleave', this.dragLeave);
        });
  }

  dragStart(ev:any) {
    document.getElementById('dragged')!.innerText = ev.toElement.id;
  }

  dragEnter(ev:any) {
    ev.target.classList.add('over');
  }

  dragLeave(ev:any) {
    ev.target.classList.remove('over');
  }

  dragOver(ev:any) {
    ev.preventDefault();
  }

  dragDrop(ev:any) {
    ev.target.classList.remove('over');          
    
    let source = document.getElementById('dragged')!.innerText;
    let target = ev.toElement.id;
    let match = false;

    switch (source) {
        case 'l1':
            match = (target === 'r1');
            break;
        case 'l2':
            match = (target === 'r2');
            break;
        case 'l3':
            match = (target === 'r3');
            break;
        case 'r1':
            match = (target === 'l1');
            break;
        case 'r2':
            match = (target === 'l2');
            break;
        case 'r3':
            match = (target === 'l3');
            break;
        default:
            break;
    }

    if (match) {
        document.getElementById(source)!.style.display = 'none';
        document.getElementById(target)!.style.display = 'none';

        let matchingCounter = +(document.getElementById('matched')!.innerText);
        //matchingCounter++;
        document.getElementById('matched')!.innerText = (++matchingCounter).toString();

        if (matchingCounter === 3) {
            document.getElementById('welcomeMessage')!.style.display = 'block'; 
        }
    }         
  } 

  playAgain() {
    document.getElementById('matched')!.innerText = "0";
    document.getElementById('welcomeMessage')!.style.display = 'none';

    let draggableItems = document.querySelectorAll('.draggable-list li');
    draggableItems.forEach(item => {
        document.getElementById(item.id)!.style.display = 'block';
    })
  }
}        