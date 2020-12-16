import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {useMainContext} from '../MainContext';
import Point from '../Point/Point'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '90%',
        marginTop: 20,
        padding: 0,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
        backgroundColor: '#E6E6FA'
    },
    
}))

export default function PointList() {
    const classes = useStyles()
    const {pointsList, setPointsList} = useMainContext()

    const onDragEnd = result => {
        const {destination, source} = result

        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) { return }

        const newPointsList = pointsList

        const choosePoint = newPointsList.splice(source.index, 1)
        newPointsList.splice(destination.index, 0, choosePoint[0])

        setPointsList(prev => prev = [...newPointsList])
    }

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={`myList`}>
                    {(provided) => (
                        <List
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            component="nav" 
                            className={classes.root} 
                        >
                            {pointsList.map((point, idx) => (
                                <Point key={point.id} point={point} idx={idx}/>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}