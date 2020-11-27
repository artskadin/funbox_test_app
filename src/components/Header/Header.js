import React from 'react'
import {makeStyles} from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import { AppBar, Toolbar } from '@material-ui/core'
import ExploreIcon from '@material-ui/icons/Explore';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}))

function Header() {
    const classes = useStyles()

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.typographyStyles}>
                    Art_Map
                </Typography>
                <ExploreIcon fontSize="large" />
            </Toolbar>
        </AppBar>
    )
}

export default Header