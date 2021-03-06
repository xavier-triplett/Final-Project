import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/services/player.service';
import { Player } from 'src/models/player.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-master',
  templateUrl: './player-master.component.html',
  styleUrls: ['./player-master.component.scss']
})
export class PlayerMasterComponent implements OnInit {
  @Input() title: string = "Players";

	public players: Player[] = [];
	public playersToDelete: Player[] = [];

  constructor(
	  private _data: PlayerService,
	  private _toastr: ToastrService,
	  private _router: Router
  ) { }

  ngOnInit() {
    this.reload();
	}

	goToDetail(id: number) {
		this._router.navigateByUrl('players/item/' + id);
	}

	reload() {
		this.players = [];
		this.playersToDelete = [];

		this._data.getPlayers().then(res => {
			this.players = res;
		},
		err => {
			this._toastr.error("Failed to get players. Reason: " + err.statusText);
		});
	}

	get deleteValid() {
		return this.playersToDelete.length > 0;
	}

	containsPlayer(player: Player): boolean {
		return this.playersToDelete.includes(player);
	}

	removePlayer(player: Player) {
		this.playersToDelete = this.playersToDelete.filter(x => x.playerId != player.playerId);
	}

	deletePlayers() {
		this.playersToDelete.forEach(x => {
			this._data.deletePlayer(x.playerId).then(res => {
				this._toastr.success("Successfully deleted player.", "Success");
				if (x.playerId == this.playersToDelete[this.playersToDelete.length - 1].playerId) this.reload();
			},
			err => {
				this._toastr.error("Failed to delete player. Reason: " + err.statusText, "Failure");
			});
		});
	}


}
