
export type ActionChooseUnit = Unit[]
export type ActionSetAnimationState = {
  "player_id": number;
  "unit_id": number;
  "state": AnimationState;
}
export type ActionTrait = {
  "player_id": number;
  "unit_id": number;
  "trait_id": number;
  "targets": number;
}
export type ActionItem = {
  "player_id": number;
  "item_id": number;
  "targets": number;
}
export type Match = {
  players: Player[],
  turnOrder: [number, number][],
  turn: number,
  initPlayerUnitPool: Unit[],
  end: boolean,
  winner: number,
}
export type Player = {
  id: number,
  name: string
  units: Unit[],
  items: Item[]
}
//TODO: traits[] all trait in game with unica id unit id player id 
export type AnimationState = (
  { type: "None" } | { type: "TakeDamage", damge: number, trait: Trait } | { type: "Heal", damge: number, trait: Trait }
)

export type Unit = {
  player_owner: number,
  id: number;
  name: string;
  imgUrl: string;
  healty: number;
  mana: number;
  traits: Trait[];
  status: StatusEffect[],
  level: number;
  exp: number;
  animationState: AnimationState
}
export type Trait = {
  id: number;
  name: string;
  imgUrl: string;
  desc: string,
  condition: Condition; //[]
  target: Target;
  effect: Effect;
  rarity: Rarity;
};
export type Item = {
  id: number;
  name: string,
  imgUrl: string;
  desc: string,
  condition: Condition;
  target: Target;
  effect: Effect;
  rarity: Rarity;
};
export type StatusEffect = {
  name: string,
  duration: number,
  type: StatusEffectType,
}
export type StatusEffectType = ({ type: "Poisoned" } | { type: "Bleeding" } | { type: "Stun" })
export type Rarity = ({ type: "Common" } | { type: "Rare" } | { type: "Mythical" })
export type Target = ({ type: "Self" } | { type: "All" } | { type: "Aliade" } | { type: "Enemy" } | { type: "Random" });
export type Condition = ({ type: "BeginTurn" } | { type: "EndTurn" } | {
  type: "Activation"
} & {
  "cost": number;
} | { type: "TakeDamage" });
export type Effect = ({
  type: "Attack";
  "color": Color;
  "min": number;
  "max": number;
} | {
  type: "Resist"
  "color": Color;
  "min": number;
  "max": number;
} | {
  type: "Bleeding"
  "color": Color;
  "min": number;
  "max": number;
} | {
  type: "Heal"
  "min": number;
  "max": number;
} | {
  type: "Vampirism"
  "min": number;
  "max": number;
} | {
  type: "Poison"
  "min": number;
  "max": number;
} | {
  type: "Stun",
} | {
  type: "Dispoisen"
});
export type Color = ({ type: "Uncolor" } | { type: "Red" } | { type: "Green" } | { type: "Blue" });

import ability1 from '/assets/ability1.png'
import ability2 from '/assets/ability2.png'
import ability3 from '/assets/ability3.png'
import ability4 from '/assets/ability4.png'
import ability5 from '/assets/ability5.png'
import ability6 from '/assets/ability6.png'
import ability7 from '/assets/ability7.png'
import ability8 from '/assets/ability8.png'
import ability9 from '/assets/ability9.png'
import ability10 from '/assets/ability10.png'
import ability11 from '/assets/ability11.png'
import ability12 from '/assets/ability12.png'
import item1 from '/assets/item1.png'
import item2 from '/assets/item2.png'
import item3 from '/assets/item3.png'
import enemy_boss from '/assets/enemy_boss.png'
import enemy_spider from '/assets/enemy_spider.png'
import portrait from '/assets/portrait.png'
import portrait1 from '/assets/portrait(1).png'
import portrait2 from '/assets/portrait(2).png'
import portrait3 from '/assets/portrait(4).png'
import portrait4 from '/assets/portrait(5).png'

