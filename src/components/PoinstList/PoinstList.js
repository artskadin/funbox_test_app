import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {useMainContext} from '../MainContext';
import Point from '../Point/Point'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: 20,
        padding: 0,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500
    },
    
}))

export default function PointList() {
    const classes = useStyles()
    const {pointsList} = useMainContext()

    return (
        <div>
            <List component="nav" className={classes.root} >
                {pointsList.map((point, idx) => (
                    <Point key={point.id} point={point} idx={idx} onClick={() => console.log('he')}/>
                ))}
            </List>
        </div>
    )
}