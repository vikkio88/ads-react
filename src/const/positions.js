const extendedPositions = {
    "GK": {position: "GK", description: "Goalkeeper", weight: 1},
    "D": {position: "D", description: "Defender", weight: 2},
    "LD": {position: "LD", description: "Left Defender", weight: 3},
    "RD": {position: "RD", description: "Right Defender", weight: 4},
    "CM": {position: "CM", description: "Midfielder", weight: 5},
    "RM": {position: "RM", description: "Right Midfielder", weight: 6},
    "LM": {position: "LM", description: "Left Midfielder", weight: 7},
    "S": {position: "S", description: "Striker", weight: 10},
    "RS": {position: "RS", description: "Right Striker", weight: 9},
    "LS": {position: "LS", description: "Left Striker", weight: 8}
};

const positions = [
    "GK", "D", "LD", "RD", "CM", "RM", "LM", "S", "RS", "LS"
];

export {positions, extendedPositions};