import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Calendar from './Calendar'

export default {
    title: "ReactLightWeightCalendar/Calendar",
    component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />;

export const ExampleCalendar = Template.bind({});
ExampleCalendar.args = {
    startDate: "2020-01-01",
    endDate: "2020-01-31",
};