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

    const addToLocal = () =>{
        const hotelsArr = JSON.parse(localStorage.getItem('hotelsData')) || [];
        hotelsArr.push(hotel)
        localStorage.setItem('hotelsData', JSON.stringify(hotelsArr));
    }

    const deleteHotelFromLocal = () => {
        hotel.deleteHotel(hotel);
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
                        Price {hotel.price /2} {currency}
                    </Typography>
                    <hr />
                    <Typography variant="body2" color="textSecondary" component="p">
                         Address : {hotel.address}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="small" color="primary" onClick={addToLocal}> Save </Button>
                    {hotel.favorite ? <Button color="warning" onClick={deleteHotelFromLocal}>Delete</Button> : 
                    <Button color="inherit" onClick={diaplyOnMap}>Show On Map</Button>}
                </CardActions>
            </Card>

        </>
    )
}

export default Hotel;