import {TaskTodoList} from "./TaskTodoList";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/TaskTodoList',
    component: TaskTodoList,
    argTypes: {},
} as ComponentMeta<typeof TaskTodoList>;

const changeTextCallback = action('Title changed inside Task')
const onHandlerRemoveTaskCallback = action('Remove Task clicked')
const onCheckedTaskCallback = action('Status changed inside Task')

const Template: ComponentStory<typeof TaskTodoList> = (args) => <TaskTodoList {...args} />;

const baseArgs = {
    changeText: changeTextCallback,
    onHandlerRemoveTask: onHandlerRemoveTaskCallback,
    onCheckedTask: onCheckedTaskCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: "JS", isDone: true},
    id: 'todoListId1',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: "JS", isDone: false},
    id: 'todoListId1',
};