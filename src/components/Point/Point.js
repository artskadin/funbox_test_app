import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid' 
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography';
import {useMainContext} from '../MainContext'
import {Draggable} from 'react-beautiful-dnd'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing(0),
        "&:hover": {
            backgroundColor: 'rgb(231, 190, 250)'
        }
    },
    idx: {
        marginRight: theme.spacing(2)
    }, 
}))

const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,  
    ...(isDragging && {
      background: "rgb(231, 190, 250)"
    })
  });

export default function Point(props) {
    const { point, idx } = props
    const classes = useStyles(props)

    const {deletePoint, map} = useMainContext()

    return (
        <Draggable draggableId={point.id} key={point.id}  index={idx}>
            {(provided, snapshot) => (
                <ListItem 
                    className={classes.root}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    divider
                >
                    <Grid container spacing={3}>
                        <Grid item xs={1}>
                            <Typography variant="body1" color="textPrimary" component="p">
                                {idx+1}
                            </Typography>
                        </Grid>
                        <Grid item xs={8} onClick={() => map.panTo(point.coords)}>
                            <Typography variant="body1" color="textPrimary" component="p">
                                {point.locateName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {point.coords[0]}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {point.coords[1]}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton 
                                onClick={() => deletePoint(point.id)} 
                                edge="end" 
                                aria-label="delete" 
                                color="secondary"
                            >
                                <DeleteIcon  />
                            </IconButton>
                        </Grid>
                        </Grid>
                </ListItem>
            )}
        </Draggable>
    )
}