export const item_pool: Item[] = [
  {
    id: 0,
    name: "Fire Bomb",
    imgUrl: item1,
    desc: "Activate: Deal 2-7 red damage",
    condition: { type: "Activation", cost: 0 },
    rarity: {
      type: "Common"
    },
    target: { type: "Enemy" },
    effect: { type: "Attack", color: { type: "Red" }, min: 2, max: 7 }
  },
  {
    id: 1,
    name: "Medical Kit",
    imgUrl: item2,
    desc: "Activate: Restore 5-10 health points",
    condition: { type: "Activation", cost: 0 },
    rarity: {
      type: "Common"
    },
    target: { type: "Aliade" },
    effect: { type: "Heal", min: 5, max: 10 }
  },
  {
    id: 2,
    name: "Antidote",
    desc: "Activate: Remove poison",
    imgUrl: item3,
    condition: { type: "Activation", cost: 0 },
    rarity: {
      type: "Common"
    },
    target: { type: "Aliade" },
    effect: { type: "Heal", min: 5, max: 10 }
    /*effect: { type: "Dispoisen", }*/
  },
]
export const enemy_unit_pool: Unit[] = [{
  player_owner: 0,
  id: 0,
  name: "Spider",
  imgUrl: enemy_spider,
  healty: 100,
  mana: 100,
  animationState: { type: "None" },
  traits: [
    {
      id: 0,
      imgUrl: ability1,
      name: "Fire Punch",
      desc: "Activate(cost 2): Deal 1-5 red damage",
      condition: { type: "Activation", cost: 2 },
      rarity: {
        type: "Common"
      },
      target: { type: "Enemy" },
      effect: { type: "Attack", color: { type: "Red" }, min: 1, max: 5 }
    },
    {
      id: 1,
      name: "Water Punch",
      desc: "Activate (cost 4): Deal 2-4 blue damage",
      imgUrl: ability2,
      condition: { type: "Activation", cost: 4 },
      rarity: {
        type: "Common"
      },
      target: { type: "Enemy" },
      effect: { type: "Attack", color: { type: "Blue" }, min: 2, max: 4 }
    },
    {
      id: 2,
      name: "Posion Punch",
      desc: "Activate (cost 6): Poisons targets",
      imgUrl: ability5,
      condition: { type: "Activation", cost: 6 },
      rarity: {
        type: "Common"
      },
      target: { type: "Enemy" },
      effect: { type: "Poison", min: 1, max: 3 }
    },
    {
      id: 3,
      name: "Stun Punch",
      imgUrl: ability4,
      desc: "Activate (cost 12): Stuns the target",
      condition: { type: "Activation", cost: 12 },
      rarity: {
        type: "Common"
      },
      target: { type: "Enemy" },
      effect: { type: "Stun" }
    },
    {
      id: 4,
      name: "Water Resist",
      desc: "block 3-5 blue damage when taking damage",
      imgUrl: ability7,
      condition: { type: "TakeDamage" },
      rarity: {
        type: "Common"
      },
      target: { type: "Self" },
      effect: { type: "Resist", color: { type: "Blue" }, min: 3, max: 5 }
    },
    {
      id: 5,
      name: "Earth Resist",
      desc: "block 3-6 green damage when taking damage",
      imgUrl: ability8,
      condition: { type: "TakeDamage" },
      rarity: {
        type: "Common"
      },
      target: { type: "Self" },
      effect: { type: "Resist", color: { type: "Green" }, min: 3, max: 6 }
    },
  ],
  status: [],
  level: 10,
  exp: 30,
}, {
  player_owner: 0,
  id: 1,
  name: "Boss",
  imgUrl: enemy_boss,
  healty: 200,
  mana: 150,
  animationState: { type: "None" },
  traits: [
    {
      id: 0,
      name: "Vampirism",
      desc: "Activate (cost 9): Drains 1-7 life point from target",
      imgUrl: ability12,
      condition: { type: "Activation", cost: 9 },
      rarity: {
        type: "Mythical"
      },
      target: { type: "All" },
      effect: { type: "Vampirism", min: 1, max: 7 }
    },
    {
      id: 1,
      name: "Earth Punch",
      desc: "Activate (cost 7): Deal 5-10 green damage",
      imgUrl: ability3,
      condition: { type: "Activation", cost: 7 },
      rarity: {
        type: "Rare"
      },
      target: { type: "Enemy" },
      effect: { type: "Attack", color: { type: "Green" }, min: 5, max: 10 }
    },
    {
      id: 2,
      name: "Earth Resist",
      desc: "block 3-6 green damage when taking damage",
      imgUrl: ability8,
      condition: { type: "TakeDamage" },
      rarity: {
        type: "Common"
      },
      target: { type: "Self" },
      effect: { type: "Resist", color: { type: "Green" }, min: 3, max: 6 }
    },
    {
      id: 3,
      name: "AutoHeal",
      desc: "Restore 1-5 health points at end of turn",
      imgUrl: ability11,
      condition: { type: "EndTurn" },
      rarity: {
        type: "Rare"
      },
      target: { type: "Self" },
      effect: { type: "Heal", min: 1, max: 5 }
    },
  ],
  status: [{ name: "Poison", duration: 3, type: { type: 'Poisoned' } },
  { name: "Stun", duration: 3, type: { type: 'Stun' } },
  { name: "Bleeding", duration: 3, type: { type: 'Bleeding' } }
  ],
  level: 12,
  exp: 30,
}, {
  player_owner: 0,
  id: 2,
  name: "Spider",
  imgUrl: enemy_spider,
  healty: 100,
  mana: 100,
  animationState: { type: "None" },
  traits: [
    {
      id: 0,
      imgUrl: ability1,
      name: "Fire Punch",
      desc: "Activate(cost 2): Deal 1-5 red damage",
      condition: { type: "Activation", cost: 2 },
      rarity: {
        type: "Common"
      },
      target: { type: "Enemy" },
      effect: { type: "Attack", color: { type: "Red" }, min: 1, max: 5 }
    },
    {
      id: 1,
      name: "Water Punch",
      desc: "Activate (cost 4): Deal 2-4 blue damage",
      imgUrl: ability2,
      condition: { type: "Activation", cost: 4 },
      rarity: {
        type: "Common"
      },
      target: { type: "Enemy" },
      effect: { type: "Attack", color: { type: "Blue" }, min: 2, max: 4 }
    },
    {
      id: 2,
      name: "Posion Punch",
      desc: "Activate (cost 6): Poisons targets",
      imgUrl: ability5,
      condition: { type: "Activation", cost: 6 },
      rarity: {
        type: "Common"
      },
      target: { type: "Enemy" },
      effect: { type: "Poison", min: 1, max: 3 }
    },
    {
      id: 3,
      name: "Stun Punch",
      imgUrl: ability4,
      desc: "Activate (cost 12): Stuns the target",
      condition: { type: "Activation", cost: 12 },
      rarity: {
        type: "Common"
      },
      target: { type: "Enemy" },
      effect: { type: "Stun" }
    },
    {
      id: 4,
      name: "Water Resist",
      desc: "block 3-5 blue damage when taking damage",
      imgUrl: ability7,
      condition: { type: "TakeDamage" },
      rarity: {
        type: "Common"
      },
      target: { type: "Self" },
      effect: { type: "Resist", color: { type: "Blue" }, min: 3, max: 5 }
    },
    {
      id: 5,
      name: "Earth Resist",
      desc: "block 3-6 green damage when taking damage",
      imgUrl: ability8,
      condition: { type: "TakeDamage" },
      rarity: {
        type: "Common"
      },
      target: { type: "Self" },
      effect: { type: "Resist", color: { type: "Green" }, min: 3, max: 6 }
    },
  ],
  status: [],
  level: 10,
  exp: 30,
},
]
export const unit_pool: Unit[] = [
  {
    player_owner: 1,
    id: 0,
    name: "Warlord",
    imgUrl: portrait,
    healty: 150,
    mana: 70,
    level: 3,
    exp: 20,
    animationState: { type: "None" },
    status: [],
    traits: [
      {
        id: 0,
        imgUrl: ability1,
        name: "Fire Punch",
        desc: "Activate(cost 2): Deal 1-5 red damage",
        condition: { type: "Activation", cost: 2 },
        rarity: {
          type: "Common"
        },
        target: { type: "Enemy" },
        effect: { type: "Attack", color: { type: "Red" }, min: 1, max: 5 }
      },
      {
        id: 1,
        name: "Stun Punch",
        imgUrl: ability4,
        desc: "Activate (cost 12): Stuns the target",
        condition: { type: "Activation", cost: 12 },
        rarity: {
          type: "Common"
        },
        target: { type: "Enemy" },
        effect: { type: "Stun" }
      },
      {
        id: 2,
        name: "Bleeding",
        desc: "Activate (cost 7): Causes bleeding on the target",
        imgUrl: ability12,
        condition: { type: "Activation", cost: 7 },
        rarity: {
          type: "Rare"
        },
        target: { type: "Enemy" },
        effect: { type: "Bleeding", color: { type: "Green" }, min: 1, max: 5 }
      },
      {
        id: 3,
        name: "Water Resist",
        desc: "block 3-5 blue damage when taking damage",
        imgUrl: ability7,
        condition: { type: "TakeDamage" },
        rarity: {
          type: "Common"
        },
        target: { type: "Self" },
        effect: { type: "Resist", color: { type: "Blue" }, min: 3, max: 5 }
      },
    ]
  },
  {
    player_owner: 1,
    id: 1,
    name: "Seer",
    imgUrl: portrait1,
    healty: 100,
    mana: 150,
    level: 3,
    exp: 20,
    animationState: { type: "None" },
    status: [
      { name: "Poison", duration: 3, type: { type: 'Poisoned' } },
      { name: "Stun", duration: 3, type: { type: 'Stun' } },
      { name: "Bleeding", duration: 3, type: { type: 'Bleeding' } }
    ],
    traits: [
      {
        id: 0,
        name: "Heal",
        desc: "Activate (cost 3): Restore 1-5 health points",
        imgUrl: ability10,
        condition: { type: "Activation", cost: 3 },
        rarity: {
          type: "Common"
        },
        target: { type: "Aliade" },
        effect: { type: "Heal", min: 1, max: 5 }
      },
      {
        id: 1,
        name: "Water Punch",
        desc: "Activate (cost 4): Deal 2-4 blue damage",
        imgUrl: ability2,
        condition: { type: "Activation", cost: 4 },
        rarity: {
          type: "Common"
        },
        target: { type: "Enemy" },
        effect: { type: "Attack", color: { type: "Blue" }, min: 2, max: 4 }
      },
      {
        id: 2,
        name: "Earth Punch",
        desc: "Activate (cost 7): Deal 5-10 green damage",
        imgUrl: ability3,
        condition: { type: "Activation", cost: 7 },
        rarity: {
          type: "Rare"
        },
        target: { type: "Enemy" },
        effect: { type: "Attack", color: { type: "Green" }, min: 5, max: 10 }
      },
      {
        id: 3,
        name: "Fire Resist",
        desc: "block 1-5 red damage when taking damage",
        imgUrl: ability6,
        condition: { type: "TakeDamage" },
        rarity: {
          type: "Common"
        },
        target: { type: "Self" },
        effect: { type: "Resist", color: { type: "Red" }, min: 1, max: 5 }
      },
    ]
  },
  {
    player_owner: 1,
    id: 2,
    name: "Ranger",
    imgUrl: portrait2,
    healty: 70,
    mana: 100,
    level: 3,
    exp: 20,
    animationState: { type: "None" },
    status: [],
    traits: [
      {
        id: 0,
        name: "Bleeding",
        desc: "Activate (cost 7): Causes bleeding on the target",
        imgUrl: ability12,
        condition: { type: "Activation", cost: 7 },
        rarity: {
          type: "Rare"
        },
        target: { type: "Enemy" },
        effect: { type: "Bleeding", color: { type: "Green" }, min: 1, max: 5 }
      },
      {
        id: 1,
        name: "Poison Punch",
        desc: "Activate (cost 6): Poisons targets",
        imgUrl: ability5,
        condition: { type: "Activation", cost: 6 },
        rarity: {
          type: "Common"
        },
        target: { type: "Enemy" },
        effect: { type: "Poison", min: 1, max: 3 }
      },
      {
        id: 2,
        name: "Water Punch",
        desc: "Activate (cost 4): Deal 2-4 blue damage",
        imgUrl: ability2,
        condition: { type: "Activation", cost: 4 },
        rarity: {
          type: "Common"
        },
        target: { type: "Enemy" },
        effect: { type: "Attack", color: { type: "Blue" }, min: 2, max: 4 }
      },
      {
        id: 3,
        name: "Earth Resist",
        desc: "block 3-6 green damage when taking damage",
        imgUrl: ability8,
        condition: { type: "TakeDamage" },
        rarity: {
          type: "Common"
        },
        target: { type: "Self" },
        effect: { type: "Resist", color: { type: "Green" }, min: 3, max: 6 }
      },
    ]
  },
  {
    player_owner: 1,
    id: 3,
    name: "Knight",
    imgUrl: portrait3,
    healty: 170,
    mana: 90,
    level: 3,
    exp: 20,
    animationState: { type: "None" },
    status: [],
    traits: [
      {
        id: 0,
        name: "Earth Punch",
        desc: "Activate (cost 7): Deal 5-10 green damage",
        imgUrl: ability3,
        condition: { type: "Activation", cost: 7 },
        rarity: {
          type: "Rare"
        },
        target: { type: "Enemy" },
        effect: { type: "Attack", color: { type: "Green" }, min: 5, max: 10 }
      },
      {
        id: 1,
        name: "Vampirism",
        imgUrl: ability12,
        desc: "Activate (cost 9): Steal HP on the target",
        condition: { type: "Activation", cost: 9 },
        rarity: {
          type: "Mythical"
        },
        target: { type: "All" },
        effect: { type: "Vampirism", min: 1, max: 7 }
      },
      {
        id: 2,
        imgUrl: ability1,
        name: "Fire Punch",
        desc: "Activate (cost 2): Deal 1-5 red damage",
        condition: { type: "Activation", cost: 2 },
        rarity: {
          type: "Common"
        },
        target: { type: "Enemy" },
        effect: { type: "Attack", color: { type: "Red" }, min: 1, max: 5 }
      },
    ]
  },
]
// {
//   player_owner: 1,
//   id: 7,
//   name: "Baron",
//   imgUrl: portrait4,
//   healty: 120,
//   mana: 120,
//   level: 3,
//   exp: 20,
//   status: [],
//   traits: [
//     {
//       id: 11,
//       name: "AutoHeal",
//       desc: "Restore 1-5 health points at end of turn",
//       imgUrl: ability11,
//       condition: { type: "EndTurn" },
//       rarity: {
//         type: "Rare"
//       },
//       target: { type: "Self" },
//       effect: { type: "Heal", min: 1, max: 5 }
//     },
//     {
//       id: 9,
//       name: "Vampirism",
//       desc: "Activate (cost 9): Drains 1-7 life point from target",
//       imgUrl: ability12,
//       condition: { type: "Activation", cost: 9 },
//       rarity: {
//         type: "Mythical"
//       },
//       target: { type: "All" },
//       effect: { type: "Vampirism", min: 1, max: 7 }
//     },
//     {
//       id: 4,
//       name: "Earth Punch",
//       desc: "Activate (cost 7): Deal 5-10 green damage",
//       imgUrl: ability3,
//       condition: { type: "Activation", cost: 7 },
//       rarity: {
//         type: "Rare"
//       },
//       target: { type: "Enemy" },
//       effect: { type: "Attack", color: { type: "Green" }, min: 5, max: 10 }
//     },
//   ]
// },




