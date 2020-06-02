/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
// import { SvgUri } from 'react-native-svg';
import { MovieUpdate } from '../actions';
import {styles} from './MovieListItemStyles';

import { Card, CardSection, Button } from '../components';
import { MovieInfoModal } from '../components/Modals/MovieInfoModal';

class MovieListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCMovieInfoModal: false,
        };
    }

    onInfoPress() {
        this.setState({
            showCMovieInfoModal: !this.state.showCMovieInfoModal,
        });
    }


    render() {
        const movie = this.props.movie;
        const favorite = this.props.moviesLists.favorite;
        let movieIn = favorite.find(
            (c) => c.id === movie.id)
        return (
           
            <Card>
                {/* <SvgUri 
                uri={ movie.flag }
                > */}
                {/* <View style={photoDescriptionContainer}> */}

                    <CardSection>
                        <Text style={styles.title}>Movie: {movie.title}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.subTitle}>Popularity: {movie.popularity}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.subTitle}>Release Date: {movie.release_date}</Text>
                    </CardSection>
                    <CardSection>
                        <Button  onPress = {this.onInfoPress.bind(this)}>info</Button>
                    <MovieInfoModal
                        visible = {this.state.showCMovieInfoModal}
                        onUpdate = {()=>{this.props.MovieUpdate(movie)}}
                        onClose = {() => this.setState({ showCMovieInfoModal: false})}
                        movieIn = {!movieIn}
                    >
                        {movie}
                    </MovieInfoModal>
                        <Button onPress = {()=>{this.props.MovieUpdate(movie)}}>{movieIn ? 'Delete' : 'Add'}</Button>
                    </CardSection>
                {/* </SvgUri> */}
                {/* </View> */}
            </Card>


            // </View>
        );
    }
}
const mapStateToProps = state => {
    return  {
        moviesLists: state.moviesLists,
    };
};

export default connect(mapStateToProps, {MovieUpdate})(MovieListItem);