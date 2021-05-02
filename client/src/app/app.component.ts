import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Fighter } from './fighter';
import { FighterService } from './client.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fightclubapp';

  public fighters: Fighter[];
  public editFighter: Fighter;
  public deleteFighter: Fighter;

  constructor(private fighterService: FighterService) {
  }

  ngOnInit() {
    this.getFighters();
  }

  public getFighters(): void {

    this.fighterService.getFighters().subscribe(
      (response: Fighter[]) => {
          this.fighters = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddFighter(addForm: NgForm): void {
    document.getElementById('add-fighter-form').click();
    this.fighterService.addFighter(addForm.value).subscribe(
      (response: Fighter) => {
        console.log(response);
        this.getFighters();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateFighter(fighter: Fighter): void {
    this.fighterService.updateFighter(fighter).subscribe(
      (response: Fighter) => {
        console.log(response);
        this.getFighters();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteFighter(fighterId: number): void {
    this.fighterService.deleteFighter(fighterId).subscribe(
      (response: void) => {
        console.log(response);
        this.getFighters();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchFighters(key: string): void {
    console.log(key);
    const results: Fighter[] = [];
    for (const fighter of this.fighters) {
      if (fighter.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(fighter);
      }
    }
    this.fighters = results;
    if (results.length === 0 || !key) {
      this.getFighters();
    }
  }

  public onOpenModal(fighter: Fighter, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addFighterModal');
    }

    if (mode === 'edit') {
      this.editFighter = fighter;
      button.setAttribute('data-target', '#updateFighterModal');
    }

    if (mode === 'delete') {
      this.deleteFighter = fighter;
      button.setAttribute('data-target', '#deleteFighterModal');
    }

    container.appendChild(button);
    button.click();
  }

}
