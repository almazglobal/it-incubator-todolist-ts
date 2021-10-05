import {v1} from "uuid";

test('correct tasks should be remove', () => {

    const todoListId1 = v1()
    const todoListId2 = v1()

   const tasks = {
        [todoListId1]: [
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: true},
    ],
        [todoListId2]: [
        {id: v1(), title: "Apples", isDone: false},
        {id: v1(), title: "Banana", isDone: true},
    ]
    }
})