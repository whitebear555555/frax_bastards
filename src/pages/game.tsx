
export type ActionTrait = {
  "player_id": number;
  "unit_id": number;
  "trait_id": number;
  "targets": number;
}
export type ActionItem = {
  "player_id": number;
  "unit_id": number;
  "trait_id": number;
  "targets": number[];
}
export type Match = {
  players: Player[],
  units: Unit[],
  turnOrder: [number, number][],
  turn: number,
}
export type Player = {
  id: number,
  name: string
  items: Item[]
}
export type Unit = {
  player_owner: number,
  id: number;
  name: string;
  healty: number;
  mana: number;
  traits: Trait[];
  status: StatusEffect[],
  level: number;
  exp: number;
}
export type Trait = {
  id: number;
  name: string;
  condition: Condition; //[]
  target: Target;
  effect: Effect;
  rarity: Rarity;
};
export type Item = {
  id: number;
  name: string,
  condition: Condition;
  target: Target;
  effect: Effect;
  rarity: Rarity;
};
export type StatusEffect = {
  name: string,
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
  type: "Stun"
});
export type Color = ({ type: "Uncolor" } | { type: "Red" } | { type: "Green" } | { type: "Blue" });

export const units: Unit[] = [
  {
    player_owner: 0,
    id: 0,
    name: "0000",
    healty: 100,
    mana: 100,
    level: 3,
    exp: 20,
    status: [],
    traits: [
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
        id: 10,
        name: "Stun Punch",
        condition: { type: "Activation", cost: 12 },
        rarity: {
          type: "Common"
        },
        target: { type: "Enemy" },
        effect: { type: "Stun" }
      },
    ]
  },
  {
    player_owner: 0,
    id: 1,
    name: "0000",
    healty: 100,
    mana: 100,
    level: 3,
    exp: 20,
    status: [],
    traits: [
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
        id: 5,
        name: "Fire Resist",
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
    player_owner: 0,
    id: 2,
    name: "0000",
    healty: 100,
    mana: 100,
    level: 3,
    exp: 20,
    status: [],
    traits: [
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
    ]
  },
  {
    player_owner: 0,
    id: 3,
    name: "0000",
    healty: 100,
    mana: 100,
    level: 3,
    exp: 20,
    status: [],
    traits: [
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
        id: 4,
        name: "Earth Punch",
        condition: { type: "Activation", cost: 7 },
        rarity: {
          type: "Rare"
        },
        target: { type: "Enemy" },
        effect: { type: "Attack", color: { type: "Green" }, min: 5, max: 10 }
      },
    ]
  },
  {
    player_owner: 1,
    id: 0,
    name: "0000",
    healty: 100,
    mana: 100,
    level: 3,
    exp: 20,
    status: [],
    traits: [
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
        id: 10,
        name: "Stun Punch",
        condition: { type: "Activation", cost: 12 },
        rarity: {
          type: "Common"
        },
        target: { type: "Enemy" },
        effect: { type: "Stun" }
      },
    ]
  },
  {
    player_owner: 1,
    id: 1,
    name: "0000",
    healty: 100,
    mana: 100,
    level: 3,
    exp: 20,
    status: [],
    traits: [
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
        id: 5,
        name: "Fire Resist",
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
    name: "0000",
    healty: 100,
    mana: 100,
    level: 3,
    exp: 20,
    status: [],
    traits: [
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
    ]
  },
  {
    player_owner: 1,
    id: 3,
    name: "0000",
    healty: 100,
    mana: 100,
    level: 3,
    exp: 20,
    status: [],
    traits: [
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
        id: 4,
        name: "Earth Punch",
        condition: { type: "Activation", cost: 7 },
        rarity: {
          type: "Rare"
        },
        target: { type: "Enemy" },
        effect: { type: "Attack", color: { type: "Green" }, min: 5, max: 10 }
      },
    ]
  },
]





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