const traits = [
  {
    id: 1,
    name: "Fire Punch",
    condition: { type: "Activation", cost: 2 },
    rarity: {
      type: "Common"
    },
    target: { type: "Enemy" },
    effect: { type: "Attack", color: { type: "Red" }, min: 1, max: 5 }
  },
  {
    id: 2,
    name: "Heal",
    condition: { type: "Activation", cost: 3 },
    rarity: {
      type: "Common"
    },
    target: { type: "Aliade" },
    effect: { type: "Heal", min: 1, max: 5 }
  },
  {
    id: 3,
    name: "Water Punch",
    condition: { type: "Activation", cost: 4 },
    rarity: {
      type: "Common"
    },
    target: { type: "Enemy" },
    effect: { type: "Attack", color: { type: "Blue" }, min: 2, max: 4 }
  },
  {
    id: 4,
    name: "Earth Punch",
    condition: { type: "Activation", cost: 7 },
    rarity: {
      type: "Rare"
    },
    target: { type: "Enemy" },
    effect: { type: "Attack", color: { type: "Green" }, min: 5, max: 10 }
  },
  {
    id: 5,
    name: "Fire Resist",
    condition: { type: "TakeDamage" },
    rarity: {
      type: "Common"
    },
    target: { type: "Self" },
    effect: { type: "Resist", color: { type: "Red" }, min: 1, max: 5 }
  },
  {
    id: 6,
    name: "Water Resist",
    condition: { type: "TakeDamage" },
    rarity: {
      type: "Common"
    },
    target: { type: "Self" },
    effect: { type: "Resist", color: { type: "Blue" }, min: 3, max: 5 }
  },
  {
    id: 7,
    name: "Earth Resist",
    condition: { type: "TakeDamage" },
    rarity: {
      type: "Common"
    },
    target: { type: "Self" },
    effect: { type: "Resist", color: { type: "Green" }, min: 1, max: 4 }
  },
  {
    id: 8,
    name: "Posion Punch",
    condition: { type: "Activation", cost: 6 },
    rarity: {
      type: "Common"
    },
    target: { type: "Enemy" },
    effect: { type: "Poison", min: 1, max: 5 }
  },
  {
    id: 9,
    name: "Vampirism",
    condition: { type: "Activation", cost: 9 },
    rarity: {
      type: "Mythical"
    },
    target: { type: "All" },
    effect: { type: "Vampirism", min: 1, max: 7 }
  },
  {
    id: 10,
    name: "Stun Punch",
    condition: { type: "Activation", cost: 12 },
    rarity: {
      type: "Common"
    },
    target: { type: "Enemy" },
    effect: { type: "Stun" }
  },
  {
    id: 11,
    name: "AutoHeal",
    condition: { type: "EndTurn" },
    rarity: {
      type: "Rare"
    },
    target: { type: "Self" },
    effect: { type: "Heal", min: 1, max: 5 }
  },
  {
    id: 12,
    name: "Bleeding",
    condition: { type: "Activation", cost: 7 },
    rarity: {
      type: "Rare"
    },
    target: { type: "Aliade" },
    effect: { type: "Bleeding", color: { type: "Green" }, min: 1, max: 5 }
  },
]
