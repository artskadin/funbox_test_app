import React from 'react'
import Grid from '@material-ui/core/Grid' 
import Header from "./Header/Header"
import Content from './Content/Content';

export default function MainGrid() {
    return (
        <Grid container direction="column">
            <Grid item>
                <Header />
            </Grid>
            <Grid item container>
                <Grid item xs={false} md={1} />
                <Grid item xs={12} md={10}>
                    <Content />
                </Grid>
                <Grid item xs={false} md={1} />
            </Grid>
        </Grid>
    )
}