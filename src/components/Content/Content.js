import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid' 
import Typography from '@material-ui/core/Typography';
import PointsList from '../PoinstList/PoinstList'
import CustomMap from '../CustomMap/CustomMap'
import {MainContextProvider} from '../MainContext'
import SearchInput from '../SearchInput/SearchInput'
import { YMaps } from 'react-yandex-maps'
import API_KEY from '../../settings'

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

    return(
        <YMaps query={{ load: 'package.full', apikey: API_KEY }}>
            <MainContextProvider>
                <Grid className={classes.root} container >
                    <Grid container>
                        <Grid item xs sm={4} ms={4} lg={4}>
                            <Typography variant="h6" className={classes.myTitle}>
                                Мой маршрут
                            </Typography>
                            <SearchInput />
                            <PointsList />
                        </Grid>
                        <Grid item xs={12} sm={8} md={8} lg={8}>
                            <CustomMap />
                        </Grid>
                    </Grid>
                </Grid>
            </MainContextProvider>
        </YMaps>
    )
}