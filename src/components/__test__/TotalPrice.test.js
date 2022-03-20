import React from 'react'
import { shallow } from 'enzyme'
import TotalPrice from '../TotalPrice'

const props = {
    inCome: 1000,
    outCome: 2000
}

describe('test TotalPrie component', () => {
    it('component should render correct income&outcome number', () => {
        const wrapper = shallow(<TotalPrice {...props} />)
        expect(wrapper.find('.income').text() * 1).toEqual(1000)
        expect(wrapper.find('.outcome').text() * 1).toEqual(2000)
    })
})