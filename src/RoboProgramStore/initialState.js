const initialState = {
  program: {
    procedures: [
      {
        title: 'Hello world',
        id: '0',
        code: [
          {
            type: 'loop',
            cond: {
              val: 'north',
              id: '-7WbFqklKA67R6qiUT6Ta',
              left: null,
              right: null
            },
            code: [
              {
                type: 'move',
                to: 'north',
                id: 'jxM1nGUulrtU10bInCRGf'
              }
            ],
            id: 'BlAahfLLxyjOJst6YGeKs'
          },
          {
            type: 'loop',
            cond: {
              val: 'not',
              id: '0id-d03fCMUCe2w1mNaX6',
              left: null,
              right: {
                val: 'north',
                id: 'Z_2gMi7-a8GrR6OHM8_0H',
                left: null,
                right: null
              }
            },
            code: [
              {
                type: 'move',
                to: 'west',
                id: 'C-YOa0vpjPEBGCpxZI8St'
              },
              {
                type: 'move',
                to: 'west',
                id: 'tqvnX5TH-TtZkjVTgPxn0'
              }
            ],
            id: 'BIEY7EAZdQgP48d2wxqx_'
          },
          {
            type: 'move',
            to: 'north',
            id: 'KMuFOWbqko_J_yQ2JUH0b'
          },
          {
            type: 'if',
            cond: {
              val: 'not',
              id: 'MVQGa3hcgsU7RPY189Z7D',
              left: null,
              right: {
                val: 'paint',
                id: 'vNB9bL6CDkVQJHJ_srpGE',
                left: null,
                right: null
              }
            },
            code: [
              {
                type: 'move',
                to: 'paint',
                id: '5bU433Vk8sjjOgjML-g-d'
              }
            ],
            id: 'JoY-A5meZIhb5XJPzH5NW'
          },
          {
            type: 'move',
            to: 'south',
            id: 'eBKtU4wURH_ky_ajE-3QH'
          }
        ]
      }
    ],
    dragCode: "",
    dragId: "",
    editing: false,
  },
  field: {
    robot: {
      x: 8,
      y: 8
    },
    hWalls: [
      {
        x: 0,
        y: 2
      },
      {
        x: 2,
        y: 2
      },
      {
        x: 2,
        y: 3
      },
      {
        x: 2,
        y: 1
      },
      {
        x: 4,
        y: 3
      },
      {
        x: 6,
        y: 3
      },
      {
        x: 8,
        y: 1
      },
      {
        x: 8,
        y: 3
      },
      {
        x: 1,
        y: 6
      },
      {
        x: 2,
        y: 6
      },
      {
        x: 4,
        y: 5
      },
      {
        x: 4,
        y: 6
      },
      {
        x: 6,
        y: 5
      },
      {
        x: 9,
        y: 5
      },
      {
        x: 9,
        y: 6
      }
    ],
    vWalls: [
      {
        x: 0,
        y: 1
      },
      {
        x: 0,
        y: 2
      },
      {
        x: 1,
        y: 2
      },
      {
        x: 1,
        y: 1
      },
      {
        x: 2,
        y: 2
      },
      {
        x: 2,
        y: 1
      },
      {
        x: 4,
        y: 1
      },
      {
        x: 4,
        y: 2
      },
      {
        x: 6,
        y: 1
      },
      {
        x: 6,
        y: 2
      },
      {
        x: 8,
        y: 2
      },
      {
        x: 8,
        y: 1
      },
      {
        x: 9,
        y: 1
      },
      {
        x: 9,
        y: 2
      },
      {
        x: 1,
        y: 5
      },
      {
        x: 2,
        y: 5
      },
      {
        x: 3,
        y: 5
      },
      {
        x: 4,
        y: 5
      },
      {
        x: 5,
        y: 5
      },
      {
        x: 6,
        y: 5
      },
      {
        x: 8,
        y: 4
      },
      {
        x: 8,
        y: 5
      },
      {
        x: 10,
        y: 4
      },
      {
        x: 10,
        y: 5
      },
      {
        x: 9,
        y: 5
      }
    ],
    paints: [
      {
        x: 2,
        y: 1
      },
      {
        x: 2,
        y: 2
      },
      {
        x: 1,
        y: 2
      },
      {
        x: 1,
        y: 1
      },
      {
        x: 0,
        y: 1
      },
      {
        x: 3,
        y: 1
      },
      {
        x: 3,
        y: 2
      },
      {
        x: 4,
        y: 2
      },
      {
        x: 4,
        y: 1
      },
      {
        x: 5,
        y: 2
      },
      {
        x: 5,
        y: 1
      },
      {
        x: 6,
        y: 2
      },
      {
        x: 6,
        y: 1
      },
      {
        x: 7,
        y: 1
      },
      {
        x: 7,
        y: 2
      },
      {
        x: 8,
        y: 2
      },
      {
        x: 8,
        y: 1
      },
      {
        x: 9,
        y: 1
      },
      {
        x: 9,
        y: 2
      },
      {
        x: 1,
        y: 5
      },
      {
        x: 2,
        y: 5
      },
      {
        x: 2,
        y: 4
      },
      {
        x: 1,
        y: 4
      },
      {
        x: 0,
        y: 4
      },
      {
        x: 0,
        y: 5
      },
      {
        x: 3,
        y: 5
      },
      {
        x: 3,
        y: 4
      },
      {
        x: 4,
        y: 4
      },
      {
        x: 4,
        y: 5
      },
      {
        x: 5,
        y: 4
      },
      {
        x: 5,
        y: 5
      },
      {
        x: 6,
        y: 5
      },
      {
        x: 6,
        y: 4
      },
      {
        x: 7,
        y: 5
      },
      {
        x: 7,
        y: 4
      },
      {
        x: 8,
        y: 5
      },
      {
        x: 8,
        y: 4
      },
      {
        x: 9,
        y: 4
      },
      {
        x: 9,
        y: 5
      }
    ]
  },
};

export default initialState;