const initialState = {
  program: {
    procedures: [
      {
        id: "0",
        title: "Sample Program",
        code: [
          {type: "loop", cond:{val:"and", left: {val:"north", id:"wer", left: null, right:null}, right: {val:"paint", id:"sdf", left: null, right:null}, id:"qwe"}, id:"id1", 
            code:[
              {type:"move", to: "north", id:"id2"},
              {type:"move", to: "paint", id:"id3"},
            ]
          },
        ],
      },
      {
        id: "0002",
        title: "procedure 1",
        code: [
          {type:"move", to: "north", id:"id22"},
        ]
      },
    ],
    dragCode: "",
    dragId: "",
    editing: false,
  },
  field: {
    robot: {x:3, y:3},
    hWalls: [{x:3, y:1}],
    vWalls: [],
    paints: [],
  },
};

export default initialState;