import type { Action, PayloadAction, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore, createSlice } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { ActionItem, ActionTrait, Match, StatusEffect, StatusEffectType, units } from "../pages/game"
import { stat } from "fs";
import { Status } from "viem";
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
      items: []
    },
    {
      id: 1,
      name: "Player",
      items: []
    }
  ],
  units: units,
  turnOrder: [
    [1, 0],
    [0, 0],
    [1, 1],
    [0, 1],
    [1, 2],
    [0, 2],
    [1, 3],
    [0, 3],
  ],
  turn: 0
}

const matchSlice = createSlice({
  name: 'Match',
  initialState,
  reducers: {
    useTrait: (state, payload: PayloadAction<ActionTrait>) => {
      //if have mana
      const player = state.players[payload.payload.player_id]
      const unit = state.units[payload.payload.unit_id]
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
        switch (trait.effect.type) {
          case 'Attack': {
            const target_unit = state.units[payload.payload.targets]
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
            break
          }
          case 'Resist': { break }
          case 'Heal': {
            unit.healty += randomInteger(trait.effect.min, trait.effect.max)
            break
          }
          case 'Vampirism': {
            const target_unit = state.units[payload.payload.targets]
            let attack = randomInteger(trait.effect.min, trait.effect.max)
            target_unit.healty -= attack
            unit.healty += attack
            break
          }
          case 'Bleeding': {
            const target_unit = state.units[payload.payload.targets]
            const eff: StatusEffect = {
              name: "Bleeding", type: { type: "Bleeding" }
            }
            target_unit.status.push(eff)
            break
          }
          case 'Poison': {
            const target_unit = state.units[payload.payload.targets]
            const eff: StatusEffect = {
              name: "Poison", type: { type: "Poisoned" }
            }
            target_unit.status.push(eff)
            break
          }
          case 'Stun': {
            const target_unit = state.units[payload.payload.targets]
            const eff: StatusEffect = {
              name: "Stun", type: { type: "Stun" }
            }
            target_unit.status.push(eff)
            break
          }
          default: break

        }
      }
      //check win
      //endTurn
    },
    useItem: (state, payload: PayloadAction<ActionItem>) => {
      //check win
      //endTurn
    },
    endTurn: (state) => {
      state.turn += 1;
      if (state.turn == state.turnOrder.length) {
        state.turn = 0;
      }
      //end_turn check trait and status
      //end_turn(m);
      //next_turn check trait and status
      //bot ther
      const l = state.turnOrder[state.turn]
      if (l[0] == 0) {
        //bot
      } else {
        //player
      }
    },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

export const { useTrait, useItem, endTurn } = matchSlice.actions
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
