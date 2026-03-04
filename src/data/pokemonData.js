export const playerMoves = [
  {
    name: "React Render",
    damage: [25, 35],
    type: "attack",
    description: "A blazing fast virtual DOM attack!",
  },
  {
    name: "SQL Injection",
    damage: [30, 45],
    type: "attack",
    description: "DROP TABLE enemies; -- Critical hit!",
  },
  {
    name: "Git Push --force",
    damage: [40, 55],
    type: "attack",
    description: "Overwrites everything in its path!",
  },
  {
    name: "Stack Overflow",
    damage: [20, 30],
    type: "heal",
    description: "Searches for the answer... HP restored!",
  },
];

export const enemies = [
  {
    name: "PROD_BUG",
    maxHp: 100,
    sprite: "bug",
    moves: [
      { name: "Null Pointer", damage: [15, 25] },
      { name: "Race Condition", damage: [20, 30] },
      { name: "Memory Leak", damage: [10, 20] },
    ],
    intro: "A wild PROD_BUG appeared in production!",
    defeat: "PROD_BUG was squashed! Deploy successful!",
  },
  {
    name: "LEGACY_CODE",
    maxHp: 120,
    sprite: "legacy",
    moves: [
      { name: "jQuery Chaos", damage: [15, 25] },
      { name: "Callback Hell", damage: [20, 35] },
      { name: "No Documentation", damage: [10, 20] },
    ],
    intro: "LEGACY_CODE emerged from the ancient repo!",
    defeat: "LEGACY_CODE was refactored! Tech debt cleared!",
  },
  {
    name: "SEGFAULT",
    maxHp: 140,
    sprite: "segfault",
    moves: [
      { name: "Stack Smash", damage: [25, 35] },
      { name: "Buffer Overflow", damage: [20, 40] },
      { name: "Core Dump", damage: [15, 30] },
    ],
    intro: "SEGFAULT has corrupted the memory space!",
    defeat: "SEGFAULT was contained! Memory restored!",
  },
];

export const GAME_W = 480;
export const GAME_H = 320;
export const PLAYER_MAX_HP = 120;

export const COLORS = {
  bg: "#1e1f22",
  panel: "#2b2d30",
  border: "#393b40",
  text: "#bcbec4",
  accent: "#56a8f5",
  green: "#6aab73",
  red: "#e06c75",
  yellow: "#f0a732",
  white: "#e8e8e8",
};
