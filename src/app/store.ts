import type { Action, PayloadAction, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { ActionChooseUnit, ActionItem, ActionSetAnimationState, ActionTrait, AnimationState, Match, StatusEffect, StatusEffectType, Trait, Unit, enemy_unit_pool, item_pool, unit_pool } from "../pages/game"
import { stat } from "fs";
import { Status } from "viem";
import { switchAccount } from "wagmi/actions";
import { useAppDispatch } from "./hook";
//import { matchReducer } from "../App"
// import { counterSlice } from "../features/counter/counterSlice"
// import { quotesApiSlice } from "../features/quotes/quotesApiSlice"
//
// // `combineSlices` automatically combines the reducers using
// // their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// const rootReducer = combineSlices(counterSlice, quotesApiSlice)
// // Infer the `RootState` type from the root reducer
// export type RootState = ReturnType<typeof rootReducer>
//
// // The store setup is wrapped in `makeStore` to allow reuse
// // when setting up tests that need the same store config
// export const makeStore = (preloadedState?: Partial<RootState>) => {
//   const store = configureStore({
//     reducer: rootReducer,
//     // Adding the api middleware enables caching, invalidation, polling,
//     // and other useful features of `rtk-query`.
//     middleware: getDefaultMiddleware => {
//       return getDefaultMiddleware().concat(quotesApiSlice.middleware)
//     },
//     preloadedState,
//   })
//   // configure listeners using the provided defaults
//   // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
//   setupListeners(store.dispatch)
//   return store
// }
//
// export const store = makeStore()
//
// // Infer the type of `store`
// export type AppStore = typeof store
// // Infer the `AppDispatch` type from the store itself
// export type AppDispatch = AppStore["dispatch"]
// export type AppThunk<ThunkReturnType = void> = ThunkAction<
//   ThunkReturnType,
//   RootState,
//   unknown,
//   Action
// >

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initialState: Match = {
  players: [
    {
      id: 0,
      name: "JohnBot",
      units: enemy_unit_pool,
      items: [],
    },
    {
      id: 1,
      name: "Player",
      units: unit_pool,
      items: item_pool,
    }
  ],
  turnOrder: [
    [1, 0],
    [0, 0],
    [1, 1],
    [0, 1],
    [1, 2],
    [0, 2],
    [1, 3],
    //[0, 3],
  ],
  turn: 0,
  initPlayerUnitPool: unit_pool,
  end: false,
  winner: 0,
}

const delay = ms => new Promise(res => setTimeout(res, ms));
export const setAnimationStateThunk = createAsyncThunk(
  'Match/setAnimationState',
  async function(actionAnimationState: ActionSetAnimationState, thunkAPI) {
    thunkAPI.dispatch(setAnimationState(actionAnimationState))
    await delay(3000)
    thunkAPI.dispatch(setAnimationState({ state: "", ...actionAnimationState }))
    return actionAnimationState
  }
)
const matchSlice = createSlice({
  name: 'Match',
  initialState,
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(setAnimationStateThunk.fulfilled, (state, payload) => {
      const player = state.players[payload.payload.player_id]
      const unit = player.units[payload.payload.unit_id]
      unit.animationState = { type: "None" }
    })
  },
  reducers: {
    setAnimationState: (state, payload: PayloadAction<ActionSetAnimationState>) => {
      const player = state.players[payload.payload.player_id]
      const unit = player.units[payload.payload.unit_id]
      unit.animationState = payload.payload.state
      // setTimeout((unit) => {
      //   unit.animationState = ""
      // }, 3000)
    },
    chooseUnit: (state, payload: PayloadAction<ActionChooseUnit>) => {
      state.players[1].units = payload.payload
      state.turnOrder[0][1] = state.players[1].units[0].id
      state.turnOrder[2][1] = state.players[1].units[1].id
      state.turnOrder[4][1] = state.players[1].units[2].id
      state.turnOrder[6][1] = state.players[1].units[3].id
    },
    useTrait: (state, payload: PayloadAction<ActionTrait>) => {
      //if have mana
      const player = state.players[payload.payload.player_id]
      const unit = player.units[payload.payload.unit_id]
      const trait = unit.traits[payload.payload.trait_id]
      if (trait.condition.type == "Activation" && unit.mana >= trait.condition.cost) {
        // let target_player = null
        // let target_unit = null
        // switch (trait.target.type) {
        //   case "Self":
        //     target_player = player
        //     target_unit = unit
        //     break
        //   case "All": break
        //   case "Aliade": break
        //   case "Enemy": break
        //   case "Random": break
        //   default: break
        // }
        //
        const target_player = state.players[payload.payload.player_id == 0 ? 1 : 0]
        switch (trait.effect.type) {
          case 'Attack': {
            const target_unit = target_player.units[payload.payload.targets]
            let attack = randomInteger(trait.effect.min, trait.effect.max)
            let have_resist = false
            for (let j = 0; j < target_unit.traits.length; j++) {
              const target_trait = target_unit.traits[j]
              if ("Resist" == target_trait.effect.type) {
                if (trait.effect.color.type == target_trait.effect.color.type) {
                  have_resist = true
                  const resist = randomInteger(target_trait.effect.min, target_trait.effect.max)
                  if (resist < attack) {
                    attack = resist - attack
                  } else { attack = 0 }
                }
              }
            }
            target_unit.healty -= attack
            unit.mana -= trait.condition.cost
            matchSlice.caseReducers.setAnimationState(state, {
              type: "setAnimationState",
              payload: {
                player_id: target_player.id, unit_id: target_unit.id, state: { type: "TakeDamage", damge: attack, trait: trait }
              }
            })

            // setTimeout(() => {
            // }, 1000)
            // matchSlice.caseReducers.setAnimationState(state, {
            //   type: "setAnimationState",
            //   payload: { player_id: player.id, unit_id: unit.id, state: "" }
            // })
            //target_unit.animationState = "TakeDamage"
            break
          }
          case 'Resist': { break }
          case 'Heal': {
            const target_unit = target_player.units[payload.payload.targets]
            //add mana consuming
            const heal = randomInteger(trait.effect.min, trait.effect.max)
            target_unit.healty += heal
            matchSlice.caseReducers.setAnimationState(state, {
              type: "setAnimationState",
              payload: {
                //add heal animation
                player_id: 1, unit_id: target_unit.id, state: { type: "TakeDamage", damge: heal, trait: trait }
              }
            })
            break
          }
          case 'Vampirism': {
            const target_unit = target_player.units[payload.payload.targets]
            let attack = randomInteger(trait.effect.min, trait.effect.max)
            target_unit.healty -= attack
            unit.healty += attack
            matchSlice.caseReducers.setAnimationState(state, {
              type: "setAnimationState",
              payload: {
                player_id: target_player.id, unit_id: target_unit.id, state: { type: "TakeDamage", damge: attack, trait: trait }
              }
            })
            break
          }
          case 'Bleeding': {
            const target_unit = target_player.units[payload.payload.targets]
            const eff: StatusEffect = {
              name: "Bleeding", duration: 3, type: { type: "Bleeding" }
            }
            target_unit.status.push(eff)
            matchSlice.caseReducers.setAnimationState(state, {
              type: "setAnimationState",
              payload: {
                player_id: target_player.id, unit_id: target_unit.id, state: { type: "TakeDamage", damge: 1, trait: trait }
              }
            })
            break
          }
          case 'Poison': {
            const target_unit = target_player.units[payload.payload.targets]
            const eff: StatusEffect = {
              name: "Poison", duration: 3, type: { type: "Poisoned" }
            }
            target_unit.status.push(eff)
            matchSlice.caseReducers.setAnimationState(state, {
              type: "setAnimationState",
              payload: {
                player_id: target_player.id, unit_id: target_unit.id, state: { type: "TakeDamage", damge: 1, trait: trait }
              }
            })
            break
          }
          case 'Stun': {
            const target_unit = target_player.units[payload.payload.targets]
            const eff: StatusEffect = {
              name: "Stun", duration: 1, type: { type: "Stun" }
            }
            target_unit.status.push(eff)
            matchSlice.caseReducers.setAnimationState(state, {
              type: "setAnimationState",
              payload: {
                player_id: target_player.id, unit_id: target_unit.id, state: { type: "TakeDamage", damge: 1, trait: trait }
              }
            })
            break
          }
          default: break

        }

      }
      //check win
      if (state.players[1].units.filter((u) => u.healty > 0).length <= 0) {
        state.end = true
        state.winner = 1
      }
      if (state.players[0].units.filter((u) => u.healty > 0).length <= 0) {
        state.end = true
        state.winner = 0
      }
      //endTurn
      matchSlice.caseReducers.endTurn(state)
    },
    useItem: (state, payload: PayloadAction<ActionItem>) => {
      ////if have count use
      //const player = state.players[payload.payload.player_id]
      const player = state.players[1]
      const item = player.items[payload.payload.item_id]
      //if (trait.condition.type == "Activation" && unit.mana >= trait.condition.cost) {
      //}

      const target_player = state.players[payload.payload.player_id == 0 ? 1 : 0]
      switch (item.effect.type) {
        case 'Attack': {
          const target_unit = target_player.units[payload.payload.targets]
          let attack = randomInteger(item.effect.min, item.effect.max)
          let have_resist = false
          for (let j = 0; j < target_unit.traits.length; j++) {
            const target_trait = target_unit.traits[j]
            if ("Resist" == target_trait.effect.type) {
              if (item.effect.color.type == target_trait.effect.color.type) {
                have_resist = true
                const resist = randomInteger(target_trait.effect.min, target_trait.effect.max)
                if (resist < attack) {
                  attack = resist - attack
                } else { attack = 0 }
              }
            }
          }
          target_unit.healty -= attack
          //unit.mana -= item.condition.cost
          matchSlice.caseReducers.setAnimationState(state, {
            type: "setAnimationState",
            payload: {
              player_id: target_player.id, unit_id: target_unit.id, state: { type: "TakeDamage", damge: attack, trait: item as Trait }
            }
          })

          // setTimeout(() => {
          // }, 1000)
          // matchSlice.caseReducers.setAnimationState(state, {
          //   type: "setAnimationState",
          //   payload: { player_id: player.id, unit_id: unit.id, state: "" }
          // })
          //target_unit.animationState = "TakeDamage"
          break
        }
        case 'Heal': {
          const target_unit = state.players[1].units[payload.payload.targets]
          //const item = state.players[0].items[1]
          const heal = randomInteger(item.effect.min, item.effect.max)
          target_unit.healty += heal
          //add mana consuming
          matchSlice.caseReducers.setAnimationState(state, {
            type: "setAnimationState",
            payload: {
              //add heal animation
              player_id: 1, unit_id: target_unit.id, state: { type: "TakeDamage", damge: heal, trait: item as Trait }
            }
          })
          break
        }
      }
      //check win
      if (state.players[1].units.filter((u) => u.healty > 0).length <= 0) {
        state.end = true
        state.winner = 0
      }
      if (state.players[0].units.filter((u) => u.healty > 0).length <= 0) {
        state.end = true
        state.winner = 0
      }
      //endTurn
      matchSlice.caseReducers.endTurn(state)
    },
    endTurn: (state) => {
      //end turn
      for (let i = 0; i < state.players.length; i++) {
        const player = state.players[i]
        for (let j = 0; j < player.units.length; j++) {
          const unit = player.units[j]
          for (let k = 0; k < unit.status.length; k++) {
            const status = unit.status[k]
            switch (status.type.type) {
              case "Bleeding": {
                unit.healty -= 1
                status.duration -= 1
                break
              }
              case "Poisoned": {
                unit.healty -= randomInteger(1, 3)
                status.duration -= 1
                break
              }
              default: break
            }
            if (status.duration <= 0) {
              unit.status.splice(k, 1)
              k -= 1
            }
          }
        }
      }
      //check win
      if (state.players[1].units.filter((u) => u.healty > 0).length <= 0) {
        state.end = true
        state.winner = 0
      }
      if (state.players[0].units.filter((u) => u.healty > 0).length <= 0) {
        state.end = true
        state.winner = 0
      }
      //next turn
      state.turn += 1;
      if (state.turn >= state.turnOrder.length) {
        state.turn = 0;
      }
      //start turn
      for (let i = 0; i < state.players.length; i++) {
        const player = state.players[i]
        for (let j = 0; j < player.units.length; j++) {
          const unit = player.units[j]
          for (let k = 0; k < unit.status.length; k++) {
            const status = unit.status[k]
            switch (status.type.type) {
              case "Stun": {
                if (player.id == state.turnOrder[state.turn][0] &&
                  unit.id == state.turnOrder[state.turn][1]) {
                  //next turn
                  state.turn += 1;
                  if (state.turn >= state.turnOrder.length) {
                    state.turn = 0;
                  }
                  status.duration -= 1;
                }
                break
              }
              default: break
            }
            if (status.duration <= 0) {
              unit.status.splice(k, 1)
              k -= 1
            }
          }
        }
      }

      // const [player_id, unit_id] = state.turnOrder[state.turn]
      // if (player_id == 0) {
      //   //bot
      //   const unit = state.players[player_id].units[unit_id]
      //   const trait = unit.traits[randomInteger(0, unit.traits.length - 3)]
      //   const evaible_targets = state.players[1].units.filter((u) => u.healty > 0)
      //   const targets = evaible_targets[randomInteger(0, evaible_targets.length - 1)].id
      //   // setTimeout(() => {
      //   // }, 3000)
      //   matchSlice.caseReducers.useTrait(state, {
      //     type: "useTrait",
      //     payload: {
      //       player_id,
      //       unit_id: unit.id,
      //       trait_id: trait.id,
      //       targets,
      //     }
      //   })
      // } else {
      //   //player
      // }
    },
    botStep: (state) => {
      //bot
      const [player_id, unit_id] = state.turnOrder[state.turn]
      const unit = state.players[player_id].units[unit_id]
      const trait = unit.traits[randomInteger(0, unit.traits.length - 3)]
      const evaible_targets = state.players[1].units.filter((u) => u.healty > 0)
      const targets = evaible_targets[randomInteger(0, evaible_targets.length - 1)].id
      // setTimeout(() => {
      // }, 3000)
      matchSlice.caseReducers.useTrait(state, {
        type: "useTrait",
        payload: {
          player_id,
          unit_id: unit.id,
          trait_id: trait.id,
          targets,
        }
      })

    }

  },
})

//function checkWinner(state: WritableDraft<Match>) {}

export const { chooseUnit, useTrait, useItem, endTurn, setAnimationState, botStep } = matchSlice.actions
// const selectCount = (state: RootState) => state.counter.value
// counterSlice.reducer

export const store = configureStore({
  reducer: {
    match: matchSlice.reducer,
    // players: playersReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
