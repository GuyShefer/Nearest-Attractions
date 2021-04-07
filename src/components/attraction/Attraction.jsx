import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import currency_symbols from '../../utilities/currency_symbols'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 240,
    },
});

const Attraction = ({ attraction }) => {

    const classes = useStyles();

    const getStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            i <= Number(attraction.rating) ?
                stars.push(<StarOutlinedIcon key={i} />) :
                stars.push(<StarOutlineOutlinedIcon key={i} />)
        }
        return stars;
    }


    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardHeader title={attraction.name} style={{ maxHeight: '60px', minHeight: '60px' }} />
                <CardMedia className={classes.media} image={attraction.pictures[0]} />

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {attraction.shortDescription.slice(0, 110) + '...'}
                    </Typography>
                </CardContent>
                <h4>Price : {Math.floor(attraction.price.amount) + currency_symbols[attraction.price.currencyCode]} </h4>
                {getStars()}

            </CardActionArea>

            <CardActions>
                <Button size="small" color="primary"> SAVE </Button>
                <Button size="small" color="primary"><a href={attraction.bookingLink} target="_blank" rel="noreferrer"> Book Now <FontAwesomeIcon icon={faExternalLinkAlt} /></a></Button>
            </CardActions>
        </Card>
    )
}

export default Attraction;
