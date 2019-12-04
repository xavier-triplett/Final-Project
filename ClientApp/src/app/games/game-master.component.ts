import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/services/game.service';
import { Game } from '../../models/game.model';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { SearchOptions } from '../../models/searchOptions.model';

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.scss']
})
export class GameMasterComponent implements OnInit {
  @Input() title: string = "Games";
  
  public games: Game[] = [];
  public gamesToDelete: Game[] = [];

	public searchOptions = new SearchOptions();

  constructor(
	  private _data: GameService,
    private _toastr: ToastrService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.reload();
  }

  goToDetail(id: number) {
    this._router.navigateByUrl('games/item/' + id);
  }

  reload() {
    this.gamesToDelete = [];
    this.games = [];

    this._data.getGames().then(res => {
		  this.games = res;
	  },
		err => {
			this._toastr.error("Failed to get games. Reason: " + err.statusText);
		});
  }

  get deleteValid() {
    return this.gamesToDelete.length > 0;
  }
  
  containsGame(game: Game): boolean {
    return this.gamesToDelete.includes(game);
  }
  
  removeGame(game: Game) {
    this.gamesToDelete = this.gamesToDelete.filter(x => x.gameId != game.gameId);
  }

  deleteGames() {
    this.gamesToDelete.forEach(x => {
      this._data.deleteGame(x.gameId).then(res => {
		    this._toastr.success("Successfully deleted game.", "Success");
		    if (x.gameId == this.gamesToDelete[this.gamesToDelete.length - 1].gameId) this.reload();
      },
      err => {
        this._toastr.error("Failed to delete game. Reason: " + err.statusText, "Failure");
      });
    });
  }
}