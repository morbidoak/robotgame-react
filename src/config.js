export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 14;
export const TURNS_LIMIT = 100; //maximum turns in log
export const MOVE_TICKS = 15; //ticks in move between cells
export const TICK_TIME = 60; //ms in tick
export const BOARD_OFFSET_X = 1;
export const BOARD_OFFSET_Y = 4;
export const BOARD_CELL_WIDTH = 44;
export const BOARD_CELL_HEIGHT = 44;
export const MOVE_LENGTH_WIDTH = BOARD_CELL_WIDTH/MOVE_TICKS;
export const MOVE_LENGTH_HEIGHT = BOARD_CELL_HEIGHT/MOVE_TICKS;

export const STEERING_ACTIONS = {
  "n": {"n":["n"], 
            "s":["nne", "nee", "e", "see", "sse", "s"],
            "e": ["nne", "nee", "e"],
            "w": ["nnw", "nww", "w"]},
  "s": {"n":["ssw", "sww", "w", "nww", "nnw", "n"], 
            "s":["s"],
            "e": ["sse", "see", "e"],
            "w": ["ssw", "sww", "w"]},
  "e": {"n":["nee", "nne", "n"], 
            "s":["see", "sse", "s"],
            "e": ["e"],
            "w": ["see", "sse", "s", "ssw", "sww", "w"]},
  "w": {"n":["nww", "nnw", "n"], 
            "s":["sww", "ssw", "s"],
            "e": ["nww", "nnw", "n", "nne", "nee", "e"],
            "w": ["w"]},
};

export const PAINT_ACTIONS = {
  "n":["n", "nne", "n", "nnw", "n", "nne", "n", "nnw", "n"], 
  "s":["s", "ssw", "s", "sse", "s", "ssw", "s", "sse", "s"],
  "e": ["e", "nee", "e", "see", "e", "nee", "e", "see", "e"],
  "w": ["w", "nww", "w", "sww", "w", "nww", "w", "sww", "w"]};


export const AUTOSAVE_STORAGE_NAME = "autosave";
export const STORAGE_PREFIX = "__"
