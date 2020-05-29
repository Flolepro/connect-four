import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Round } from 'src/app/models/round';
import { RemoveRound, AddRound, UpdateRound, ClearRound } from '../actions/round.ations';
import { patch, updateItem } from '@ngxs/store/operators';

//State model class
export class RoundStateModel {
    rounds: Round[];
}

//State model decorator
@State<RoundStateModel>({
    name: 'rounds',
    defaults: {
      rounds: []
    }
})

//The RoundState class for actions
export class RoundState {

  @Selector()
  static getRounds(state: RoundStateModel) {
      return state.rounds
  }

  //Add a new round
  @Action(AddRound)
  add({getState, patchState }: StateContext<RoundStateModel>, { payload }:AddRound) {
      const state = getState();
      patchState({
        rounds: [...state.rounds, payload]
      })
  }

  //Remove a new round
  @Action(RemoveRound)
  remove({getState, patchState }: StateContext<RoundStateModel>, { payload }:RemoveRound) {
      patchState({
          rounds: getState().rounds.filter(a => a.id != payload.id)
      })
  }

  //Update a round
  @Action(UpdateRound)
  update(ctx: StateContext<RoundStateModel>, { payload }:RemoveRound) {
    ctx.setState(
      patch({
        rounds: updateItem(item=> item.id === payload.id, patch(payload))
      })
    );
  }

  //Update a round
  @Action(ClearRound)
  clear(ctx: StateContext<RoundStateModel>, { }:ClearRound) {
    ctx.setState(
      patch({
        rounds: new Array()
      })
    );
  }

}
