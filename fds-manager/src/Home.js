import React from 'react'
import Categories from './Categories';
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Categories/>
            </div>
        )
    }

}

export default Home
