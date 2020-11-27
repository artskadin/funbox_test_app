import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid' 
import Typography from '@material-ui/core/Typography';
import PointsList from '../PoinstList/PoinstList'
import CustomMap from '../CustomMap/CustomMap'
import {MainContextProvider} from '../MainContext'
import SearchInput from '../SearchInput/SearchInput'
import { YMaps } from 'react-yandex-maps'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 40,
        height: 600
    },
    myTitle: {
        textAlign: 'center'
    }

}))

export default function Content() {
    const classes = useStyles()

    // function handleChange(event) {
    //     setLocateName(event.target.value)
    // }

    // function handleAdd() {
    //     const newPointList = pointList.concat({
    //         coordinate: [locateName],
    //         id: uusdv4()
    //     })

    //     setPointList(newPointList)
    //     setLocateName('')
    //     console.log(newPointList)
    // }

    // function handleDelete(id) {
    //     const newPointList = pointList.filter(point => point.id !== id)

    //     setPointList(newPointList)
    // }

    return(
        <YMaps query={{ load: 'package.full', apikey: 'ae030262-3ac2-4dbc-84f7-8d851146cd07' }}>
        <MainContextProvider>
            <Grid className={classes.root} container >
                <Grid container>
                    <Grid item xs sm={4}>
                        <Typography variant="h6" className={classes.myTitle}>
                            Мой маршрут
                        </Typography>
                        <SearchInput />
                        <PointsList />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <CustomMap />
                    </Grid>
                </Grid>
            </Grid>
        </MainContextProvider>
        </YMaps>
    )
}