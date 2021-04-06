import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import currency_symbols from '../../utilities/currency_symbols';


const useStyles = makeStyles({
    root: {
        width: 450,
        height: 300
    },
});

const Hotel = (hotel) => {
    const classes = useStyles();
    const currency = currency_symbols[hotel.currency]

    const diaplyOnMap = () => {
        hotel.displayLocation({ latitude: hotel.hotel.hotel.latitude, longitude: hotel.hotel.hotel.longitude });
    }


    return (

        <>
            <Card className={classes.root}>
                <CardHeader
                    title={hotel.name}
                    subheader={hotel.rating}
                />

                <CardContent>
                    <Typography variant="body2" component="p" >
                        Check In : {hotel.checkIn} Check Out : {hotel.checkOut}
                    </Typography>
                    <hr />
                    <Typography variant="body2" component="p" >
                        Price {hotel.price} {currency}
                    </Typography>
                    <hr />
                    <Typography variant="body2" color="textSecondary" component="p">
                        <div> Address : {hotel.address}</div>
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="small" color="primary">
                        Save
                    </Button>
                    <Button color="inherit" onClick={diaplyOnMap}>Show On Map</Button>
                </CardActions>
            </Card>

        </>
    )
}

export default Hotel;