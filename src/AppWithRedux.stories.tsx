import {AppWithRedux} from "./AppWithRedux";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {},
} as ComponentMeta<typeof AppWithRedux>


const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux />;

export const AppWithReduxExample = Template.bind({});

AppWithReduxExample.args = {

};